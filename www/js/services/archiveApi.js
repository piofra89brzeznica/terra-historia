// TerraHistoria — Klient otwartych archiwów i baz danych historycznych na żywo
// Źródła: Wikidata SPARQL (Europa i Świat), OpenStreetMap Overpass (historic=*), Wikipedia PL GeoSearch, Nominatim

const CACHE_PREFIX = 'th_archive_v1_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 godzin

function getCached(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function setCached(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    // Ignoruj przepełnienie localStorage
  }
}

export function clearArchiveCache() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(CACHE_PREFIX)) keys.push(k);
    }
    keys.forEach(k => localStorage.removeItem(k));
    return keys.length;
  } catch {
    return 0;
  }
}

function parseYearFromDateStr(dateStr) {
  if (!dateStr) return null;
  const match = String(dateStr).match(/^(-?\d{1,4})/);
  if (!match) return null;
  const y = parseInt(match[1], 10);
  return Number.isNaN(y) ? null : y;
}

function mapWikidataCategory(typeQid, label = '', desc = '') {
  const txt = (label + ' ' + desc).toLowerCase();
  if (typeQid === 'Q178561' || txt.includes('bitwa') || txt.includes('oblężenie') || txt.includes('battle')) return 'battle';
  if (typeQid === 'Q23413' || typeQid === 'Q744099' || txt.includes('zamek') || txt.includes('gród') || txt.includes('grodzisko') || txt.includes('castle')) return 'castle';
  if (typeQid === 'Q57821' || txt.includes('twierdza') || txt.includes('fort') || txt.includes('bunkier') || txt.includes('schron')) return 'fortification';
  if (txt.includes('skarb') || txt.includes('znalezisko') || txt.includes('hoard')) return 'treasure';
  return 'settlement';
}

function mapOsmCategory(tags) {
  const h = (tags.historic || '').toLowerCase();
  const c = (tags.castle_type || '').toLowerCase();
  if (h === 'battlefield') return 'battle';
  if (h === 'castle' || h === 'fort' || h === 'city_gate' || c === 'fortress' || c === 'defensive') return 'castle';
  if (h === 'bunker' || h === 'pillbox' || tags.military === 'bunker') return 'fortification';
  if (h === 'archaeological_site' || h === 'tumulus' || h === 'megalith') return 'treasure';
  return 'settlement';
}

function parseOsmYear(tags) {
  const candidates = [tags.start_date, tags.year, tags['historic:period'], tags.date];
  for (const val of candidates) {
    if (!val) continue;
    const str = String(val).trim();
    const bcMatch = str.match(/(\d{1,4})\s*(BC|BCE|p\.n\.e\.)/i);
    if (bcMatch) return -parseInt(bcMatch[1], 10);
    const numMatch = str.match(/(-?\d{3,4})/);
    if (numMatch) return parseInt(numMatch[1], 10);
    const centMatch = str.match(/(\d{1,2})\s*(th|st|nd|rd)?\s*century/i);
    if (centMatch) return (parseInt(centMatch[1], 10) - 1) * 100 + 50;
  }
  const h = (tags.historic || '').toLowerCase();
  if (h === 'bunker' || h === 'pillbox') return 1940;
  if (h === 'castle' || h === 'ruins') return 1400;
  if (h === 'manor') return 1750;
  if (h === 'archaeological_site' || h === 'tumulus') return 500;
  return null;
}

/**
 * Pobiera historyczne obiekty z Wikidata SPARQL w zadanym obszarze mapy (Polska i cała Europa)
 */
export async function fetchWikidataInBounds(bounds) {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const key = `wd_${sw.lat.toFixed(2)}_${sw.lng.toFixed(2)}_${ne.lat.toFixed(2)}_${ne.lng.toFixed(2)}`;
  const cached = getCached(key);
  if (cached) return cached;

  const query = `
SELECT DISTINCT ?item ?itemLabel ?itemDescription ?coord ?type ?date ?inception ?article WHERE {
  VALUES ?type { wd:Q178561 wd:Q23413 wd:Q839954 wd:Q57821 wd:Q744099 wd:Q109607 }
  ?item wdt:P31/wdt:P279? ?type .
  SERVICE wikibase:box {
    ?item wdt:P625 ?coord .
    bd:serviceParam wikibase:cornerSouthWest "Point(${sw.lng.toFixed(4)} ${sw.lat.toFixed(4)})"^^geo:wktLiteral .
    bd:serviceParam wikibase:cornerNorthEast "Point(${ne.lng.toFixed(4)} ${ne.lat.toFixed(4)})"^^geo:wktLiteral .
  }
  OPTIONAL { ?item wdt:P585 ?date . }
  OPTIONAL { ?item wdt:P571 ?inception . }
  OPTIONAL {
    ?article schema:about ?item ;
             schema:isPartOf <https://pl.wikipedia.org/> .
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "pl,en,de,cs,sk". }
}
LIMIT 90
`;

  const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(query);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'application/sparql-results+json' },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Wikidata HTTP ${res.status}`);
    const json = await res.json();
    const seen = new Set();
    const results = [];

    for (const row of (json.results?.bindings || [])) {
      const qid = row.item?.value?.split('/').pop();
      if (!qid || seen.has(qid)) continue;
      seen.add(qid);

      const coordMatch = row.coord?.value?.match(/Point\(([-\d.]+)\s+([-\d.]+)\)/);
      if (!coordMatch) continue;
      const lng = parseFloat(coordMatch[1]);
      const lat = parseFloat(coordMatch[2]);
      const name = row.itemLabel?.value || qid;
      if (/^Q\d+$/.test(name)) continue;

      const typeQid = row.type?.value?.split('/').pop() || '';
      const desc = row.itemDescription?.value || 'Obiekt historyczny z otwartej bazy Wikidata.';
      const year = parseYearFromDateStr(row.date?.value) ?? parseYearFromDateStr(row.inception?.value);
      const category = mapWikidataCategory(typeQid, name, desc);

      results.push({
        id: `wd-${qid}`,
        name,
        category,
        lat,
        lng,
        yearStart: year,
        yearEnd: year,
        eraLabel: year !== null ? `Datowanie archiwalne: ${year < 0 ? Math.abs(year) + ' p.n.e.' : year + ' n.e.'}` : 'Obiekt historyczny (Wikidata)',
        region: 'Archiwum Wikidata (Live)',
        summary: desc.charAt(0).toUpperCase() + desc.slice(1),
        details: `Obiekt pobrany w czasie rzeczywistym z międzynarodowej bazy wiedzy Wikidata (${qid}). Kliknij odnośnik do Wikipedii lub przeanalizuj rzeźbę terenu na warstwie LIDAR, aby poznać szczegóły ukształtowania terenu i otoczenia.`,
        terrainHint: 'Włącz warstwę „LIDAR — Rzeźba terenu” lub „Satelita HD”, aby ocenić ukształtowanie terenu, dawne drogi i cieki wodne wokół obiektu.',
        legalStatus: category === 'castle' || category === 'treasure' ? 'archaeological_zone' : 'permit_required',
        legalNote: 'Obiekt historyczny z bazy Wikidata. Przed jakąkolwiek działalnością terenową sprawdź rejestr zabytków NID i uzyskaj wymagane zgody (właściciel + WKZ).',
        finds: [],
        wikipediaUrl: row.article?.value || `https://www.wikidata.org/wiki/${qid}`,
        source: 'Wikidata / Archiwa Live',
        isLive: true
      });
    }

    setCached(key, results);
    return results;
  } catch (err) {
    clearTimeout(timeout);
    console.warn('Wikidata fetch error:', err);
    return [];
  }
}

/**
 * Pobiera obiekty historyczne z OpenStreetMap Overpass API (pola bitewne, ruiny, grodziska, bunkry, dwory, kapliczki, kamienie milowe)
 */
export async function fetchOverpassInBounds(bounds) {
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  // Zabezpieczenie przed zbyt dużym obszarem zapytania Overpass
  if (Math.abs(ne.lat - sw.lat) > 2.2 || Math.abs(ne.lng - sw.lng) > 3.2) {
    return [];
  }

  const key = `osm_${sw.lat.toFixed(2)}_${sw.lng.toFixed(2)}_${ne.lat.toFixed(2)}_${ne.lng.toFixed(2)}`;
  const cached = getCached(key);
  if (cached) return cached;

  const bbox = `${sw.lat.toFixed(4)},${sw.lng.toFixed(4)},${ne.lat.toFixed(4)},${ne.lng.toFixed(4)}`;
  const ql = `
[out:json][timeout:14];
(
  node["historic"~"^(battlefield|castle|archaeological_site|ruins|fort|manor|bunker|tumulus|city_gate|milestone)$"](${bbox});
  way["historic"~"^(battlefield|castle|archaeological_site|ruins|fort|manor|bunker|tumulus)$"](${bbox});
);
out center 90;
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(ql),
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const json = await res.json();

    const typeLabels = {
      battlefield: 'Pole bitewne',
      castle: 'Zamek / Warownia',
      archaeological_site: 'Stanowisko archeologiczne / Grodzisko',
      ruins: 'Historyczne ruiny',
      fort: 'Fort / Twierdza',
      manor: 'Dawny dwór / Folwark',
      bunker: 'Schron / Bunkier',
      tumulus: 'Kurhan / Kopiec',
      city_gate: 'Brama miejska',
      milestone: 'Historyczny kamień milowy / trakt'
    };

    const results = [];
    for (const el of (json.elements || [])) {
      const lat = el.lat ?? el.center?.lat;
      const lng = el.lon ?? el.center?.lon;
      if (lat == null || lng == null) continue;
      const tags = el.tags || {};
      const hType = tags.historic || 'historic';
      const defaultName = typeLabels[hType] || 'Obiekt historyczny';
      const name = tags['name:pl'] || tags.name || defaultName;
      const category = mapOsmCategory(tags);
      const year = parseOsmYear(tags);
      const wikiTag = tags.wikipedia;
      let wikiUrl = null;
      if (wikiTag) {
        const [lang, title] = wikiTag.includes(':') ? wikiTag.split(/:(.+)/) : ['pl', wikiTag];
        wikiUrl = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
      }

      const detailsParts = [];
      if (tags.description) detailsParts.push(tags.description);
      if (tags.site_type) detailsParts.push(`Typ stanowiska: ${tags.site_type}`);
      if (tags.start_date) detailsParts.push(`Datowanie OSM: ${tags.start_date}`);
      if (tags['historic:civilization']) detailsParts.push(`Kultura/okres: ${tags['historic:civilization']}`);
      if (tags.heritage) detailsParts.push(`Status zabytku (heritage): ${tags.heritage}`);

      results.push({
        id: `osm-${el.type}-${el.id}`,
        name,
        category,
        lat,
        lng,
        yearStart: year,
        yearEnd: year,
        eraLabel: tags.start_date ? `Datowanie: ${tags.start_date}` : defaultName,
        region: 'OpenStreetMap Historic (Live)',
        summary: `${defaultName}${tags.ruins === 'yes' ? ' (ruiny)' : ''}${tags.start_date ? ` • ${tags.start_date}` : ''}.`,
        details: detailsParts.length > 0
          ? detailsParts.join('. ') + '.'
          : 'Obiekt kartograficzny pobrany na żywo z bazy OpenStreetMap (warstwa historic). Warto sprawdzić ukształtowanie terenu na warstwie LIDAR.',
        terrainHint: 'Sprawdź sąsiedztwo starych dróg polnych, cieków wodnych i zarysów terenu w trybie LIDAR / Satelita.',
        legalStatus: (hType === 'archaeological_site' || hType === 'tumulus' || tags.heritage) ? 'protected_monument' : 'permit_required',
        legalNote: (hType === 'archaeological_site' || hType === 'tumulus')
          ? 'Stanowisko archeologiczne / kurhan — obszar objęty ścisłą ochroną prawną! Zakaz poszukiwań bez specjalnego pozwolenia badawczego.'
          : 'Przed poszukiwaniami terenowymi wymagana pisemna zgoda właściciela gruntu i pozwolenie WKZ.',
        finds: [],
        wikipediaUrl: wikiUrl,
        source: 'OpenStreetMap Historic',
        isLive: true
      });
    }

    setCached(key, results);
    return results;
  } catch (err) {
    clearTimeout(timeout);
    console.warn('Overpass fetch error:', err);
    return [];
  }
}

/**
 * Wyszukiwanie miejscowości / adresów / współrzędnych (Nominatim)
 */
export async function geocodeSearch(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Sprawdź czy użytkownik wpisał współrzędne (np. 52.23, 21.01)
  const coordMatch = trimmed.match(/^(-?\d{1,2}(?:\.\d+)?)\s*[,\s]\s*(-?\d{1,3}(?:\.\d+)?)$/);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lng = parseFloat(coordMatch[2]);
    if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      return [{
        display_name: `Współrzędne GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        lat,
        lon: lng,
        type: 'coordinates'
      }];
    }
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=pl&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(item => ({
      display_name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type
    }));
  } catch {
    return [];
  }
}

/**
 * Odległość Haversine w metrach
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters) {
  if (meters == null || Number.isNaN(meters)) return '';
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}
