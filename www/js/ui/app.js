// TerraHistoria — Główny kontroler aplikacji mobilnej (PWA + Capacitor Android)
import {
  MIN_YEAR,
  MAX_YEAR,
  ERAS,
  CATEGORIES,
  TRADE_ROUTES,
  HISTORICAL_SITES,
  formatYear,
  formatYearRange
} from '../data/historicalData.js';
import {
  fetchWikidataInBounds,
  fetchOverpassInBounds,
  geocodeSearch,
  haversineDistance,
  formatDistance,
  clearArchiveCache
} from '../services/archiveApi.js';
import { MapManager } from '../map/mapManager.js';

const STORAGE_PINS = 'th_custom_pins_v1';
const STORAGE_FAVS = 'th_favorites_v1';
const STORAGE_GMAPS = 'th_gmaps_key_v1';

class TerraHistoriaApp {
  constructor() {
    this.mapManager = null;
    this.activeCategory = 'all';
    this.yearMin = MIN_YEAR;
    this.yearMax = MAX_YEAR;
    this.includeUndated = true;
    this.activeEraId = 'all';

    this.liveSites = [];
    this.customPins = this.loadJson(STORAGE_PINS, []);
    this.favorites = new Set(this.loadJson(STORAGE_FAVS, []));
    this.selectedItem = null;
    this.isScanning = false;
    this.deferredInstallPrompt = null;
    this.searchDebounce = null;
    this.toastTimer = null;
  }

  init() {
    this.mapManager = new MapManager('map', {
      onSelectItem: (item) => this.openDetail(item),
      onMapClick: () => {
        this.hideSearchResults();
      },
      onMapPickLocation: (lat, lng) => this.openPinModal(lat, lng)
    });
    this.mapManager.init();

    this.renderCategoryChips();
    this.renderEraPresets();
    this.bindEvents();
    this.updateSliderUI();
    this.refreshMap();
    this.initSavedGoogleMapsKey();
    this.registerPWA();

    // Na ekranach mobilnych startujemy ze zwiniętą osią czasu, by zmaksymalizować mapę
    if (window.innerWidth < 768) {
      document.getElementById('timeline-dock')?.classList.add('collapsed');
    }
  }

  // ============================================================
  // DANE I FILTROWANIE
  // ============================================================
  getAllSites() {
    // Deduplikacja obiektów live względem wbudowanej bazy (w promieniu ~350 m o podobnej nazwie)
    const base = [...HISTORICAL_SITES, ...this.customPins];
    const uniqueLive = [];
    const seenIds = new Set(base.map(s => s.id));

    for (const live of this.liveSites) {
      if (seenIds.has(live.id)) continue;
      const duplicate = base.some(b =>
        haversineDistance(b.lat, b.lng, live.lat, live.lng) < 350 &&
        b.category === live.category
      );
      if (!duplicate) {
        seenIds.add(live.id);
        uniqueLive.push(live);
      }
    }
    return [...base, ...uniqueLive];
  }

  matchesTimeline(item) {
    const hasStart = item.yearStart !== null && item.yearStart !== undefined;
    const hasEnd = item.yearEnd !== null && item.yearEnd !== undefined;
    if (!hasStart && !hasEnd) {
      return this.includeUndated;
    }
    const start = hasStart ? item.yearStart : item.yearEnd;
    const end = hasEnd ? item.yearEnd : item.yearStart;
    return end >= this.yearMin && start <= this.yearMax;
  }

  getFilteredSites() {
    const all = this.getAllSites();
    return all.filter(site => {
      if (this.activeCategory !== 'all' && this.activeCategory !== 'route') {
        if (site.category !== this.activeCategory) return false;
      } else if (this.activeCategory === 'route') {
        return false;
      }
      return this.matchesTimeline(site);
    });
  }

  getFilteredRoutes() {
    if (this.activeCategory !== 'all' && this.activeCategory !== 'route') {
      return [];
    }
    return TRADE_ROUTES.filter(r => this.matchesTimeline(r));
  }

  refreshMap() {
    const sites = this.getFilteredSites();
    const routes = this.getFilteredRoutes();

    this.mapManager.renderSites(sites);
    this.mapManager.renderRoutes(routes);
    this.updateCategoryCounts();
    this.updateStats(sites.length, routes.length);
  }

  updateStats(sitesCount, routesCount) {
    const rangeLabel = document.getElementById('timeline-range-label');
    const statsLabel = document.getElementById('timeline-stats');
    if (rangeLabel) {
      rangeLabel.textContent = `${formatYear(this.yearMin)} – ${formatYear(this.yearMax)}`;
    }
    if (statsLabel) {
      const liveCount = this.liveSites.length;
      const liveText = liveCount > 0 ? ` • +${liveCount} z archiwów` : '';
      statsLabel.textContent = `${sitesCount} miejsc • ${routesCount} szlaków${liveText}`;
    }
  }

  // ============================================================
  // KATEGORIE I OŚ CZASU
  // ============================================================
  renderCategoryChips() {
    const container = document.getElementById('category-chips');
    if (!container) return;

    const items = [
      { id: 'all', label: 'Wszystkie', color: '#f59e0b', svg: '' },
      CATEGORIES.route,
      CATEGORIES.battle,
      CATEGORIES.treasure,
      CATEGORIES.castle,
      CATEGORIES.settlement,
      CATEGORIES.fortification,
      CATEGORIES.custom
    ];

    container.innerHTML = items.map(cat => `
      <button class="cat-chip ${this.activeCategory === cat.id ? 'active' : ''}"
              data-cat="${cat.id}"
              style="--chip-color: ${cat.color}">
        ${cat.svg || ''}
        <span>${cat.label}</span>
        <span class="chip-count" id="count-${cat.id}">0</span>
      </button>
    `).join('');

    container.querySelectorAll('.cat-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.cat;
        container.querySelectorAll('.cat-chip').forEach(b => b.classList.toggle('active', b === btn));
        this.refreshMap();
      });
    });
  }

  updateCategoryCounts() {
    const allSites = this.getAllSites().filter(s => this.matchesTimeline(s));
    const allRoutes = TRADE_ROUTES.filter(r => this.matchesTimeline(r));
    const counts = {
      all: allSites.length + allRoutes.length,
      route: allRoutes.length,
      battle: 0,
      treasure: 0,
      castle: 0,
      settlement: 0,
      fortification: 0,
      custom: 0
    };
    for (const s of allSites) {
      if (counts[s.category] !== undefined) counts[s.category]++;
    }
    Object.entries(counts).forEach(([k, v]) => {
      const el = document.getElementById(`count-${k}`);
      if (el) el.textContent = v;
    });
  }

  renderEraPresets() {
    const container = document.getElementById('era-presets');
    if (!container) return;
    container.innerHTML = ERAS.map(era => `
      <button class="era-btn ${this.activeEraId === era.id ? 'active' : ''}" data-era="${era.id}">
        ${era.label}
      </button>
    `).join('');

    container.querySelectorAll('.era-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const era = ERAS.find(e => e.id === btn.dataset.era);
        if (!era) return;
        this.activeEraId = era.id;
        this.yearMin = era.start;
        this.yearMax = era.end;
        document.getElementById('slider-min').value = era.start;
        document.getElementById('slider-max').value = era.end;
        container.querySelectorAll('.era-btn').forEach(b => b.classList.toggle('active', b === btn));
        this.updateSliderUI();
        this.refreshMap();
      });
    });
  }

  updateSliderUI() {
    const minEl = document.getElementById('label-year-min');
    const maxEl = document.getElementById('label-year-max');
    const fill = document.getElementById('range-track-fill');
    if (minEl) minEl.textContent = formatYear(this.yearMin);
    if (maxEl) maxEl.textContent = formatYear(this.yearMax);
    if (fill) {
      const span = MAX_YEAR - MIN_YEAR;
      const leftPct = ((this.yearMin - MIN_YEAR) / span) * 100;
      const rightPct = ((this.yearMax - MIN_YEAR) / span) * 100;
      fill.style.left = `${leftPct}%`;
      fill.style.width = `${Math.max(1, rightPct - leftPct)}%`;
    }
  }

  // ============================================================
  // SKANOWANIE ARCHIWÓW NA ŻYWO (WIKIDATA + OSM OVERPASS)
  // ============================================================
  async scanLiveArchives() {
    if (this.isScanning) return;
    const zoom = this.mapManager.getZoom();
    if (zoom < 7) {
      this.showToast('🔍 Przybliż mapę bliżej wybranego regionu (min. zoom 7), aby przeskanować archiwa Wikidata i OSM.');
      this.mapManager.zoomIn();
      return;
    }

    this.isScanning = true;
    const btn = document.getElementById('btn-scan-archives');
    const txt = document.getElementById('scan-btn-text');
    btn?.classList.add('loading');
    if (txt) txt.textContent = 'Przeszukiwanie Wikidata i OSM Historic...';

    try {
      const bounds = this.mapManager.getBounds();
      const [wdItems, osmItems] = await Promise.all([
        fetchWikidataInBounds(bounds),
        fetchOverpassInBounds(bounds)
      ]);

      const existingIds = new Set(this.liveSites.map(s => s.id));
      let added = 0;
      for (const item of [...wdItems, ...osmItems]) {
        if (!existingIds.has(item.id)) {
          existingIds.add(item.id);
          this.liveSites.push(item);
          added++;
        }
      }

      this.refreshMap();
      if (added > 0) {
        this.showToast(`✅ Pobrano ${added} nowych obiektów historycznych z archiwów (Wikidata + OSM).`);
      } else if (wdItems.length + osmItems.length > 0) {
        this.showToast('ℹ️ Wszystkie obiekty z archiwów dla tego obszaru są już widoczne na mapie.');
      } else {
        this.showToast('ℹ️ Brak dodatkowych obiektów w tym widoku (spróbuj przybliżyć inny region lub sprawdzić połączenie).');
      }
    } catch {
      this.showToast('⚠️ Problem z połączeniem z zewnętrznym archiwum. Spróbuj ponownie za chwilę.');
    } finally {
      this.isScanning = false;
      btn?.classList.remove('loading');
      if (txt) txt.textContent = 'Skanuj archiwa w tym rejonie (Wikidata + OSM)';
    }
  }

  // ============================================================
  // PANEL SZCZEGÓŁÓW (GOOGLE MAPS BOTTOM SHEET)
  // ============================================================
  openDetail(item) {
    this.selectedItem = item;
    this.mapManager.selectItem(item.id);

    if (item.coordinates) {
      this.mapManager.fitRoute(item.coordinates);
    } else if (item.lat != null && item.lng != null) {
      this.mapManager.flyTo(item.lat, item.lng, 11);
    }

    const sheet = document.getElementById('detail-sheet');
    const content = document.getElementById('detail-content');
    if (!sheet || !content) return;

    const cat = CATEGORIES[item.category] || CATEGORIES.settlement;
    const isFav = this.favorites.has(item.id);
    const yearTxt = formatYearRange(item.yearStart, item.yearEnd);

    // Oblicz odległość od GPS użytkownika jeśli aktywny
    let distBadge = '';
    const targetLat = item.lat ?? item.coordinates?.[0]?.[0];
    const targetLng = item.lng ?? item.coordinates?.[0]?.[1];
    if (this.mapManager.userPosition && targetLat != null && targetLng != null) {
      const dist = haversineDistance(
        this.mapManager.userPosition.lat,
        this.mapManager.userPosition.lng,
        targetLat,
        targetLng
      );
      distBadge = `<span class="badge badge-distance">📍 ${formatDistance(dist)} od Ciebie</span>`;
    }

    // Status prawny
    const legalMeta = {
      protected_monument: {
        cls: 'legal-protected',
        title: '⛔ Strefa chroniona / Zabytek w rejestrze',
        fallback: 'Obiekt objęty ścisłą ochroną prawną. Zakaz poszukiwań z wykrywaczem metali bez oficjalnych badań archeologicznych.'
      },
      archaeological_zone: {
        cls: 'legal-archaeo',
        title: '⚠️ Obszar archeologiczny / Historyczne pole badań',
        fallback: 'W tym rejonie występują stanowiska archeologiczne (AZP). Konieczna weryfikacja mapy NID i zezwolenie WKZ.'
      },
      permit_required: {
        cls: 'legal-permit',
        title: '📋 Zasady poszukiwań w terenie',
        fallback: 'Przed wejściem w teren wymagana pisemna zgoda właściciela gruntu oraz pozwolenie Wojewódzkiego Konserwatora Zabytków (WKZ).'
      }
    }[item.legalStatus || 'permit_required'];

    // Sekcja bitwy lub szlaku
    let specialSection = '';
    if (item.category === 'battle' && (item.combatants || item.outcome)) {
      specialSection = `
        <div class="info-block">
          <h4>⚔️ Przebieg i strony starcia</h4>
          <div class="kv-grid">
            ${item.combatants ? `<div class="kv-item"><strong>Strony:</strong> ${this.escape(item.combatants)}</div>` : ''}
            ${item.outcome ? `<div class="kv-item"><strong>Rezultat:</strong> ${this.escape(item.outcome)}</div>` : ''}
          </div>
        </div>
      `;
    } else if (item.category === 'route') {
      specialSection = `
        <div class="info-block">
          <h4>🛤️ Przebieg szlaku i towary</h4>
          <div class="kv-grid">
            ${item.keyCities ? `<div class="kv-item"><strong>Główne punkty:</strong> ${this.escape(item.keyCities)}</div>` : ''}
            ${item.goods ? `<div class="kv-item"><strong>Przewożone towary:</strong> ${this.escape(item.goods)}</div>` : ''}
          </div>
        </div>
      `;
    }

    // Sekcja dotychczasowych znalezisk
    let findsSection = '';
    if (item.finds && item.finds.length > 0) {
      findsSection = `
        <div class="info-block">
          <h4>🪙 Dotychczasowe udokumentowane znaleziska (${item.finds.length})</h4>
          <div class="finds-list">
            ${item.finds.map(f => `
              <div class="find-card">
                <div class="find-card-title">${this.escape(f.item)}</div>
                <div class="find-meta">
                  <span>👤 <strong>Odkrywca / Badania:</strong> ${this.escape(f.discoverer || 'Nieznany')}</span>
                  <span>📅 <strong>Rok odkrycia:</strong> ${this.escape(f.year || '—')} • <strong>Datowanie:</strong> ${this.escape(f.dating || '—')}</span>
                  ${f.museum ? `<span>🏛️ <strong>Zbiory / Źródło:</strong> ${this.escape(f.museum)}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const navUrl = targetLat != null && targetLng != null
      ? `https://www.google.com/maps/dir/?api=1&destination=${targetLat},${targetLng}`
      : null;

    const coordsText = targetLat != null && targetLng != null
      ? `${targetLat.toFixed(5)}, ${targetLng.toFixed(5)}`
      : '';

    content.innerHTML = `
      <div class="detail-badges">
        <span class="badge" style="background:${cat.bg};color:${cat.border};border:1px solid ${cat.color}">
          ${cat.svg} ${cat.singular}
        </span>
        <span class="badge badge-era">⏳ ${yearTxt}</span>
        ${distBadge}
        <span class="badge badge-source">📚 ${this.escape(item.source || 'TerraHistoria')}</span>
      </div>

      <h2 class="detail-title">${this.escape(item.name)}</h2>
      <p class="detail-subtitle">${this.escape(item.region || '')}${item.eraLabel ? ` • ${this.escape(item.eraLabel)}` : ''}</p>

      <div class="detail-actions">
        ${navUrl ? `<a class="action-pill action-pill-primary" href="${navUrl}" target="_blank" rel="noopener">🧭 Nawiguj (Google Maps)</a>` : ''}
        <button id="btn-detail-fav" class="action-pill ${isFav ? 'saved' : ''}">
          ${isFav ? '⭐ Zapisane' : '☆ Ulubione'}
        </button>
        ${coordsText ? `<button id="btn-copy-coords" class="action-pill" data-coords="${coordsText}">📋 ${coordsText}</button>` : ''}
        ${item.wikipediaUrl ? `<a class="action-pill" href="${this.escape(item.wikipediaUrl)}" target="_blank" rel="noopener">📖 Wikipedia / Źródło</a>` : ''}
        ${item.isCustom ? `<button id="btn-delete-custom" class="action-pill btn-danger">🗑️ Usuń punkt</button>` : ''}
      </div>

      <div class="info-block">
        <h4>📜 Kontekst historyczny</h4>
        <p>${this.escape(item.summary || '')}</p>
        ${item.details ? `<p>${this.escape(item.details)}</p>` : ''}
        ${item.permitStatus ? `<p><strong>Status pozwolenia:</strong> ${this.escape(item.permitStatus)}</p>` : ''}
      </div>

      ${specialSection}
      ${findsSection}

      ${item.terrainHint ? `
        <div class="info-block">
          <h4>🏔️ Ukształtowanie terenu i analiza LIDAR</h4>
          <p>${this.escape(item.terrainHint)}</p>
        </div>
      ` : ''}

      <div class="legal-banner ${legalMeta.cls}">
        <strong>${legalMeta.title}</strong>
        ${this.escape(item.legalNote || legalMeta.fallback)}
      </div>
    `;

    // Zdarzenia wewnątrz panelu szczegółów
    document.getElementById('btn-detail-fav')?.addEventListener('click', () => {
      if (this.favorites.has(item.id)) {
        this.favorites.delete(item.id);
        this.showToast('Usunięto z ulubionych.');
      } else {
        this.favorites.add(item.id);
        this.showToast('⭐ Zapisano w ulubionych!');
      }
      this.saveJson(STORAGE_FAVS, [...this.favorites]);
      this.openDetail(item);
    });

    document.getElementById('btn-copy-coords')?.addEventListener('click', (e) => {
      const c = e.currentTarget.dataset.coords;
      navigator.clipboard?.writeText(c).then(() => {
        this.showToast(`📋 Skopiowano współrzędne: ${c}`);
      }).catch(() => {
        this.showToast(`Współrzędne: ${c}`);
      });
    });

    document.getElementById('btn-delete-custom')?.addEventListener('click', () => {
      this.customPins = this.customPins.filter(p => p.id !== item.id);
      this.saveJson(STORAGE_PINS, this.customPins);
      this.closeDetail();
      this.refreshMap();
      this.showToast('🗑️ Usunięto własny punkt terenowy.');
    });

    sheet.classList.remove('hidden');
  }

  closeDetail() {
    document.getElementById('detail-sheet')?.classList.add('hidden');
    this.selectedItem = null;
    this.mapManager.selectItem(null);
  }

  // ============================================================
  // WYSZUKIWANIE (LOKALNE + NOMINATIM GEOCODING)
  // ============================================================
  handleSearchInput(query) {
    const clearBtn = document.getElementById('btn-clear-search');
    clearBtn?.classList.toggle('hidden', !query.trim());

    if (!query.trim()) {
      this.hideSearchResults();
      return;
    }

    const q = query.trim().toLowerCase();
    const localPool = [...TRADE_ROUTES, ...this.getAllSites()];
    const localMatches = localPool.filter(item => {
      const hay = [
        item.name, item.region, item.eraLabel, item.summary,
        item.goods, item.keyCities, item.combatants,
        ...(item.finds || []).map(f => `${f.item} ${f.discoverer}`)
      ].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);

    this.renderSearchResults(localMatches, []);

    clearTimeout(this.searchDebounce);
    if (q.length >= 3) {
      this.searchDebounce = setTimeout(async () => {
        const geo = await geocodeSearch(query);
        this.renderSearchResults(localMatches, geo);
      }, 420);
    }
  }

  renderSearchResults(localMatches, geoMatches) {
    const box = document.getElementById('search-results');
    if (!box) return;

    if (localMatches.length === 0 && geoMatches.length === 0) {
      box.innerHTML = `<div class="search-item"><div class="search-item-text"><strong>Brak wyników w bazie</strong><small>Wpisz nazwę miejscowości lub współrzędne, aby przenieść mapę</small></div></div>`;
      box.classList.remove('hidden');
      return;
    }

    const parts = [];
    for (const item of localMatches) {
      const cat = CATEGORIES[item.category] || CATEGORIES.settlement;
      parts.push(`
        <div class="search-item" data-type="local" data-id="${this.escape(item.id)}">
          <div class="search-item-dot" style="background:${cat.color}">${cat.svg}</div>
          <div class="search-item-text">
            <strong>${this.escape(item.name)}</strong>
            <small>${cat.singular} • ${formatYearRange(item.yearStart, item.yearEnd)} • ${this.escape(item.region || '')}</small>
          </div>
        </div>
      `);
    }

    for (let i = 0; i < geoMatches.length; i++) {
      const g = geoMatches[i];
      parts.push(`
        <div class="search-item" data-type="geo" data-lat="${g.lat}" data-lng="${g.lon}">
          <div class="search-item-dot" style="background:#334155">📍</div>
          <div class="search-item-text">
            <strong>${this.escape(g.display_name.split(',')[0])}</strong>
            <small>${this.escape(g.display_name)}</small>
          </div>
        </div>
      `);
    }

    box.innerHTML = parts.join('');
    box.classList.remove('hidden');

    box.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', () => {
        if (el.dataset.type === 'local') {
          const all = [...TRADE_ROUTES, ...this.getAllSites()];
          const found = all.find(x => x.id === el.dataset.id);
          if (found) this.openDetail(found);
        } else if (el.dataset.type === 'geo') {
          const lat = parseFloat(el.dataset.lat);
          const lng = parseFloat(el.dataset.lng);
          this.mapManager.flyTo(lat, lng, 12);
          this.showToast('📍 Przeniesiono mapę. Kliknij „Skanuj archiwa w tym rejonie”, aby pobrać obiekty.');
        }
        this.hideSearchResults();
      });
    });
  }

  hideSearchResults() {
    document.getElementById('search-results')?.classList.add('hidden');
  }

  // ============================================================
  // LISTA I SORTOWANIE MIEJSC
  // ============================================================
  openListDrawer() {
    this.renderPlacesList();
    document.getElementById('list-drawer')?.classList.remove('hidden');
  }

  renderPlacesList() {
    const container = document.getElementById('places-list');
    const subtitle = document.getElementById('list-count-subtitle');
    const sortBy = document.getElementById('sort-select')?.value || 'oldest';
    if (!container) return;

    const items = [...this.getFilteredRoutes(), ...this.getFilteredSites()];
    const userPos = this.mapManager.userPosition;

    const getLat = (x) => x.lat ?? x.coordinates?.[0]?.[0] ?? 52;
    const getLng = (x) => x.lng ?? x.coordinates?.[0]?.[1] ?? 19;

    items.sort((a, b) => {
      if (sortBy === 'oldest') {
        return (a.yearStart ?? 9999) - (b.yearStart ?? 9999);
      }
      if (sortBy === 'newest') {
        return (b.yearEnd ?? b.yearStart ?? -9999) - (a.yearEnd ?? a.yearStart ?? -9999);
      }
      if (sortBy === 'finds') {
        return (b.finds?.length || 0) - (a.finds?.length || 0);
      }
      if (sortBy === 'favorites') {
        const af = (this.favorites.has(a.id) || a.isCustom) ? 1 : 0;
        const bf = (this.favorites.has(b.id) || b.isCustom) ? 1 : 0;
        return bf - af || a.name.localeCompare(b.name, 'pl');
      }
      if (sortBy === 'distance' && userPos) {
        const da = haversineDistance(userPos.lat, userPos.lng, getLat(a), getLng(a));
        const db = haversineDistance(userPos.lat, userPos.lng, getLat(b), getLng(b));
        return da - db;
      }
      return a.name.localeCompare(b.name, 'pl');
    });

    if (subtitle) {
      subtitle.textContent = `Widocznych obiektów: ${items.length} (okres: ${formatYear(this.yearMin)} – ${formatYear(this.yearMax)})`;
    }

    if (items.length === 0) {
      container.innerHTML = `<p class="hint-text" style="padding:20px;text-align:center;">Brak obiektów dla wybranych filtrów. Poszerz zakres lat na osi czasu lub zmień kategorię.</p>`;
      return;
    }

    container.innerHTML = items.map(item => {
      const cat = CATEGORIES[item.category] || CATEGORIES.settlement;
      const yearTxt = formatYearRange(item.yearStart, item.yearEnd);
      const favStar = this.favorites.has(item.id) ? '⭐ ' : '';
      const findsBadge = item.finds?.length ? ` • 🪙 ${item.finds.length} znalezisk(a)` : '';
      const distTxt = userPos
        ? ` • 📍 ${formatDistance(haversineDistance(userPos.lat, userPos.lng, getLat(item), getLng(item)))}`
        : '';

      return `
        <div class="place-card" data-id="${this.escape(item.id)}">
          <div class="place-card-icon" style="background:${cat.color}">${cat.svg}</div>
          <div class="place-card-body">
            <strong>${favStar}${this.escape(item.name)}</strong>
            <div class="place-card-meta">
              <span>${cat.singular}</span>
              <span>• ⏳ ${yearTxt}</span>
              <span>${findsBadge}${distTxt}</span>
            </div>
            <p class="place-card-desc">${this.escape(item.summary || '')}</p>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.place-card').forEach(card => {
      card.addEventListener('click', () => {
        const found = items.find(x => x.id === card.dataset.id);
        document.getElementById('list-drawer')?.classList.add('hidden');
        if (found) this.openDetail(found);
      });
    });
  }

  // ============================================================
  // WŁASNE PUNKTY TERENOWE (DZIENNIK) + EKSPORT GPX / GEOJSON
  // ============================================================
  openPinModal(lat, lng) {
    document.getElementById('pick-banner')?.classList.add('hidden');
    document.getElementById('btn-add-pin')?.classList.remove('active');
    document.getElementById('pin-lat').value = lat.toFixed(5);
    document.getElementById('pin-lng').value = lng.toFixed(5);
    document.getElementById('pin-name').value = '';
    document.getElementById('pin-year').value = '';
    document.getElementById('pin-notes').value = '';
    document.getElementById('pin-modal')?.classList.remove('hidden');
  }

  saveCustomPin(e) {
    e.preventDefault();
    const lat = parseFloat(document.getElementById('pin-lat').value);
    const lng = parseFloat(document.getElementById('pin-lng').value);
    const name = document.getElementById('pin-name').value.trim();
    const yearVal = document.getElementById('pin-year').value.trim();
    const permit = document.getElementById('pin-permit').value;
    const notes = document.getElementById('pin-notes').value.trim();

    if (!name || Number.isNaN(lat) || Number.isNaN(lng)) return;
    const year = yearVal ? parseInt(yearVal, 10) : null;

    const newPin = {
      id: `custom-${Date.now()}`,
      name,
      category: 'custom',
      lat,
      lng,
      yearStart: year,
      yearEnd: year,
      eraLabel: year !== null ? `Własny punkt (${formatYear(year)})` : 'Własny punkt terenowy',
      region: 'Dziennik terenowy użytkownika',
      summary: notes || 'Zapisany własny punkt badawczy w dzienniku terenowym.',
      details: `Utworzono: ${new Date().toLocaleDateString('pl-PL')}.`,
      permitStatus: permit,
      legalStatus: permit.includes('chroniona') ? 'protected_monument' : 'permit_required',
      legalNote: `Status zapisany przez użytkownika: ${permit}.`,
      finds: [],
      source: 'Mój dziennik terenowy',
      isCustom: true
    };

    this.customPins.push(newPin);
    this.saveJson(STORAGE_PINS, this.customPins);
    document.getElementById('pin-modal')?.classList.add('hidden');
    this.refreshMap();
    this.openDetail(newPin);
    this.showToast('📍 Zapisano nowy punkt w Twoim dzienniku terenowym!');
  }

  exportGeoJSON() {
    if (this.customPins.length === 0) {
      this.showToast('Brak własnych punktów do eksportu. Dodaj najpierw punkt przyciskiem 📍 na mapie.');
      return;
    }
    const geojson = {
      type: 'FeatureCollection',
      features: this.customPins.map(p => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
        properties: {
          name: p.name,
          year: p.yearStart,
          permitStatus: p.permitStatus,
          notes: p.summary
        }
      }))
    };
    this.downloadFile('terrahistoria-punkty.geojson', JSON.stringify(geojson, null, 2), 'application/geo+json');
  }

  exportGPX() {
    if (this.customPins.length === 0) {
      this.showToast('Brak własnych punktów do eksportu.');
      return;
    }
    const wpts = this.customPins.map(p => `  <wpt lat="${p.lat}" lon="${p.lng}">
    <name>${this.escapeXml(p.name)}</name>
    <desc>${this.escapeXml(`${p.permitStatus || ''} — ${p.summary || ''}`)}</desc>
  </wpt>`).join('\n');

    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="TerraHistoria Android PWA" xmlns="http://www.topografix.com/GPX/1/1">
${wpts}
</gpx>`;
    this.downloadFile('terrahistoria-punkty.gpx', gpx, 'application/gpx+xml');
  }

  downloadFile(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    this.showToast(`📤 Pobrano plik ${filename}`);
  }

  // ============================================================
  // GOOGLE MAPS OPCJONALNY KLUCZ + PWA
  // ============================================================
  async initSavedGoogleMapsKey() {
    const saved = localStorage.getItem(STORAGE_GMAPS);
    if (!saved) return;
    const input = document.getElementById('input-gmaps-key');
    if (input) input.value = saved;
    const res = await this.mapManager.enableGoogleMaps(saved);
    if (res.ok) {
      document.querySelectorAll('.google-tile').forEach(el => el.classList.remove('hidden'));
    }
  }

  registerPWA() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      document.getElementById('btn-install-pwa')?.classList.remove('hidden');
    });
  }

  // ============================================================
  // ZDARZENIA UI
  // ============================================================
  bindEvents() {
    // Wyszukiwarka
    const searchInput = document.getElementById('search-input');
    searchInput?.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
    searchInput?.addEventListener('focus', (e) => {
      if (e.target.value.trim()) this.handleSearchInput(e.target.value);
    });
    document.getElementById('btn-clear-search')?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      this.hideSearchResults();
      document.getElementById('btn-clear-search')?.classList.add('hidden');
    });

    // Skanowanie archiwów na żywo
    document.getElementById('btn-scan-archives')?.addEventListener('click', () => this.scanLiveArchives());

    // Instalacja PWA
    document.getElementById('btn-install-pwa')?.addEventListener('click', async () => {
      if (!this.deferredInstallPrompt) return;
      this.deferredInstallPrompt.prompt();
      const { outcome } = await this.deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        document.getElementById('btn-install-pwa')?.classList.add('hidden');
        this.showToast('📲 Instalowanie aplikacji TerraHistoria na Androidzie...');
      }
      this.deferredInstallPrompt = null;
    });

    // Suwaki osi czasu
    const sliderMin = document.getElementById('slider-min');
    const sliderMax = document.getElementById('slider-max');
    const onSliderChange = () => {
      let minV = parseInt(sliderMin.value, 10);
      let maxV = parseInt(sliderMax.value, 10);
      if (minV > maxV) {
        [minV, maxV] = [maxV, minV];
        sliderMin.value = minV;
        sliderMax.value = maxV;
      }
      this.yearMin = minV;
      this.yearMax = maxV;
      this.activeEraId = '';
      document.querySelectorAll('.era-btn').forEach(b => b.classList.remove('active'));
      this.updateSliderUI();
      this.refreshMap();
    };
    sliderMin?.addEventListener('input', onSliderChange);
    sliderMax?.addEventListener('input', onSliderChange);

    document.getElementById('chk-include-undated')?.addEventListener('change', (e) => {
      this.includeUndated = e.target.checked;
      this.refreshMap();
    });

    document.getElementById('btn-toggle-timeline')?.addEventListener('click', () => {
      document.getElementById('timeline-dock')?.classList.toggle('collapsed');
    });

    // Prawy panel narzędzi
    document.getElementById('btn-layers')?.addEventListener('click', () => {
      document.getElementById('layers-modal')?.classList.remove('hidden');
    });

    const syncLidarUI = (enabled) => {
      document.getElementById('toggle-lidar').checked = enabled;
      document.getElementById('btn-quick-lidar')?.classList.toggle('active', enabled);
      document.getElementById('lidar-opacity-wrap')?.classList.toggle('hidden', !enabled);
      this.mapManager.toggleOverlay('lidar', enabled);
    };

    document.getElementById('btn-quick-lidar')?.addEventListener('click', () => {
      const next = !this.mapManager.overlayState.lidar;
      syncLidarUI(next);
      this.showToast(next
        ? '🏔️ Włączono warstwę Geoportal LIDAR (Polska). Przybliż mapę, aby zobaczyć rzeźbę terenu!'
        : 'Wyłączono warstwę LIDAR.');
    });

    document.getElementById('toggle-lidar')?.addEventListener('change', (e) => {
      syncLidarUI(e.target.checked);
    });

    document.getElementById('lidar-opacity')?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      document.getElementById('lidar-opacity-val').textContent = `${val}%`;
      this.mapManager.setLidarOpacity(val / 100);
    });

    document.getElementById('toggle-labels')?.addEventListener('change', (e) => {
      this.mapManager.toggleOverlay('labels', e.target.checked);
    });

    document.getElementById('toggle-routes')?.addEventListener('change', (e) => {
      this.mapManager.toggleOverlay('routes', e.target.checked);
      if (e.target.checked) this.refreshMap();
    });

    // Podkłady bazowe
    document.querySelectorAll('#base-layer-grid .layer-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const baseId = tile.dataset.base;
        if (this.mapManager.setBaseLayer(baseId)) {
          document.querySelectorAll('#base-layer-grid .layer-tile').forEach(t => t.classList.toggle('active', t === tile));
          // Automatycznie włącz etykiety dla satelity
          if (baseId === 'satellite' || baseId === 'geoportal_orto') {
            document.getElementById('toggle-labels').checked = true;
            this.mapManager.toggleOverlay('labels', true);
          }
        }
      });
    });

    // GPS
    document.getElementById('btn-locate')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-locate');
      this.showToast('📡 Ustalanie dokładnej pozycji GPS...');
      this.mapManager.locateUser(
        () => {
          btn?.classList.add('active');
          this.showToast('📍 Zlokalizowano Twoją pozycję GPS!');
        },
        (err) => this.showToast(`⚠️ ${err}`)
      );
    });

    // Dodawanie punktu terenowego
    document.getElementById('btn-add-pin')?.addEventListener('click', () => {
      const next = !this.mapManager.addPinMode;
      this.mapManager.setAddPinMode(next);
      document.getElementById('btn-add-pin')?.classList.toggle('active', next);
      document.getElementById('pick-banner')?.classList.toggle('hidden', !next);
    });
    document.getElementById('btn-cancel-pick')?.addEventListener('click', () => {
      this.mapManager.setAddPinMode(false);
      document.getElementById('btn-add-pin')?.classList.remove('active');
      document.getElementById('pick-banner')?.classList.add('hidden');
    });
    document.getElementById('pin-form')?.addEventListener('submit', (e) => this.saveCustomPin(e));

    // Zoom
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => this.mapManager.zoomIn());
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => this.mapManager.zoomOut());

    // Lista, Prawo, Ustawienia, Szczegóły
    document.getElementById('btn-open-list')?.addEventListener('click', () => this.openListDrawer());
    document.getElementById('btn-open-list-bottom')?.addEventListener('click', () => this.openListDrawer());
    document.getElementById('sort-select')?.addEventListener('change', () => this.renderPlacesList());
    document.getElementById('btn-legal')?.addEventListener('click', () => {
      document.getElementById('legal-modal')?.classList.remove('hidden');
    });
    document.getElementById('btn-settings')?.addEventListener('click', () => {
      document.getElementById('settings-modal')?.classList.remove('hidden');
    });
    document.getElementById('btn-close-detail')?.addEventListener('click', () => this.closeDetail());

    // Zamykanie modali
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.close)?.classList.add('hidden');
      });
    });
    document.querySelectorAll('.modal-backdrop').forEach(bg => {
      bg.addEventListener('click', (e) => {
        if (e.target === bg) bg.classList.add('hidden');
      });
    });

    // Ustawienia: Google Maps, Eksport, Cache
    document.getElementById('btn-save-gmaps')?.addEventListener('click', async () => {
      const key = document.getElementById('input-gmaps-key')?.value.trim();
      const status = document.getElementById('gmaps-status');
      if (!key) {
        localStorage.removeItem(STORAGE_GMAPS);
        if (status) status.textContent = 'Usunięto klucz Google Maps.';
        return;
      }
      if (status) status.textContent = 'Łączenie z Google Maps API...';
      const res = await this.mapManager.enableGoogleMaps(key);
      if (status) status.textContent = res.message;
      if (res.ok) {
        localStorage.setItem(STORAGE_GMAPS, key);
        document.querySelectorAll('.google-tile').forEach(el => el.classList.remove('hidden'));
        this.showToast('✅ Aktywowano Google Maps! Wybierz je w menu Warstw.');
      }
    });

    document.getElementById('btn-export-gpx')?.addEventListener('click', () => this.exportGPX());
    document.getElementById('btn-export-geojson')?.addEventListener('click', () => this.exportGeoJSON());
    document.getElementById('btn-clear-cache')?.addEventListener('click', () => {
      const n = clearArchiveCache();
      this.liveSites = [];
      this.refreshMap();
      this.showToast(`🧹 Wyczyszczono pamięć podręczną archiwów (${n} wpisów).`);
    });
  }

  // ============================================================
  // POMOCNICZE
  // ============================================================
  showToast(message) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.add('hidden'), 3800);
  }

  loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignoruj
    }
  }

  escape(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  escapeXml(str) {
    return this.escape(str);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new TerraHistoriaApp();
  app.init();
  window.__terraHistoria = app;
});
