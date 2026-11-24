// TerraHistoria — Baza danych historycznych, szlaków handlowych, pól bitewnych i znalezisk
// Zakres chronologiczny: 4000 p.n.e. – 1945 n.e.

export const MIN_YEAR = -4000;
export const MAX_YEAR = 1950;

export const ERAS = [
  { id: 'all', label: 'Cała historia', shortLabel: 'Wszystkie', start: -4000, end: 1950 },
  { id: 'prehistory', label: 'Pradzieje i Starożytność', shortLabel: 'Do 500 n.e.', start: -4000, end: 500 },
  { id: 'early_medieval', label: 'Wczesne średniowiecze', shortLabel: '500–1200', start: 500, end: 1200 },
  { id: 'late_medieval', label: 'Późne średniowiecze', shortLabel: '1200–1500', start: 1200, end: 1500 },
  { id: 'commonwealth', label: 'Rzeczpospolita (XVI–XVIII w.)', shortLabel: '1500–1795', start: 1500, end: 1795 },
  { id: 'partitions', label: 'Zabory i XIX wiek', shortLabel: '1795–1914', start: 1795, end: 1914 },
  { id: 'world_wars', label: 'I i II Wojna Światowa', shortLabel: '1914–1950', start: 1914, end: 1950 }
];

export const CATEGORIES = {
  battle: {
    id: 'battle',
    label: 'Pola bitewne',
    singular: 'Pole bitewne',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.16)',
    border: '#fca5a5',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M14.5 6.5L18 3h3v3l-3.5 3.5"/><path d="M5 14l4 4"/><path d="M7 17l-3 3"/><path d="M3 19l2 2"/></svg>`
  },
  route: {
    id: 'route',
    label: 'Szlaki handlowe',
    singular: 'Szlak handlowy',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.16)',
    border: '#fcd34d',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>`
  },
  castle: {
    id: 'castle',
    label: 'Zamki i grody',
    singular: 'Zamek / Gród',
    color: '#d97706',
    bg: 'rgba(217, 119, 6, 0.18)',
    border: '#fbbf24',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l2-2V3h2v2h2V3h2v2h2V3h2v2l2 2v14"/><path d="M9 21v-5a3 3 0 0 1 6 0v5"/><path d="M9 10h.01"/><path d="M15 10h.01"/></svg>`
  },
  treasure: {
    id: 'treasure',
    label: 'Znaleziska i skarby',
    singular: 'Znalezisko / Skarb',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.16)',
    border: '#6ee7b7',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="M16.71 13.88l.7.71-2.82 2.82"/></svg>`
  },
  settlement: {
    id: 'settlement',
    label: 'Osady i trakty',
    singular: 'Dawna osada / Ośrodek',
    color: '#0ea5e9',
    bg: 'rgba(14, 165, 233, 0.16)',
    border: '#7dd3fc',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9 20v-6h6v6"/></svg>`
  },
  fortification: {
    id: 'fortification',
    label: 'Umocnienia XIX–XX w.',
    singular: 'Twierdza / Umocnienia',
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.22)',
    border: '#cbd5e1',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11h8"/><path d="M12 7v8"/></svg>`
  },
  custom: {
    id: 'custom',
    label: 'Moje punkty',
    singular: 'Punkt terenowy',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.18)',
    border: '#d8b4fe',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
  }
};

export function formatYear(year) {
  if (year === null || year === undefined || Number.isNaN(Number(year))) return 'Data nieznana';
  const y = Math.round(Number(year));
  if (y < 0) return `${Math.abs(y)} p.n.e.`;
  return `${y} n.e.`;
}

export function formatYearRange(start, end) {
  if (start == null && end == null) return 'Okres nieokreślony';
  if (end == null || start === end) return formatYear(start);
  if (start < 0 && end < 0) return `${Math.abs(start)}–${Math.abs(end)} p.n.e.`;
  if (start < 0 && end >= 0) return `${Math.abs(start)} p.n.e. – ${end} n.e.`;
  return `${start}–${end} n.e.`;
}

// ============================================================
// SZLAKI HANDLOWE (POLILINIE NA MAPIE)
// ============================================================
export const TRADE_ROUTES = [
  {
    id: 'route-amber',
    name: 'Szlak Bursztynowy (Via Succinea)',
    category: 'route',
    color: '#f59e0b',
    dashArray: '10, 6',
    yearStart: -500,
    yearEnd: 450,
    eraLabel: 'Starożytność / Okres wpływów rzymskich',
    region: 'Śląsk, Wielkopolska, Kujawy, Pomorze',
    goods: 'Bursztyn bałtycki, rzymskie denary i solidy, naczynia terra sigillata, szkło, broń, futra',
    keyCities: 'Brama Morawska → Racibórz → Opole → Kalisz (Calisia) → Konin → Kruszwica → Świecie → Pruszcz Gdański → Zatoka Gdańska',
    summary: 'Najsłynniejszy antyczny szlak handlowy łączący Cesarstwo Rzymskie (Akwileja, Carnuntum) z wybrzeżem Bałtyku, opisany przez Pliniusza Starszego i Klaudiusza Ptolemeusza.',
    details: 'Wzdłuż szlaku funkcjonowały liczne osady targowe, przeprawy rzeczne (brody na Prośnie, Warcie i Wiśle) oraz faktorie przeładunkowe. W okolicach Kalisza (Calisia), Kruszwicy i Pruszcza Gdańskiego odkryto największe w Polsce koncentracje rzymskich monet (denarów i solidów), fibul i importów z prowincji rzymskich.',
    terrainHint: 'Korytarze dolin rzecznych (Odra, Prosna, Noteć, Dolna Wisła) oraz suche wyżyny i brody rzeczne. Na mapie LIDAR widoczne miejscami stare wąwozy traktowe.',
    legalStatus: 'permit_required',
    legalNote: 'Przebieg szlaku jest przybliżony historycznie. Na obszarach nieobjętych rejestrem stanowisk archeologicznych poszukiwania wymagają pisemnej zgody właściciela gruntu i pozwolenia WKZ.',
    finds: [
      { item: 'Tysiące rzymskich denarów, medaliony i brązowe fibule w rejonie Calisii', discoverer: 'Badania archeologiczne (IAiE PAN / Kalisz)', year: 'XIX–XXI w.', dating: 'I–IV w. n.e.', museum: 'Muzeum Okręgowe Ziemi Kaliskiej' },
      { item: 'Importowane rzymskie naczynia szklane, brązowe wiadra i paciorki bursztynowe', discoverer: 'Badania w Pruszczu Gdańskim', year: '1968–2015', dating: 'I–IV w. n.e.', museum: 'Muzeum Archeologiczne w Gdańsku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Szlak_bursztynowy',
    source: 'Baza TerraHistoria / Ptolemeusz / Archeologia PAN',
    coordinates: [
      [49.85, 18.25], [50.09, 18.22], [50.67, 17.92], [51.25, 18.14],
      [51.76, 18.09], [52.22, 18.25], [52.67, 18.33], [53.01, 18.60],
      [53.41, 18.45], [54.09, 18.78], [54.26, 18.64], [54.35, 18.65]
    ]
  },
  {
    id: 'route-via-regia',
    name: 'Via Regia (Wielka Droga Królewska)',
    category: 'route',
    color: '#6366f1',
    dashArray: '12, 5',
    yearStart: 900,
    yearEnd: 1815,
    eraLabel: 'Średniowiecze – Nowożytność',
    region: 'Dolny Śląsk, Opolszczyzna, Małopolska, Podkarpacie',
    goods: 'Sukno flamandzkie, sól wielicka, ołów i srebro z Olkusza, wino, korzenie, bydło z Rusi',
    keyCities: 'Zgorzelec → Bolesławiec → Legnica → Wrocław → Brzeg → Opole → Bytom → Kraków → Bochnia → Tarnów → Rzeszów → Przemyśl → Lwów',
    summary: 'Najważniejsza średniowieczna arteria komunikacyjna i handlowa łącząca Europę Zachodnią (Santiago de Compostela, Paryż, Lipsk) z Rusią Kijowską przez południową Polskę.',
    details: 'Trakt podlegał specjalnej ochronie królewskiej (mir drogowy). Wzdłuż Via Regia lokowano liczne miasta na prawie magdeburskim, komory celne, karczmy przydrożne oraz mosty strzeżone przez warowne zamki. Była to również główna droga przemarszów armii (m.in. wojsk napoleońskich w 1812–1813 r.).',
    terrainHint: 'Przebiega głównie wzdłuż przedgórza i doliny Odry oraz północnego skraju Pogórza Karpackiego. Dawne karczmy często stały co 12–18 km przy przeprawach.',
    legalStatus: 'permit_required',
    legalNote: 'Historyczny ciąg komunikacyjny; w miastach i przy reliktach grodów obowiązują strefy ochrony konserwatorskiej.',
    finds: [
      { item: 'Liczne luźne monety średniowieczne (grosze praskie, denary, szelągi) oraz plomby towarowe', discoverer: 'Badania powierzchniowe AZP i zbiory muzealne', year: 'XX–XXI w.', dating: 'XIII–XVIII w.', museum: 'Muzeum Miejskie Wrocławia / Muzeum Krakowa' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Via_Regia',
    source: 'Baza TerraHistoria / Europejski Szlak Kulturowy',
    coordinates: [
      [51.15, 15.01], [51.26, 15.56], [51.21, 16.16], [51.11, 17.03],
      [50.86, 17.47], [50.67, 17.92], [50.35, 18.92], [50.06, 19.94],
      [49.97, 20.43], [50.01, 20.99], [50.04, 22.00], [49.78, 22.77], [49.84, 24.03]
    ]
  },
  {
    id: 'route-salt',
    name: 'Szlak Solny (Wieliczka – Wielkopolska)',
    category: 'route',
    color: '#38bdf8',
    dashArray: '8, 6',
    yearStart: 1100,
    yearEnd: 1795,
    eraLabel: 'Średniowiecze – I Rzeczpospolita',
    region: 'Małopolska, Śląsk, Wielkopolska',
    goods: 'Sól kamienna z Wieliczki i Bochni, ołów, miedź, żelazo, produkty rolne',
    keyCities: 'Bochnia → Wieliczka → Kraków → Olkusz → Częstochowa → Wieluń → Kalisz → Poznań',
    summary: 'Strategiczny szlak transportu „białego złota” z żup krakowskich w głąb Korony, na Śląsk i do Wielkopolski.',
    details: 'Sól była jednym z najcenniejszych towarów średniowiecza i głównym źródłem dochodów skarbu królewskiego. Przy trakcie rozwijały się składy solne, komory celne, osady rzemieślnicze (kowale, kołodzieje) i przydrożne zajazdy.',
    terrainHint: 'Wyżyna Krakowsko-Częstochowska (Jura) i przejścia między wzgórzami wapiennymi, dalej równiny wielkopolskie.',
    legalStatus: 'permit_required',
    legalNote: 'Część dawnych składów solnych jest wpisana do rejestru zabytków; poza strefami chronionymi wymagane pozwolenie właściciela i WKZ.',
    finds: [
      { item: 'Monety koronne, odważniki kupieckie i okucia wozów transportowych', discoverer: 'Zbiory regionalne (Olkusz, Wieluń)', year: 'XX w.', dating: 'XIV–XVII w.', museum: 'Muzeum Żup Krakowskich Wieliczka' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Szlaki_solne',
    source: 'Baza TerraHistoria / Muzeum Żup Krakowskich',
    coordinates: [
      [49.97, 20.43], [49.98, 20.06], [50.06, 19.94], [50.28, 19.56],
      [50.81, 19.12], [51.22, 18.57], [51.76, 18.09], [52.41, 16.93]
    ]
  },
  {
    id: 'route-hanseatic',
    name: 'Via Hanseatica (Szlak Hanzeatycki)',
    category: 'route',
    color: '#ec4899',
    dashArray: '10, 5',
    yearStart: 1250,
    yearEnd: 1669,
    eraLabel: 'Późne średniowiecze – Renesans',
    region: 'Pomorze Zachodnie, Pomorze Gdańskie, Prusy',
    goods: 'Śledzie, sukno, wino reńskie, drewno okrętowe, zboże, bursztyn, miedź',
    keyCities: 'Szczecin → Stargard → Kołobrzeg → Koszalin → Słupsk → Lębork → Gdańsk → Elbląg → Braniewo → Królewiec',
    summary: 'Nadmorski trakt kupiecki łączący potężne miasta Ligi Hanzeatyckiej wzdłuż południowego wybrzeża Bałtyku.',
    details: 'Równolegle do żeglugi morskiej funkcjonował lądowy trakt pocztowo-kupiecki, używany szczególnie zimą i w czasie wojen na Bałtyku. Obfitował w mosty, groble, komory celne i zamki krzyżackie oraz książąt pomorskich.',
    terrainHint: 'Pradolina nadmorska, przeprawy przez Parsętę, Słupię, Łebę i Wisłę. W lasach pomorskich LIDAR doskonale ukazuje dawne groble i trakty pocztowe.',
    legalStatus: 'permit_required',
    legalNote: 'Lasy Państwowe i grunty prywatne wymagają zgody zarządcy oraz pozwolenia WKZ.',
    finds: [
      { item: 'Plomby sukiennicze z miast hanzeatyckich (Lubeka, Gdańsk, Elbląg) i szelągi krzyżackie', discoverer: 'Badania archeologiczne Elbląga i Gdańska', year: '1980–2022', dating: 'XIV–XVI w.', museum: 'Muzeum Archeologiczno-Historyczne w Elblągu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Hanza',
    source: 'Baza TerraHistoria / Archiwum Hanzy',
    coordinates: [
      [53.43, 14.55], [53.34, 15.05], [54.18, 15.58], [54.19, 16.18],
      [54.46, 17.03], [54.54, 17.75], [54.35, 18.65], [54.15, 19.40], [54.38, 19.82], [54.71, 20.51]
    ]
  },
  {
    id: 'route-jagiellonian',
    name: 'Szlak Jagielloński (Kraków – Lublin – Wilno)',
    category: 'route',
    color: '#a855f7',
    dashArray: '10, 6',
    yearStart: 1385,
    yearEnd: 1795,
    eraLabel: 'Późne średniowiecze – I Rzeczpospolita',
    region: 'Małopolska, Lubelszczyzna, Podlasie, Litwa',
    goods: 'Futra litewskie, wosk, miód, len, wyroby rzemieślnicze, broń, jedwab',
    keyCities: 'Kraków → Nowy Korczyn → Sandomierz → Kraśnik → Lublin → Parczew → Brześć → Bielsk Podlaski → Grodno → Wilno',
    summary: 'Główny trakt dyplomatyczny, królewski i handlowy łączący obie stolice Rzeczypospolitej Obojga Narodów po unii w Krewie.',
    details: 'Tą drogą wielokrotnie podróżowali królowie z dynastii Jagiellonów, poselstwa zagraniczne oraz wielkie karawany kupieckie zmierzające na słynne jarmarki lubelskie. Na trasie znajdowały się liczne stacje królewskie i dwory.',
    terrainHint: 'Przeprawy przez Wisłę (Sandomierz / Zawichost), Wyżyna Lubelska, doliny Bugu i Narwi.',
    legalStatus: 'permit_required',
    legalNote: 'Historyczny szlak; obszary miejskie i dawne dwory podlegają ochronie konserwatorskiej.',
    finds: [
      { item: 'Półgrosze jagiellońskie, boratynki, guziki kontuszowe i elementy rzędu końskiego', discoverer: 'Zbiory muzealne Lubelszczyzny', year: 'XX–XXI w.', dating: 'XV–XVII w.', museum: 'Muzeum Narodowe w Lublinie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Szlak_Jagiello%C5%84ski',
    source: 'Baza TerraHistoria / Szlak Jagielloński',
    coordinates: [
      [50.06, 19.94], [50.30, 20.81], [50.68, 21.75], [50.93, 22.22],
      [51.25, 22.57], [51.64, 22.90], [52.09, 23.70], [52.77, 23.19], [53.67, 23.83], [54.69, 25.28]
    ]
  },
  {
    id: 'route-vistula',
    name: 'Szlak Wiślany (Spław Zbożowy i Towarowy)',
    category: 'route',
    color: '#06b6d4',
    dashArray: '6, 6',
    yearStart: 1300,
    yearEnd: 1850,
    eraLabel: 'Średniowiecze – XIX wiek',
    region: 'Małopolska, Mazowsze, Kujawy, Pomorze',
    goods: 'Zboże (pszenica, żyto), drewno, potaż, popiół, wino, śledzie, przyprawy z Gdańska',
    keyCities: 'Kraków → Sandomierz → Kazimierz Dolny → Warszawa → Płock → Włocławek → Toruń → Grudziądz → Tczew → Gdańsk',
    summary: 'Główna arteria gospodarcza dawnej Polski — spław zboża szkutami i dubasami ze szlacheckich folwarków do portu w Gdańsku.',
    details: 'Wzdłuż brzegów Wisły powstały setki spichlerzy, przystani rzecznych, karczm flisackich i komór celnych (m.in. Nieszawa, Włocławek, Płock). Przy niskim stanie wody na brzegach i łachach często odsłaniają się historyczne przedmioty (jak słynny miecz wikiński z Włocławka z 2024 r.).',
    terrainHint: 'Tarasy zalewowe, stare koryta rzeczne (starorzecza) i dawne przystanie załadunkowe.',
    legalStatus: 'permit_required',
    legalNote: 'Brzegi rzek podlegają Wodom Polskim; poszukiwania zabytków wymagają pozwolenia WKZ oraz zarządcy terenu.',
    finds: [
      { item: 'Miecz wikiński typu Ulfberht (X w.) oraz kotwice i monety przy dawnych przystaniach', discoverer: 'Prace pogłębiarskie w porcie we Włocławku', year: '2024', dating: 'X w.', museum: 'Muzeum Ziemi Kujawskiej i Dobrzyńskiej' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Sp%C5%82aw_wi%C5%9Blany',
    source: 'Baza TerraHistoria / Muzeum Wisły w Tczewie',
    coordinates: [
      [50.06, 19.94], [50.68, 21.75], [51.32, 21.95], [52.23, 21.01],
      [52.55, 19.70], [52.66, 19.07], [53.01, 18.60], [53.48, 18.75], [54.09, 18.78], [54.35, 18.65]
    ]
  },
  {
    id: 'route-napoleon',
    name: 'Wielki Trakt Pocztowy / Napoleoński (Berlin – Poznań – Warszawa)',
    category: 'route',
    color: '#ef4444',
    dashArray: '14, 6',
    yearStart: 1750,
    yearEnd: 1865,
    eraLabel: 'XVIII–XIX wiek / Epoka Napoleońska',
    region: 'Lubuskie, Wielkopolska, Mazowsze',
    goods: 'Poczta królewska, zaopatrzenie wojskowe, towary przemysłowe, przemarsze Wielkiej Armii (1806–1813)',
    keyCities: 'Frankfurt n. Odrą → Świebodzin → Pniewy → Poznań → Września → Konin → Koło → Kutno → Łowicz → Sochaczew → Warszawa',
    summary: 'Główna arteria pocztowo-wojskowa XVIII i XIX w., którą maszerowała Wielka Armia Napoleona w kampaniach 1806–1807 i 1812 oraz wojska Powstania Listopadowego.',
    details: 'Co kilkanaście kilometrów znajdowały się stacje pocztowe (pocztyliony), rogatki i karczmy. W okolicach obozowisk i przepraw przy tym trakcie odnotowywano liczne pamiątki militarne (guziki pułkowe, kule muszkietowe, klamry, monety pruskie, francuskie i Księstwa Warszawskiego).',
    terrainHint: 'Równina Wielkopolska i Mazowiecka; dawne stacje pocztowe często widoczne na pruskich mapach Messtischblatt (1:25 000).',
    legalStatus: 'permit_required',
    legalNote: 'Wymagane standardowe pozwolenie właściciela gruntu i WKZ przed pracami terenowymi.',
    finds: [
      { item: 'Guziki pułkowe Wielkiej Armii, kule ołowiane, podkowy i monety Księstwa Warszawskiego', discoverer: 'Zbiory regionalne i legalne badania stowarzyszeń', year: '2000–2024', dating: '1806–1831', museum: 'Wielkopolskie Muzeum Wojskowe' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Ksi%C4%99stwo_Warszawskie',
    source: 'Baza TerraHistoria / Kartografia XIX w.',
    coordinates: [
      [52.35, 14.55], [52.25, 15.53], [52.51, 16.25], [52.41, 16.93],
      [52.33, 17.56], [52.22, 18.25], [52.20, 18.64], [52.23, 19.36], [52.11, 19.95], [52.23, 21.01]
    ]
  },
  {
    id: 'route-rus',
    name: 'Szlak Wschodni Piastowski (Poznań – Gniezno – Brześć – Kijów)',
    category: 'route',
    color: '#14b8a6',
    dashArray: '8, 5',
    yearStart: 950,
    yearEnd: 1400,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Wielkopolska, Mazowsze, Podlasie',
    goods: 'Srebro arabskie (dirhemy), niewolnicy, futra, wosk, tkaniny bizantyjskie, broń',
    keyCities: 'Poznań → Gniezno → Łęczyca → Czersk → Drohiczyn → Brześć',
    summary: 'Wczesnośredniowieczny szlak łączący kolebkę państwa Piastów z Rusią Kijowską i strefą handlu wschodniego.',
    details: 'Tym szlakiem napływały na ziemie polskie ogromne ilości srebrnych dirhemów arabskich (IX–XI w.) oraz plomby drohiczyńskie (tysiące ołowianych plomb towarowych z XI–XIII w. odnajdywanych na brzegach Bugu w Drohiczynie).',
    terrainHint: 'Przeprawy przez Wartę, Bzurę, Wisłę (Czersk) i Bug (Drohiczyn).',
    legalStatus: 'permit_required',
    legalNote: 'Rejon Drohiczyna i grodów piastowskich zawiera liczne stanowiska archeologiczne objęte ścisłą ochroną.',
    finds: [
      { item: 'Ponad 15 000 ołowianych plomb towarowych (tzw. plomby drohiczyńskie) z XI–XIII w.', discoverer: 'Badania od XIX w. (K. Bołsunowski, K. Musianowicz)', year: '1880–2010', dating: 'XI–XIII w.', museum: 'Państwowe Muzeum Archeologiczne w Warszawie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Plomby_drohiczy%C5%84skie',
    source: 'Baza TerraHistoria / PMA Warszawa',
    coordinates: [
      [52.41, 16.93], [52.53, 17.60], [52.06, 19.20], [51.96, 21.23], [52.40, 22.66], [52.09, 23.70]
    ]
  }
];

// ============================================================
// PUNKTY HISTORYCZNE: BITWY, ZAMKI, OSADY, ZNALEZISKA, TWIERDZE
// ============================================================
export const HISTORICAL_SITES = [
  // ---------- PRADZIEJE I STAROŻYTNOŚĆ (-4000 do 500 n.e.) ----------
  {
    id: 'site-krzemionki',
    name: 'Krzemionki Opatowskie — Kopalnie Neolityczne',
    category: 'settlement',
    lat: 50.9708, lng: 21.5008,
    yearStart: -3900, yearEnd: -1600,
    eraLabel: 'Neolit i wczesna epoka brązu',
    region: 'Świętokrzyskie',
    summary: 'Jeden z największych i najlepiej zachowanych w Europie kompleksów prehistorycznych kopalń krzemienia pasiastego (Lista UNESCO).',
    details: 'Ponad 4000 szybów górniczych z okresu kultury pucharów lejkowatych i amfor kulistych. Wyrabiane tu siekiery krzemienne rozchodziły się w promieniu ponad 600 km po całej Europie Środkowej.',
    terrainHint: 'Leśny teren krasowy z charakterystycznymi tysiącami lejów poszybowych (fenomenalnie widocznych na warstwie LIDAR!).',
    legalStatus: 'protected_monument',
    legalNote: 'Rezerwat archeologiczny i obiekt UNESCO — bezwzględny zakaz poszukiwań z wykrywaczem.',
    finds: [
      { item: 'Tysiące narzędzi górniczych z rogu, półwytworów siekier krzemiennych i rysunki węglem na ścianach kopalń', discoverer: 'Prof. Jan Samsonowicz (odkrywca kopalni)', year: '1922', dating: '3900–1600 p.n.e.', museum: 'Muzeum Archeologiczne i Rezerwat Krzemionki' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Krzemionki',
    source: 'Baza TerraHistoria / UNESCO / NID'
  },
  {
    id: 'site-trzcinica',
    name: 'Trzcinica — „Karpacka Troja”',
    category: 'castle',
    lat: 49.7544, lng: 21.4189,
    yearStart: -2100, yearEnd: 1031,
    eraLabel: 'Epoka brązu – Wczesne średniowiecze',
    region: 'Podkarpackie',
    summary: 'Najstarsza silnie ufortyfikowana osada obronna w Polsce, zamieszkana już ok. 2100 r. p.n.e., później potężny gród wczesnośredniowieczny.',
    details: 'Odkryto tu jedne z pierwszych w Polsce śladów oddziaływań cywilizacji anatolijsko-bałkańskiej (kultura Otomani-Füzesabony), potężne wały obronne i dziesiątki tysięcy artefaktów.',
    terrainHint: 'Wyniosły cypel nad doliną rzeki Ropy, wyraźne wały grodziskowe widoczne na LIDAR.',
    legalStatus: 'protected_monument',
    legalNote: 'Skansen archeologiczny i zabytek chroniony — bezwzględny zakaz poszukiwań.',
    finds: [
      { item: 'Ponad 160 000 zabytków: wyroby z brązu, złoty skarb srebrno-złotych ozdób wczesnośredniowiecznych (600 przedmiotów)', discoverer: 'Zespół archeologów pod kier. Jana Gancarskiego', year: '1991–2008', dating: '2100 p.n.e. – XI w.', museum: 'Skansen Archeologiczny Karpacka Troja' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Karpacka_Troja',
    source: 'Baza TerraHistoria / Muzeum Podkarpackie'
  },
  {
    id: 'site-biskupin',
    name: 'Biskupin — Gród Kultury Łużyckiej',
    category: 'castle',
    lat: 52.7892, lng: 17.7444,
    yearStart: -738, yearEnd: -400,
    eraLabel: 'Epoka żelaza (kultura łużycka)',
    region: 'Kujawsko-Pomorskie (Pałuki)',
    summary: 'Najsłynniejszy w Europie Środkowej drewniany gród obronny na półwyspie Jeziora Biskupińskiego, datowany dendrochronologicznie na zimę 738/737 p.n.e.',
    details: 'Osada składała się z 13 rzędów domostw otoczonych potężnym falochronem i wałem drewniano-ziemnym, zamieszkana przez ok. 800–1000 osób.',
    terrainHint: 'Półwysep jeziorny na Pojezierzu Gnieźnieńskim, podmokłe torfowiska sprzyjające konserwacji drewna i metali.',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii i rezerwat archeologiczny — ścisła ochrona.',
    finds: [
      { item: 'Drewniane konstrukcje obronne, narzędzia brązowe i żelazne, ceramika, ozdoby bursztynowe', discoverer: 'Walenty Szwajcer (nauczyciel) oraz prof. Józef Kostrzewski', year: '1933', dating: 'VIII–V w. p.n.e.', museum: 'Muzeum Archeologiczne w Biskupinie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Biskupin_(stanowisko_archeologiczne)',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-witaszkowo',
    name: 'Skarb z Witaszkowa (Vettersfelde)',
    category: 'treasure',
    lat: 51.8386, lng: 14.8442,
    yearStart: -500, yearEnd: -450,
    eraLabel: 'Starożytność (wpływy scytyjskie)',
    region: 'Lubuskie',
    summary: 'Sensacyjny złoty skarb scytyjskiego wodza z V w. p.n.e., zawierający słynną 41-centymetrową złotą rybę o wadze ponad 600 g.',
    details: 'Jeden z najcenniejszych skarbów pradziejowych odnalezionych na obecnych ziemiach polskich, świadczący o dalekosiężnych najazdach lub kontaktach scytyjskich aż nad Nysę Łużycką.',
    terrainHint: 'Pola uprawne na zachód od Lubska, skraj obniżenia doliny Nysy.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Historyczne miejsce odkrycia — okolica ujęta w ewidencji stanowisk archeologicznych.',
    finds: [
      { item: 'Złota ryba (okucie tarczy, 608 g złota), złoty naszyjnik, okucie pochwy miecza akinakesa i naramiennik (ponad 4 kg złota)', discoverer: 'Rolnik August Lauschke podczas jesiennej orki', year: '1882', dating: 'Ok. 500 p.n.e.', museum: 'Altes Museum (Antikensammlung), Berlin' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Skarb_z_Witaszkowa',
    source: 'Baza TerraHistoria / Antikensammlung'
  },
  {
    id: 'site-calisia',
    name: 'Calisia / Kalisz-Piwonice (Osada Rzymska)',
    category: 'settlement',
    lat: 51.7289, lng: 18.1112,
    yearStart: 50, yearEnd: 400,
    eraLabel: 'Okres wpływów rzymskich',
    region: 'Wielkopolskie',
    summary: 'Wielka osada produkcyjno-handlowa kultury przeworskiej na Szlaku Bursztynowym, utożsamiana z miejscowością Calisia z mapy Ptolemeusza (II w. n.e.).',
    details: 'W rejonie doliny Prosny istniał gęsty zespół osad, kuźnic i cmentarzysk z okresu rzymskiego, obfitujący w importy z Imperium Rzymskiego.',
    terrainHint: 'Piaszczyste tarasy nad Prosną na południe od Kalisza.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Liczne stanowiska archeologiczne kultury przeworskiej — wymagana weryfikacja mapy AZP i zgoda WKZ.',
    finds: [
      { item: 'Skarb z Zagórzyna (solidy rzymskie, złote medaliony cesarzy, srebrne sztaby), setki denarów i fibul', discoverer: 'Przypadkowe odkrycia rolników oraz badania K. Dąbrowskiego', year: '1927 / 1952–1968', dating: 'I–V w. n.e.', museum: 'Muzeum Okręgowe Ziemi Kaliskiej / PMA' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Calisia',
    source: 'Baza TerraHistoria / IAiE PAN'
  },
  {
    id: 'site-dymarki',
    name: 'Świętokrzyski Okręg Hutniczy (Nowa Słupia)',
    category: 'settlement',
    lat: 50.8617, lng: 21.0853,
    yearStart: 1, yearEnd: 400,
    eraLabel: 'Okres wpływów rzymskich',
    region: 'Świętokrzyskie',
    summary: 'Największy ośrodek metalurgii żelaza w Europie poza granicami Cesarstwa Rzymskiego (tzw. Barbaricum).',
    details: 'Odkryto tu setki tysięcy pieców dymarskich (ponad 6000 stanowisk piecowiskowych u podnóża Łysogór!), w których wytopiono ok. 5000–8000 ton żelaza.',
    terrainHint: 'Przedpole Gór Świętokrzyskich, pola wokół Nowej Słupi, Rudek i Bodzentyna — w glebie powszechnie występuje żużel dymarski.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Obszar bogaty w stanowiska archeologiczne (piecowiska) — prace wymagają pozwolenia WKZ.',
    finds: [
      { item: 'Kloce żużla dymarskiego, pozostałości 400 000 pieców hutniczych, monety rzymskie i narzędzia kowalskie', discoverer: 'Prof. Mieczysław Radwan i dr Kazimierz Bielenin', year: '1955–1990', dating: 'I–IV w. n.e.', museum: 'Muzeum Starożytnego Hutnictwa Świętokrzyskiego' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/%C5%9Awi%C4%99tokrzyski_okr%C4%99g_hutniczy',
    source: 'Baza TerraHistoria / MSHŚ'
  },
  {
    id: 'site-zakrzow',
    name: 'Groby Książęce z Wrocławia-Zakrzowa',
    category: 'treasure',
    lat: 51.1583, lng: 17.1211,
    yearStart: 270, yearEnd: 310,
    eraLabel: 'Okres wpływów rzymskich',
    region: 'Dolnośląskie',
    summary: 'Jedno z najbogatszych odkryć książęcych w Europie Środkowej z końca III w. n.e., pełne złotej biżuterii i luksusowych rzymskich naczyń.',
    details: 'Trzy komory grobowe arystokracji germańskiej (Wandalów), zawierające rzymskie srebrne naczynia, szklane puchary, składany stół z brązu i złote zapinki.',
    terrainHint: 'Północno-wschodnia część Wrocławia (Zakrzów), dawne piaszczyste wzgórza nad Widawą.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Obszar miejski / historyczne stanowisko archeologiczne.',
    finds: [
      { item: 'Złote fibule i pierścienie, srebrne łyżki, rzymski trójnóg z brązu, szklane misy millefiori i złota moneta cesarza Klaudiusza II', discoverer: 'Robotnicy w piaskowni (zgłoszone muzeum we Wrocławiu)', year: '1886–1887', dating: 'Ok. 300 n.e.', museum: 'Muzeum Archeologiczne we Wrocławiu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Skarb_z_Zakrzowa',
    source: 'Baza TerraHistoria / Muzeum Miejskie Wrocławia'
  },

  // ---------- WCZESNE ŚREDNIOWIECZE (500–1200) ----------
  {
    id: 'site-truso',
    name: 'Truso (Janów Pomorski) — Wikiński Port Handlowy',
    category: 'settlement',
    lat: 54.0936, lng: 19.4494,
    yearStart: 780, yearEnd: 1020,
    eraLabel: 'Wczesne średniowiecze (epoka wikingów)',
    region: 'Warmińsko-Mazurskie',
    summary: 'Legendarne wikińsko-pruskie emporium handlowe opisane przez żeglarza Wulfstana ok. 890 r., zlokalizowane nad jeziorem Drużno.',
    details: 'Przez stulecia szukano zaginionego Truso, aż w 1982 r. dr Marek Jagodziński odkrył port z przystaniami dla łodzi wikińskich, pracowniami bursztyniarskimi, złotniczymi i ogromną liczbą odważników oraz dirhemów arabskich.',
    terrainHint: 'Brzeg dawnej zatoki Zalewu Wiślanego (obecnie jezioro Drużno), teren płaski, łąki i pola.',
    legalStatus: 'protected_monument',
    legalNote: 'Ściśle chronione stanowisko archeologiczne (rezerwat) — zakaz nielegalnych poszukiwań.',
    finds: [
      { item: 'Ponad 1000 monet (głównie arabskich dirhemów i pensów angielskich), 350 odważników kupieckich, broń wikińska, wraki łodzi klepkowych', discoverer: 'Dr Marek Jagodziński (badania powierzchniowe i wykopaliskowe)', year: '1982–2020', dating: 'VIII–XI w.', museum: 'Muzeum Archeologiczno-Historyczne w Elblągu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Truso',
    source: 'Baza TerraHistoria / MAH Elbląg'
  },
  {
    id: 'site-wolin',
    name: 'Wolin (Jomsborg / Wineta) — Ośrodek Wczesnośredniowieczny',
    category: 'settlement',
    lat: 53.8419, lng: 14.6147,
    yearStart: 750, yearEnd: 1150,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Zachodniopomorskie',
    summary: 'Jedno z największych miast wczesnośredniowiecznej Europy (do 8–10 tys. mieszkańców), słynny port słowiańsko-skandynawski nad Dziwną.',
    details: 'W kronice Adama z Bremy opisany jako „największe ze wszystkich miast, jakie są w Europie”. Ośrodek handlu srebrem, bursztynem, rzemiosła i punkt wypadowy wikingów z Jomsborga.',
    terrainHint: 'Wzgórze Wisielców, Srebrne Wzgórze oraz brzeg cieśniny Dziwny.',
    legalStatus: 'protected_monument',
    legalNote: 'Obszar o wyjątkowym nasyceniu stanowiskami archeologicznymi — ścisła ochrona konserwatorska.',
    finds: [
      { item: 'Figurka Świętowita, liczne skarby srebra siekanego, monety arabskie i saskie, ozdoby wikińskie i słowiańskie', discoverer: 'Prof. Władysław Filipowiak i pokolenia archeologów', year: '1952–2024', dating: 'VIII–XII w.', museum: 'Muzeum Regionalne im. A. Kaubego w Wolinie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Wolin_(miasto)',
    source: 'Baza TerraHistoria / IAiE PAN'
  },
  {
    id: 'site-ostrow-lednicki',
    name: 'Ostrów Lednicki — Gród Pierwszych Piastów',
    category: 'castle',
    lat: 52.5269, lng: 17.3783,
    yearStart: 930, yearEnd: 1038,
    eraLabel: 'Wczesne średniowiecze (Początki Polski)',
    region: 'Wielkopolskie',
    summary: 'Jeden z najważniejszych grodów Mieszka I i Bolesława Chrobrego, prawdopodobne miejsce Chrztu Polski (966 r.), z unikalnymi mostami i palatium.',
    details: 'Zniszczony podczas najazdu czeskiego księcia Brzetysława w 1038 r. Na dnie Jeziora Lednickiego przy spalonych mostach odkryto jedną z największych w Europie kolekcji wczesnośredniowiecznej broni!',
    terrainHint: 'Wyspa na Jeziorze Lednickim z wyraźnym wałem pierścieniowym.',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii i Muzeum Pierwszych Piastów — bezwzględny zakaz poszukiwań.',
    finds: [
      { item: 'Ponad 150 toporów bojowych, 60 grotów włóczni, miecze, hełm z XI w., złota stauroteka i dłubanki', discoverer: 'Archeolodzy podwodni (UMK Toruń) i Muzeum Pierwszych Piastów', year: '1959–2023', dating: 'X–XI w.', museum: 'Muzeum Pierwszych Piastów na Lednicy' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Ostr%C3%B3w_Lednicki',
    source: 'Baza TerraHistoria / MPP Lednica'
  },
  {
    id: 'site-cedynia',
    name: 'Bitwa pod Cedynią (972)',
    category: 'battle',
    lat: 52.8781, lng: 14.1986,
    yearStart: 972, yearEnd: 972,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Zachodniopomorskie',
    combatants: 'Polska (Mieszko I i Czcibor) vs Marchia Łużycka (margrabia Hodon)',
    outcome: 'Zdecydowane zwycięstwo wojsk Mieszka I',
    summary: 'Pierwsza szczegółowo opisana w kronikach (Thietmar z Merseburga) zwycięska bitwa państwa Piastów, stoczona 24 czerwca 972 r.',
    details: 'Zasadzka zastawiona przez brata Mieszka I — Czcibora — u podnóża wzgórz nad Odrą (tradycyjnie wskazywana Góra Czcibora lub przejście pod Osinowem Dolnym) rozbiła ciężkozbrojne rycerstwo niemieckie.',
    terrainHint: 'Strome wzgórza morenowe (Wzgórza Cedyńskie) opadające ku dolinie Odry — świetny punkt widokowy na rzeźbie LIDAR.',
    legalStatus: 'protected_monument',
    legalNote: 'Góra Czcibora i rejon grodziska w Cedyni podlegają ochronie; wszelkie badania terenowe wyłącznie za zgodą WKZ.',
    finds: [
      { item: 'Wczesnośredniowieczne groty strzał, ostrogi i elementy uzbrojenia z rejonu grodu w Cedyni', discoverer: 'Badania archeologiczne grodziska (1960–1985)', year: '1960–1985', dating: 'X–XI w.', museum: 'Muzeum Regionalne w Cedyni' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Cedyni%C4%85',
    source: 'Baza TerraHistoria / Kronika Thietmara'
  },
  {
    id: 'site-santok',
    name: 'Gród w Santoku — „Strażnica i Klucz Królestwa”',
    category: 'castle',
    lat: 52.7353, lng: 15.4008,
    yearStart: 750, yearEnd: 1450,
    eraLabel: 'Wczesne i późne średniowiecze',
    region: 'Lubuskie',
    summary: 'Strategiczny gród w widłach Warty i Noteci, określony przez Galla Anonima jako „strażnica i klucz Królestwa Polskiego”.',
    details: 'Bronił dostępu do Wielkopolski od strony Pomorza i Brandenburgii. Wielokrotnie zdobywany i odbudowywany (12 warstw osadniczych), bogaty w zabytki militarne i handlowe.',
    terrainHint: 'Niski cypel w widłach dwóch dużych rzek (Warty i Noteci) — naturalny węzeł szlaków wodnych.',
    legalStatus: 'protected_monument',
    legalNote: 'Rezerwat archeologiczny — ścisła ochrona.',
    finds: [
      { item: 'Wczesnośredniowieczne militaria, ostrogi, srebrne ozdoby, krzyżyki i plomby handlowe', discoverer: 'Badania polsko-niemieckie (1932–1934) i polskie (od 1958)', year: '1932–2018', dating: 'VIII–XIV w.', museum: 'Muzeum Grodu Santok' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Santok',
    source: 'Baza TerraHistoria / Muzeum Lubuskie'
  },
  {
    id: 'site-sluszkow',
    name: 'Skarby ze Słuszkowa (1935 i 2020)',
    category: 'treasure',
    lat: 51.8833, lng: 18.2194,
    yearStart: 1090, yearEnd: 1110,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Wielkopolskie (pow. kaliski)',
    summary: 'Miejsce odkrycia dwóch gigantycznych wczesnośredniowiecznych skarbów — łącznie blisko 20 000 srebrnych monet i złotych obrączek książęcych!',
    details: 'W 1935 r. odkryto tu największy na świecie zbiór denarów krzyżowych (13 061 monet). W listopadzie 2020 r. archeolodzy na tym samym polu znaleźli drugie naczynie zawierające 6500 monet i złote obrączki (w tym jedną z cyrylicznym napisem łączonym z księżną Marią, żoną Piotra Włostowica).',
    terrainHint: 'Pola uprawne na wschód od Kalisza, nieopodal dawnego szlaku z Kalisza w stronę Sieradza i Łęczycy.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Stanowisko objęte badaniami IAiE PAN i ochroną konserwatorską.',
    finds: [
      { item: 'Skarb I: 13 061 srebrnych denarów krzyżowych i denarów Sieciecha (ponad 12 kg srebra)', discoverer: 'Mieszkańcy wsi podczas prac polowych', year: '1935', dating: 'Koniec XI w.', museum: 'Muzeum Okręgowe Ziemi Kaliskiej' },
      { item: 'Skarb II: 6500 srebrnych monet, placki srebra, 2 złote obrączki (jedna z inskrypcją „Panie, pomóż służebnicy swojej Marii”)', discoverer: 'Zespół dr. Adama Kędzierskiego (IAiE PAN) we współpracy z lokalnym pasjonatem', year: '2020', dating: 'Przełom XI/XII w.', museum: 'IAiE PAN / MOZK Kalisz' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Skarb_ze_S%C5%82uszkowa',
    source: 'Baza TerraHistoria / IAiE PAN'
  },
  {
    id: 'site-borucin',
    name: 'Skarb z Borucina (Srebro i Dirhemy)',
    category: 'treasure',
    lat: 52.6689, lng: 18.6981,
    yearStart: 950, yearEnd: 1030,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Kujawsko-Pomorskie',
    summary: 'Słynny skarb wczesnośredniowiecznego srebra z Kujaw, zawierający wspaniałe zausznice, kaptorgi i srebrne monety z X–XI wieku.',
    details: 'Jeden z najważniejszych depozytów srebra z czasów formowania się państwa Piastów, zakopany na żyznych ziemiach Kujaw w pobliżu odnogi szlaku wiślanego.',
    terrainHint: 'Równina Kujawska, urodzajne czarnoziemy o wielowiekowej ciągłości osadniczej.',
    legalStatus: 'permit_required',
    legalNote: 'Historyczne miejsce odkrycia z XIX w.; poszukiwania w okolicy wymagają zgody właściciela i WKZ.',
    finds: [
      { item: 'Srebrne zausznice, naszyjniki, kaptorgi, siekańce oraz monety arabskie (dirhemy) i zachodnioeuropejskie', discoverer: 'Przypadkowe odkrycie w majątku ziemskim', year: '1856', dating: 'X–XI w.', museum: 'Państwowe Muzeum Archeologiczne / Muzeum Narodowe' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Borucin_(wojew%C3%B3dztwo_kujawsko-pomorskie)',
    source: 'Baza TerraHistoria / Katalog Skarbów Kujaw'
  },
  {
    id: 'site-wloclawek-sword',
    name: 'Odkrycie Miecza Wikińskiego we Włocławku (2024)',
    category: 'treasure',
    lat: 52.6604, lng: 19.0764,
    yearStart: 900, yearEnd: 990,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Kujawsko-Pomorskie',
    summary: 'Sensacyjne odkrycie ze stycznia 2024 r. — niemal idealnie zachowany wczesnośredniowieczny miecz z inskrypcją typu „Ulfberht” wydobyty z dna Wisły.',
    details: 'Badania RTG w UMK Toruń ujawniły na głowni napis „+ULFBERHT+” — sygnaturę najwyższej klasy kuźni nadreńskich, z której korzystali wikingowie i elita wojowników piastowskich.',
    terrainHint: 'Basen przystani nad Wisłą, dawna strefa przeprawowa i portowa.',
    legalStatus: 'permit_required',
    legalNote: 'Teren wód publicznych i przystani — badania wyłącznie z pozwoleniem WKZ i Wód Polskich.',
    finds: [
      { item: 'Miecz wczesnośredniowieczny (typ S wg Petersena) z inskrypcją +ULFBERHT+ na głowni', discoverer: 'Operator koparki Sławomir Mularski podczas pogłębiania basenu OSiR', year: 'Styczeń 2024', dating: 'Przed 950 r. (X w.)', museum: 'Muzeum Ziemi Kujawskiej i Dobrzyńskiej we Włocławku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Miecze_typu_Ulfberht',
    source: 'Baza TerraHistoria / WUOZ Toruń (2024)'
  },
  {
    id: 'site-glogow-1109',
    name: 'Obrona Głogowa (1109) i Skarb z Głogowa',
    category: 'battle',
    lat: 51.6636, lng: 16.0844,
    yearStart: 1109, yearEnd: 1230,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Dolnośląskie',
    combatants: 'Polska (Bolesław III Krzywousty i załoga grodu) vs Cesarstwo Niemieckie (Henryk V)',
    outcome: 'Heroiczna obrona grodu i odwrót wojsk cesarskich',
    summary: 'Słynne oblężenie piastowskiego grodu nad Odrą w 1109 r. W tym samym mieście odkryto w 1987 r. największy średniowieczny skarb monet w Polsce (ponad 20 600 sztuk!).',
    details: 'Głogów był kluczową przeprawą na Odrze i potężnym ośrodkiem książęcym. Bogactwo regionu potwierdza gigantyczny skarb z XIII w. odkryty przypadkowo w 1987 roku.',
    terrainHint: 'Ostrów Tumski w widłach Odry i Starej Odry, dawne wały i fosa.',
    legalStatus: 'protected_monument',
    legalNote: 'Ostrów Tumski i Stare Miasto są wpisane do rejestru zabytków.',
    finds: [
      { item: 'Skarb z Głogowa: 20 638 srebrnych monet (brakteaty i denary śląskie, saskie, brandenburskie) i sztabki srebra', discoverer: 'Przypadkowe odkrycie podczas kopania rowu na działce (ul. Różana)', year: '1987', dating: 'Koniec XII – pocz. XIII w.', museum: 'Muzeum Archeologiczno-Historyczne w Głogowie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Obrona_G%C5%82ogowa',
    source: 'Baza TerraHistoria / MAH Głogów'
  },

  // ---------- PÓŹNE ŚREDNIOWIECZE (1200–1500) ----------
  {
    id: 'site-legnica-1241',
    name: 'Bitwa pod Legnicą / Legnickim Polem (1241)',
    category: 'battle',
    lat: 51.1489, lng: 16.2456,
    yearStart: 1241, yearEnd: 1241,
    eraLabel: 'Późne średniowiecze (Najazd Mongołów)',
    region: 'Dolnośląskie',
    combatants: 'Rycerstwo polskie, śląskie, templariusze i joannici (Henryk II Pobożny) vs Armia Mongolska (Bajdara)',
    outcome: 'Klęska rycerstwa chrześcijańskiego, śmierć Henryka Pobożnego, lecz wycofanie Mongołów na Węgry',
    summary: 'Jedna z najsłynniejszych bitew średniowiecznej Europy — starcie ciężkozbrojnego rycerstwa z mobilną armią mongolską 9 kwietnia 1241 r.',
    details: 'Starcie rozegrało się na rozległych polach między Legnickim Polem, Gniewomierzem a Koskowicami. Mongołowie użyli zasłony dymnej i manewru pozorowanej ucieczki. Pole bitwy do dziś kryje cenne dane o dokładnym rozmieszczeniu hufców.',
    terrainHint: 'Otwarta, lekko pofalowana równina (Dobre Pole) między doliną Kaczawy a Wierzbiakiem.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Rejon Legnickiego Pola objęty ochroną konserwatorską; badania prowadzone są przez muzeum i licencjonowane zespoły.',
    finds: [
      { item: 'Średniowieczne groty bełtów i strzał (w tym typu wschodniego), ostrogi, podkowy i monety z XIII w.', discoverer: 'Badania Muzeum Bitwy Legnickiej i stowarzyszeń z pozwoleniem WKZ', year: '1961–2023', dating: 'XIII w.', museum: 'Muzeum Bitwy Legnickiej w Legnickim Polu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Legnic%C4%85',
    source: 'Baza TerraHistoria / Muzeum Miedzi w Legnicy'
  },
  {
    id: 'site-malbork',
    name: 'Zamek w Malborku (Stolica Państwa Krzyżackiego)',
    category: 'castle',
    lat: 54.0397, lng: 19.0281,
    yearStart: 1274, yearEnd: 1772,
    eraLabel: 'Późne średniowiecze – I Rzeczpospolita',
    region: 'Pomorskie',
    summary: 'Największy zamek ceglany na świecie pod względem powierzchni (ok. 21 ha), siedziba Wielkich Mistrzów Zakonu Krzyżackiego (1309–1457) i królów polskich.',
    details: 'Monumentalna twierdza nad Nogatem, oblegana m.in. przez Władysława Jagiełłę w 1410 r., wykupiona w 1457 r. podczas wojny trzynastoletniej. Zamek i jego przedpola (obóz oblężniczy z 1410 r.) stanowią bezcenne źródło historii wojskowości.',
    terrainHint: 'Prawy brzeg Nogatu, rozległe równiny Żuław Wiślanych.',
    legalStatus: 'protected_monument',
    legalNote: 'Obiekt UNESCO i Pomnik Historii — absolutny zakaz poszukiwań na terenie zamku i strefy ochronnej.',
    finds: [
      { item: 'Kule kamienne bombard z oblężenia 1410 r., monety krzyżackie, detale uzbrojenia, zbiory bursztynu', discoverer: 'Prace konserwatorskie i archeologiczne Muzeum Zamkowego', year: 'XIX–XXI w.', dating: 'XIV–XVII w.', museum: 'Muzeum Zamkowe w Malborku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_w_Malborku',
    source: 'Baza TerraHistoria / UNESCO'
  },
  {
    id: 'site-plowce',
    name: 'Bitwa pod Płowcami (1331)',
    category: 'battle',
    lat: 52.6167, lng: 18.6722,
    yearStart: 1331, yearEnd: 1331,
    eraLabel: 'Późne średniowiecze',
    region: 'Kujawsko-Pomorskie',
    combatants: 'Królestwo Polskie (Władysław Łokietek) vs Zakon Krzyżacki (Dietrich von Altenburg)',
    outcome: 'Taktyczny remis / strategiczne powstrzymanie marszu Krzyżaków na Kujawy',
    summary: 'Krwawa bitwa stoczona 27 września 1331 r. między wojskami króla Władysława Łokietka a wycofującą się armią krzyżacką.',
    details: 'Starcie przebiegało w dwóch fazach (poranne rozbicie tylnej straży krzyżackiej we mgle oraz popołudniowa kontrofensywa głównych sił Zakonu). Poległo ok. 4000 wojowników obu stron.',
    terrainHint: 'Otwarta równina kujawska w rejonie wsi Płowce i Radziejów.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Rejon kopca i pola bitwy znajduje się pod nadzorem konserwatorskim — wymagane zezwolenie WKZ.',
    finds: [
      { item: 'Groty bełtów kuszniczych, fragmenty zbroi płytowej, ostrogi i denary z XIV w.', discoverer: 'Badania archeologiczne UMK Toruń i legalne prospekcje', year: '1960–2022', dating: '1331 / XIV w.', museum: 'Muzeum Ziemi Kujawskiej i Dobrzyńskiej' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_P%C5%82owcami',
    source: 'Baza TerraHistoria / Kronika Janka z Czarnkowa'
  },
  {
    id: 'site-sroda-slaska',
    name: 'Skarb Średzki (Środa Śląska)',
    category: 'treasure',
    lat: 51.1636, lng: 16.5950,
    yearStart: 1347, yearEnd: 1348,
    eraLabel: 'Późne średniowiecze',
    region: 'Dolnośląskie',
    summary: 'Jedno z najcenniejszych znalezisk XX wieku w Europie — królewskie insygnia (złota korona z orłami i zapona z kameą) oraz tysiące monet z XIV wieku.',
    details: 'Skarb należał najprawdopodobniej do żydowskiego bankiera Mojżesza, któremu cesarz Karol IV Luksemburski zastawił klejnoty koronne. Ukryty przed pogromem w trakcie epidemii czarnej śmierci ok. 1348 r.',
    terrainHint: 'Historyczne centrum Środy Śląskiej (ul. Daszyńskiego), przy dawnej arterii Via Regia.',
    legalStatus: 'protected_monument',
    legalNote: 'Centrum zabytkowego miasta objęte pełną ochroną konserwatorską.',
    finds: [
      { item: 'Złota korona królewska, złota zapona z kameą z onyksu, pierścienie, 39 złotych florenów i ponad 3900 srebrnych groszy praskich', discoverer: 'Robotnicy podczas prac rozbiórkowych kamienicy (1985 i 1988) oraz służby konserwatorskie', year: '1985 i 1988', dating: 'XIII–XIV w.', museum: 'Muzeum Regionalne w Środzie Śląskiej / Muzeum Narodowe we Wrocławiu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Skarb_%C5%9Bredzki',
    source: 'Baza TerraHistoria / MN Wrocław'
  },
  {
    id: 'site-grunwald',
    name: 'Pole Bitwy pod Grunwaldem (1410)',
    category: 'battle',
    lat: 53.4836, lng: 20.0942,
    yearStart: 1410, yearEnd: 1410,
    eraLabel: 'Późne średniowiecze',
    region: 'Warmińsko-Mazurskie',
    combatants: 'Korona Polska i Wielkie Księstwo Litewskie (Władysław II Jagiełło, Witold) vs Zakon Krzyżacki (Ulrich von Jungingen)',
    outcome: 'Miażdżące zwycięstwo wojsk polsko-litewskich',
    summary: 'Jedna z największych bitew średniowiecznej Europy (15 lipca 1410 r.). Od 2014 r. teren corocznych, legalnych międzynarodowych badań z wykrywaczami metali pod kierownictwem Muzeum.',
    details: 'Dzięki profesjonalnym badaniom detektorystycznym (ponad 10 edycji z udziałem archeologów i pasjonatów z całej Europy) udało się zrewolucjonizować wiedzę o dokładnym przebiegu starcia i miejscu obozu krzyżackiego.',
    terrainHint: 'Pagórkowaty teren pojezierza (Wzgórze Pomnikowe, Wielki Strumień, okolice Stębarka, Łodwigowa i Ulnowa).',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii! Poszukiwania na własną rękę są surowo zabronione — możliwe wyłącznie w ramach oficjalnych badań organizowanych przez Muzeum Bitwy pod Grunwaldem.',
    finds: [
      { item: 'Ponad 1500 zabytków średniowiecznych: dwa świetnie zachowane topory bojowe, groty bełtów i włóczni, fragmenty zbroi, ostrogi, klamry i pieczęć zakonna', discoverer: 'Międzynarodowe ekspedycje detektorystyczne pod kier. dr. Szymona Dreja i dr. Piotra Nowakowskiego', year: '2014–2024', dating: '1410 r. (XV w.)', museum: 'Muzeum Bitwy pod Grunwaldem w Stębarku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Grunwaldem',
    source: 'Baza TerraHistoria / Muzeum Bitwy pod Grunwaldem'
  },
  {
    id: 'site-koronowo',
    name: 'Bitwa pod Koronowem (1410)',
    category: 'battle',
    lat: 53.3019, lng: 17.9022,
    yearStart: 1410, yearEnd: 1410,
    eraLabel: 'Późne średniowiecze',
    region: 'Kujawsko-Pomorskie',
    combatants: 'Rycerstwo polskie (Sędziwój z Ostroroga, Piotr Niedźwiedzki) vs Wojska zaciężne Zakonu (Michał Küchmeister)',
    outcome: 'Zwycięstwo wojsk polskich, słynna z kodeksu rycerskiego (przerwy w walce)',
    summary: 'Rozegrana 10 października 1410 r. pod wsią Łąsko Wielkie k. Koronowa. Wzór średniowiecznego turniejowego etosu rycerskiego.',
    details: 'Po wycofaniu się spod Malborka Krzyżacy próbowali najechać Kujawy. Polskie rycerstwo dopadło ich pod Łąskiem Wielkim i rozbiło siły wójta Nowej Marchii.',
    terrainHint: 'Pofalowane pola i wzgórza na zachód od Brdy w rejonie wsi Wilcze i Łąsko Wielkie.',
    legalStatus: 'permit_required',
    legalNote: 'Wskazana weryfikacja stref ochrony AZP; wszelkie badania terenowe wymagają pozwolenia właściciela i WKZ.',
    finds: [
      { item: 'Pojedyncze groty bełtów, ostrogi i elementy rzędu końskiego z pocz. XV w.', discoverer: 'Zbiory regionalne', year: 'XX w.', dating: 'XV w.', museum: 'Muzeum Okręgowe im. L. Wyczółkowskiego w Bydgoszczy' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Koronowem',
    source: 'Baza TerraHistoria / Jan Długosz'
  },
  {
    id: 'site-swiecino',
    name: 'Bitwa pod Świecinem (1462)',
    category: 'battle',
    lat: 54.7825, lng: 18.2108,
    yearStart: 1462, yearEnd: 1462,
    eraLabel: 'Późne średniowiecze (Wojna trzynastoletnia)',
    region: 'Pomorskie',
    combatants: 'Wojska polskie (Piotr Dunin) vs Wojska krzyżackie (Fritz Raveneck)',
    outcome: 'Przełomowe zwycięstwo Polski w wojnie trzynastoletniej',
    summary: 'Kluczowa bitwa wojny trzynastoletniej (17 września 1462 r.) na północnych Kaszubach, która ostatecznie odebrała inicjatywę Zakonowi Krzyżackiemu.',
    details: 'Piotr Dunin wykorzystał nowoczesną taktykę taboru wozowego (wagenburg) i piechoty wspartej ciężką jazdą. W bitwie zginął dowódca krzyżacki Fritz Raveneck.',
    terrainHint: 'Polana i lasy w rejonie jeziora Żarnowieckiego i wsi Świecino.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Historyczne pole bitwy — poszukiwania wyłącznie za pozwoleniem Nadleśnictwa / właściciela i WKZ.',
    finds: [
      { item: 'Groty bełtów, elementy uprzęży i okucia wozów z XV w.', discoverer: 'Badania regionalne i wykopaliska sondażowe', year: 'XX–XXI w.', dating: 'XV w.', museum: 'Muzeum Ziemi Puckiej' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_%C5%9Awiecinem',
    source: 'Baza TerraHistoria / Muzeum Ziemi Puckiej'
  },
  {
    id: 'site-checiny',
    name: 'Zamek Królewski w Chęcinach',
    category: 'castle',
    lat: 50.7972, lng: 20.4608,
    yearStart: 1295, yearEnd: 1707,
    eraLabel: 'Późne średniowiecze – I Rzeczpospolita',
    region: 'Świętokrzyskie',
    summary: 'Potężna warownia królewska Władysława Łokietka i Kazimierza Wielkiego, miejsce zjazdów rycerskich (m.in. przed wyprawą pod Płowce) i skarbiec koronny.',
    details: 'Górujący nad okolicą zamek strzegł szlaków handlowych oraz bogatych złóż rud ołowiu i srebra w Górach Świętokrzyskich. Zniszczony podczas rokoszu Zebrzydowskiego i potopu szwedzkiego.',
    terrainHint: 'Skaliste wzgórze zamkowe (367 m n.p.m.), w okolicy widoczne na LIDAR ślady dawnego górnictwa kruszcowego (szyby ołowiu i miedzi).',
    legalStatus: 'protected_monument',
    legalNote: 'Zamek i góra zamkowa są zabytkiem wpisanym do rejestru — zakaz poszukiwań.',
    finds: [
      { item: 'Średniowieczne monety, kafle piecowe, elementy uzbrojenia i relikty warsztatów hutniczych', discoverer: 'Prace archeologiczne przy rewitalizacji zamku', year: '1950–2015', dating: 'XIV–XVII w.', museum: 'Zamek Królewski w Chęcinach / MN Kielce' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_Kr%C3%B3lewski_w_Ch%C4%99cinach',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-ogrodzieniec',
    name: 'Zamek Ogrodzieniec (Szlak Orlich Gniazd)',
    category: 'castle',
    lat: 50.4533, lng: 19.5525,
    yearStart: 1350, yearEnd: 1810,
    eraLabel: 'Późne średniowiecze – Nowożytność',
    region: 'Śląskie (Jura)',
    summary: 'Najpotężniejsza warownia Jury Krakowsko-Częstochowskiej, rozbudowana w XVI w. przez ród Bonerów na „mały Wawel”.',
    details: 'Strzegł granicy ze Śląskiem i szlaków prowadzących do Krakowa. Dwukrotnie spalony przez Szwedów (1655 i 1702). Okoliczne ostańce kryją również ślady osadnictwa średniowiecznego i walk z 1914 r.',
    terrainHint: 'Najwyższe wzniesienie Jury — Góra Janowskiego (516 m n.p.m.), liczne wąwozy i ostańce wapienne.',
    legalStatus: 'protected_monument',
    legalNote: 'Zamek w rejestrze zabytków — całkowity zakaz poszukiwań na terenie ruin i wzgórza.',
    finds: [
      { item: 'Kule muszkietowe i armatnie z potopu szwedzkiego, detale renesansowe, monety XVI–XVII w.', discoverer: 'Badania archeologiczno-architektoniczne', year: '1949–1975', dating: 'XIV–XVIII w.', museum: 'Muzeum w Zawierciu / Zamek Ogrodzieniec' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_Ogrodzieniec',
    source: 'Baza TerraHistoria / Szlak Orlich Gniazd'
  },
  {
    id: 'site-czocha',
    name: 'Zamek Czocha (Granica Śląska i Łużyc)',
    category: 'castle',
    lat: 51.0306, lng: 15.3036,
    yearStart: 1241, yearEnd: 1945,
    eraLabel: 'Średniowiecze – II Wojna Światowa',
    region: 'Dolnośląskie',
    summary: 'Malowniczy zamek graniczny wzniesiony przez króla czeskiego Wacława I, pełen tajnych przejść i zagadek z okresu II wojny światowej.',
    details: 'Położony na granitowym urwisku nad Kwisą. W 1945 r. obiekt stanowił ważny punkt ewakuacji niemieckich archiwów i dzieł sztuki na Dolnym Śląsku.',
    terrainHint: 'Granitowy cypel nad Jeziorem Leśniańskim (dolina Kwisy), gęste lasy Przedgórza Izerskiego.',
    legalStatus: 'protected_monument',
    legalNote: 'Zamek jest zabytkiem chronionym — zakaz jakichkolwiek prac bez zezwolenia WKZ.',
    finds: [
      { item: 'Zaginiony zbiór porcelany i kosztowności rodziny von Gütschow (częściowo odnaleziony w skrytkach zamkowych po 1945 r.)', discoverer: 'Badacze i historycy regionalni', year: '1945–2016', dating: 'XVII–XX w.', museum: 'Zbiory Zamku Czocha' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_Czocha',
    source: 'Baza TerraHistoria / Dolny Śląsk'
  },
  {
    id: 'site-wawel',
    name: 'Wzgórze Wawelskie — Siedziba Królów Polski',
    category: 'castle',
    lat: 50.0540, lng: 19.9354,
    yearStart: 970, yearEnd: 1795,
    eraLabel: 'Wczesne średniowiecze – I Rzeczpospolita',
    region: 'Małopolskie',
    summary: 'Historyczne serce Polski — zamek królewski, katedra koronacyjna i nekropolia władców nad zakolem Wisły.',
    details: 'Ślady osadnictwa na Wawelu sięgają paleolitu (ok. 100 tys. lat temu!). Od XI do końca XVI w. główne centrum polityczne Królestwa Polskiego.',
    terrainHint: 'Wapienny ostaniec (228 m n.p.m.) w zakolu Wisły.',
    legalStatus: 'protected_monument',
    legalNote: 'Obiekt UNESCO i Pomnik Historii — strefa całkowitej ochrony.',
    finds: [
      { item: 'Relikty przedromańskiej Rotundy NMP, skarb wiślanych grzywien siekieropodobnych (4212 sztuk, ok. 3,6 tony żelaza! — ul. Kanonicza)', discoverer: 'Badania archeologiczne ul. Kanoniczej (E. Zaitz)', year: '1979', dating: 'IX–X w.', museum: 'Muzeum Archeologiczne w Krakowie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Wawel',
    source: 'Baza TerraHistoria / Zamek Królewski na Wawelu'
  },

  // ---------- RZECZPOSPOLITA (1500–1795) ----------
  {
    id: 'site-byczyna',
    name: 'Bitwa pod Byczyną (1588)',
    category: 'battle',
    lat: 51.1167, lng: 18.2117,
    yearStart: 1588, yearEnd: 1588,
    eraLabel: 'Rzeczpospolita (XVI wiek)',
    region: 'Opolskie',
    combatants: 'Rzeczpospolita (Jan Zamoyski) vs Arcyksiążę Maksymilian III Habsburg',
    outcome: 'Zwycięstwo Zamoyskiego i pojmanie Maksymiliana Habsburga',
    summary: 'Decydująca bitwa wojny o tron polski (24 stycznia 1588 r.), która ugruntowała panowanie Zygmunta III Wazy.',
    details: 'Habsburg zajął pozycje za groblą i bagnami na wschód od murów Byczyny. Zamoyski dokonał brawurowego obejścia skrzydła we mgle i rozbił armię pretendenta husarią i piechotą węgierską.',
    terrainHint: 'Równinne pola i dawne stawy/groble na wschód od średniowiecznych murów obronnych Byczyny.',
    legalStatus: 'permit_required',
    legalNote: 'Okolice historycznego pola bitwy — poszukiwania wyłącznie ze zgodą właściciela i pozwoleniem WKZ.',
    finds: [
      { item: 'Kule ołowiane z arkebuzów i muszkietów, podkowy kawaleryjskie i drobne monety z końca XVI w.', discoverer: 'Zbiory regionalne w Byczynie', year: 'XX–XXI w.', dating: 'XVI w.', museum: 'Izba Pamięci w Byczynie / Muzeum Śląska Opolskiego' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Byczyn%C4%85',
    source: 'Baza TerraHistoria / Archiwum Wojskowości'
  },
  {
    id: 'site-trzciana',
    name: 'Bitwa pod Trzcianą (1629)',
    category: 'battle',
    lat: 53.8542, lng: 19.0489,
    yearStart: 1629, yearEnd: 1629,
    eraLabel: 'Rzeczpospolita (Wojny ze Szwecją)',
    region: 'Pomorskie (Powiśle)',
    combatants: 'Rzeczpospolita i posiłki cesarskie (Stanisław Koniecpolski) vs Szwecja (Gustaw II Adolf)',
    outcome: 'Błyskotliwe zwycięstwo husarii; król Szwecji ledwo uniknął niewoli',
    summary: 'Jedno z najwspanialszych zwycięstw polskiej jazdy (27 czerwca 1629 r.) — król Gustaw II Adolf dwukrotnie otarł się o śmierć i stracił kapelusz oraz szablę.',
    details: 'Starcie rozciągało się na przestrzeni kilkunastu kilometrów od Honigfelde (Trzciana) przez Straszewo po Pułkowice, w serii szarż polskiej husarii i rajtarii na wycofującą się armię szwedzką.',
    terrainHint: 'Pofalowany krajobraz Powiśla z wąwozami i oczkami wodnymi na południe od Sztumu.',
    legalStatus: 'permit_required',
    legalNote: 'Tereny rolne i leśne — wymagana pisemna zgoda właściciela i pozwolenie pomorskiego WKZ.',
    finds: [
      { item: 'Kule pistoletowe i muszkietowe, szelągi ryskie i polskie, okucia rzędu końskiego z XVII w.', discoverer: 'Badania terenowe stowarzyszeń za zgodą WKZ', year: '2016–2023', dating: '1629 r.', museum: 'Muzeum Zamkowe w Malborku (oddział w Sztumie)' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Trzcian%C4%85',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-bydgoszcz-hoard',
    name: 'Skarb z Katedry w Bydgoszczy (2018)',
    category: 'treasure',
    lat: 53.1225, lng: 17.9994,
    yearStart: 1570, yearEnd: 1656,
    eraLabel: 'Rzeczpospolita (XVI–XVII wiek)',
    region: 'Kujawsko-Pomorskie',
    summary: 'Spektakularny skarb złotych monet i biżuterii ukryty pod posadzką katedry prawdopodobnie w obliczu najazdu szwedzkiego (1655–1656).',
    details: 'Odkryty 2 stycznia 2018 r. podczas prac remontowo-archeologicznych w prezbiterium katedry św. Marcina i Mikołaja. Zawierał dukaty z całej Europy (Niderlandy, Polska, Turcja, Austria) i precjoza.',
    terrainHint: 'Zabytkowa Wyspa Młyńska i Stare Miasto nad Brdą.',
    legalStatus: 'protected_monument',
    legalNote: 'Ścisła strefa ochrony konserwatorskiej Starego Miasta.',
    finds: [
      { item: '486 złotych monet (dukaty, m.in. Zygmunta III Wazy, tureckie sułtani, dukaty holenderskie), złote pierścienie, dewocjonalia i perły (ok. 2 kg złota)', discoverer: 'Zespół archeologów pod kier. Roberta Grochowskiego', year: 'Styczeń 2018', dating: 'XVI–XVII w.', museum: 'Muzeum Okręgowe im. L. Wyczółkowskiego w Bydgoszczy (Europejskie Centrum Pieniądza)' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Skarb_bydgoski',
    source: 'Baza TerraHistoria / MOB Bydgoszcz'
  },
  {
    id: 'site-krzyztopor',
    name: 'Zamek Krzyżtopór w Ujeździe',
    category: 'castle',
    lat: 50.7144, lng: 21.3094,
    yearStart: 1627, yearEnd: 1770,
    eraLabel: 'Rzeczpospolita (Barok)',
    region: 'Świętokrzyskie',
    summary: 'Przed wybudowaniem Wersalu największa rezydencja pałacowo-forteczna w Europie (palazzo in fortezza), zbudowana przez Krzysztofa Ossolińskiego.',
    details: 'Zaprojektowany w symbolice kalendarza (4 baszty, 12 sal, 52 pokoje, 365 okien). Złupiony w czasie potopu szwedzkiego (1655) i spalony przez wojska rosyjskie podczas konfederacji barskiej (1770).',
    terrainHint: 'Niewielkie wzniesienie w dolinie potoku w powiecie opatowskim, wyraźny pięciobok bastionów na LIDAR.',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii — ścisła ochrona zamku i fortyfikacji ziemnych.',
    finds: [
      { item: 'Elementy bogatej kamieniarki, monety z XVII w. (boratynki, tymfy), kule armatnie z okresu konfederacji barskiej', discoverer: 'Prace badawcze i konserwatorskie', year: '1970–2020', dating: 'XVII–XVIII w.', museum: 'Zamek Krzyżtopór' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_Krzy%C5%BCtop%C3%B3r',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-warka-1656',
    name: 'Bitwa pod Warką (1656 — Potop Szwedzki)',
    category: 'battle',
    lat: 51.7861, lng: 21.1922,
    yearStart: 1656, yearEnd: 1656,
    eraLabel: 'Rzeczpospolita (Potop Szwedzki)',
    region: 'Mazowieckie',
    combatants: 'Rzeczpospolita (Stefan Czarniecki, Jerzy Sebastian Lubomirski) vs Szwecja (Fryderyk Baden-Durlach)',
    outcome: 'Pierwsze wielkie zwycięstwo Polaków w otwartym polu podczas Potopu',
    summary: 'Zwycięska bitwa 7 kwietnia 1656 r. nad Pilicą, w której kawaleria Czarnieckiego po brawurowym sforsowaniu rzeki rozbiła doborowy korpus szwedzki.',
    details: 'Starcie rozegrało się na północny zachód od Warki (rejon Winiar i Piaseczna) przy przeprawie przez Pilicę. Zwycięstwo podniosło morale całej Rzeczypospolitej.',
    terrainHint: 'Skarpa doliny Pilicy, piaszczyste łąki i dawne brody rzeczne.',
    legalStatus: 'permit_required',
    legalNote: 'Tereny prywatne i nadpilickie — wymagana zgoda właściciela i pozwolenie mazowieckiego WKZ.',
    finds: [
      { item: 'Kule muszkietowe, guziki cynowe, podkowy i szelągi szwedzkie oraz polskie z połowy XVII w.', discoverer: 'Lokalne badania i zbiory muzealne', year: 'XX–XXI w.', dating: '1656 r.', museum: 'Muzeum im. Kazimierza Pułaskiego w Warce' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Wark%C4%85',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-kliszow-1702',
    name: 'Bitwa pod Kliszowem (1702 — Wielka Wojna Północna)',
    category: 'battle',
    lat: 50.6186, lng: 20.5256,
    yearStart: 1702, yearEnd: 1702,
    eraLabel: 'Rzeczpospolita (XVIII wiek)',
    region: 'Świętokrzyskie',
    combatants: 'Polska i Saksonia (August II Mocny, Hieronim Lubomirski) vs Szwecja (Karol XII)',
    outcome: 'Zwycięstwo Szwedów; ostatnia wielka szarża polskiej husarii',
    summary: 'Jedna z największych bitew XVIII w. na ziemiach polskich (19 lipca 1702 r.), w której starło się niemal 40 000 żołnierzy — historyczna ostatnia wielka szarża husarii.',
    details: 'Rozległe pole bitwy między Kliszowem, Kokotem a Kije, pełne bagiennych dolinek i piaszczystych wydm. Ze względu na ogromną liczbę wojsk i intensywny ogień artyleryjski oraz muszkietowy, teren ten ma gigantyczną wartość badawczą.',
    terrainHint: 'Bagienna dolina Nidy i jej dopływów, piaszczyste wzgórza między Kliszowem a Borczynem.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Historyczne pole bitwy badane przez archeologów i licencjonowane grupy — wymagane pozwolenie WKZ.',
    finds: [
      { item: 'Tysiące kul muszkietowych i kartaczy, fragmenty szpad, elementy mundurów saskich i szwedzkich, monety z pocz. XVIII w.', discoverer: 'Badania archeologiczne pola bitwy pod kier. archeologów z Kielc i pasjonatów', year: '2015–2023', dating: '1702 r.', museum: 'Muzeum Narodowe w Kielcach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Kliszowem',
    source: 'Baza TerraHistoria / MN Kielce'
  },
  {
    id: 'site-raclawice-1794',
    name: 'Bitwa pod Racławicami (1794 — Insurekcja Kościuszkowska)',
    category: 'battle',
    lat: 50.3311, lng: 20.2367,
    yearStart: 1794, yearEnd: 1794,
    eraLabel: 'Rzeczpospolita (Insurekcja Kościuszkowska)',
    region: 'Małopolskie',
    combatants: 'Wojska polskie i kosynierzy (Tadeusz Kościuszko) vs Imperium Rosyjskie (gen. Aleksander Tormasow)',
    outcome: 'Zwycięstwo powstańców i zdobycie rosyjskich armat przez kosynierów',
    summary: 'Symboliczna bitwa z 4 kwietnia 1794 r. na wzgórzach pod Janowiczkami i Racławicami, słynna z ataku chłopskich kosynierów z Bartoszem Głowackim.',
    details: 'Wojska Kościuszki wykorzystały strome lessowe wąwozy i dominujące wzgórze Zamczysko, aby rozbić kolumny rosyjskie zanim te zdążyły się połączyć.',
    terrainHint: 'Wyżyna Miechowska — głębokie wąwozy lessowe, wzgórza Janowiczki i Kościejów (świetnie widoczne na LIDAR).',
    legalStatus: 'protected_monument',
    legalNote: 'Obszar pola bitwy (m.in. Wzgórze Zamczysko / Kopiec) podlega ochronie jako Pomnik Historii.',
    finds: [
      { item: 'Kule armatnie i karabinowe, guziki mundurowe, okucia ładownic, monety stanisławowskie i rosyjskie', discoverer: 'Badania archeologiczne i zbiory regionalne', year: 'XIX–XXI w.', dating: '1794 r.', museum: 'Muzeum Ziemi Miechowskiej / Muzeum Historyczne Krakowa' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Rac%C5%82awicami',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-maciejowice-1794',
    name: 'Bitwa pod Maciejowicami (1794)',
    category: 'battle',
    lat: 51.7031, lng: 21.5250,
    yearStart: 1794, yearEnd: 1794,
    eraLabel: 'Rzeczpospolita (Insurekcja Kościuszkowska)',
    region: 'Mazowieckie',
    combatants: 'Polska (Tadeusz Kościuszko) vs Imperium Rosyjskie (gen. Iwan Fersen)',
    outcome: 'Klęska powstańców i dostanie się rannego Kościuszki do niewoli',
    summary: 'Decydująca, tragiczna bitwa Insurekcji Kościuszkowskiej (10 października 1794 r.), stoczona w rejonie dworu w Podzamczu i Oronnego.',
    details: 'Polacy bronili wzgórza zamkowego w Podzamczu otoczonym przez bagnistą dolinę Okrzejki. Po przełamaniu lewego skrzydła doszło do zaciętych walk w parku dworskim i na polach Krępy.',
    terrainHint: 'Skraj doliny Wisły i Okrzejki, pagórki wokół Podzamcza i Oronnego.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Rejon Podzamcza i pola bitwy chroniony konserwatorsko; badania wymagają zgody WKZ.',
    finds: [
      { item: 'Kule armatnie 6- i 12-funtowe, kartacze, guziki pułków koronnych, elementy oporządzenia z 1794 r.', discoverer: 'Badania Muzeum im. T. Kościuszki w Maciejowicach', year: '1980–2021', dating: '1794 r.', museum: 'Muzeum im. Tadeusza Kościuszki w Maciejowicach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Maciejowicami',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-olkusz',
    name: 'Olkusz — „Srebrne Miasto” i Dawne Kopalnie',
    category: 'settlement',
    lat: 50.2811, lng: 19.5653,
    yearStart: 1250, yearEnd: 1795,
    eraLabel: 'Średniowiecze – I Rzeczpospolita',
    region: 'Małopolskie',
    summary: 'Historyczne centrum górnictwa srebra i ołowiu w Polsce oraz siedziba słynnej mennicy królewskiej (XVI–XVII w.).',
    details: 'Z olkuskiego srebra bito monety królewskie dla całej Rzeczypospolitej. Wokół miasta (Pustynia Błędowska, lasy olkuskie, Bolesław) znajdują się tysiące dawnych szybów górniczych (warpie) i sztolni odwadniających.',
    terrainHint: 'Obszar krasowy z tysiącami charakterystycznych lejów pogórniczych (warpie) — niesamowicie wyraźne na mapie LIDAR!',
    legalStatus: 'permit_required',
    legalNote: 'Stare Miasto w rejestrze zabytków; tereny leśne wymagają zgody Nadleśnictwa i WKZ (uwaga na zapadliska pogórnicze!).',
    finds: [
      { item: 'Skarb z Olkusza (ponad 1200 srebrnych monet z XVII w.), narzędzia górnicze, tygle probiercze i plomby ołowiane', discoverer: 'Badania archeologiczne i prace ziemne (m.in. 1970)', year: '1970–2020', dating: 'XIV–XVII w.', museum: 'Podziemny Olkusz / Muzeum Regionalne PTTK' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Olkusz',
    source: 'Baza TerraHistoria / Podziemny Olkusz'
  },
  {
    id: 'site-tarnowskie-gory',
    name: 'Tarnowskie Góry — Zabytkowe Kopalnie Srebra',
    category: 'settlement',
    lat: 50.4256, lng: 18.8492,
    yearStart: 1526, yearEnd: 1913,
    eraLabel: 'Renesans – XIX wiek',
    region: 'Śląskie',
    summary: 'Historyczny okręg górniczy rud ołowiu, srebra i cynku (Lista UNESCO) z setkami kilometrów podziemnych wyrobisk i sztolni.',
    details: 'Rozwój miasta rozpoczął się po odkryciu bryły kruszcu przez chłopa Rybkę ok. 1490 r. i nadaniu przywileju wolności górniczej w 1526 r.',
    terrainHint: 'Płaskowyż Tarnowicki z licznymi historycznymi hałdami i zapadliskami po dawnych szybach.',
    legalStatus: 'protected_monument',
    legalNote: 'Strefa UNESCO i tereny zabytkowe — zakaz poszukiwań na obiektach chronionych.',
    finds: [
      { item: 'Dawne narzędzia górnicze, lampy olejowe, monety śląskie i pruskie oraz relikty pierwszej maszyny parowej na Górnym Śląsku', discoverer: 'Stowarzyszenie Miłośników Ziemi Tarnogórskiej', year: '1957–2020', dating: 'XVI–XIX w.', museum: 'Zabytkowa Kopalnia Srebra w Tarnowskich Górach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zabytkowa_Kopalnia_Srebra',
    source: 'Baza TerraHistoria / UNESCO'
  },

  // ---------- ZABORY I XIX WIEK (1795–1914) ----------
  {
    id: 'site-pultusk-1806',
    name: 'Bitwa pod Pułtuskiem (1806 — Kampania Napoleońska)',
    category: 'battle',
    lat: 52.7117, lng: 21.0647,
    yearStart: 1806, yearEnd: 1806,
    eraLabel: 'Epoka Napoleońska',
    region: 'Mazowieckie',
    combatants: 'Cesarstwo Francuskie (marsz. Jean Lannes) vs Imperium Rosyjskie (gen. Levin Bennigsen)',
    outcome: 'Taktyczny remis, odwrót Rosjan; nazwa Pułtusk wyryta na Łuku Triumfalnym w Paryżu',
    summary: 'Zacięta zimowa bitwa Wielkiej Armii Napoleona (26 grudnia 1806 r.) w błocie i zamieci śnieżnej na przedpolach Pułtuska.',
    details: 'W bitwie wzięło udział ponad 65 000 żołnierzy. Teren walk (rejon wsi Moszyn, Kleszewo, Lipniki, lasy nad Narwią) zapisał się w historii kampanii polskiej Napoleona (1806–1807).',
    terrainHint: 'Równina przedpola miasta, wzgórza nad Narwią, dawne drogi na Nasielsk i Maków.',
    legalStatus: 'permit_required',
    legalNote: 'Obszary rolne i leśne wymagają pisemnej zgody właściciela oraz pozwolenia mazowieckiego WKZ.',
    finds: [
      { item: 'Guziki pułków piechoty i kawalerii francuskiej (Wielka Armia), kule armatnie, elementy czak i rosyjskie orły', discoverer: 'Badania regionalne i zbiory muzealne', year: '1990–2023', dating: '1806 r.', museum: 'Muzeum Regionalne w Pułtusku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Pu%C5%82tuskiem_(1806)',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-lidzbark-1807',
    name: 'Bitwa pod Lidzbarkiem Warmińskim / Heilsberg (1807)',
    category: 'battle',
    lat: 54.1394, lng: 20.5764,
    yearStart: 1807, yearEnd: 1807,
    eraLabel: 'Epoka Napoleońska',
    region: 'Warmińsko-Mazurskie',
    combatants: 'Cesarstwo Francuskie (Napoleon Bonaparte, Murat, Soult) vs Imperium Rosyjskie i Prusy (Bennigsen)',
    outcome: 'Krwawa bitwa pozycyjna, wycofanie się Rosjan na Frydland',
    summary: 'Najkrwawsza bitwa wojen napoleońskich stoczona na obecnych ziemiach polskich (10 czerwca 1807 r.) — ponad 140 000 żołnierzy i 20 000 zabitych oraz rannych.',
    details: 'Rosjanie wybudowali wokół Lidzbarka system potężnych redut ziemnych (Reduta nr 1, 2, 3), które kilkakrotnie przechodziły z rąk do rąk w krwawych szturmach francuskiej piechoty i kirasjerów.',
    terrainHint: 'Doliny Łyny i Symsarny oraz zalesione wzgórza na północ i zachód od miasta — zarysy dawnych redut z 1807 r. wciąż czytelne na LIDAR!',
    legalStatus: 'archaeological_zone',
    legalNote: 'Pozostałości redut napoleońskich są cennym zabytkiem archeologii pól bitewnych — wymagane pozwolenie WKZ.',
    finds: [
      { item: 'Setki kul armatnich i muszkietowych, guziki pułkowe francuskie i rosyjskie, fragmenty kirysów i szabli', discoverer: 'Ekspedycje badawcze i lokalni historycy (z pozwoleniem WKZ)', year: '2005–2024', dating: '1807 r.', museum: 'Muzeum Warmińskie w Lidzbarku Warmińskim' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Lidzbarkiem_Warmi%C5%84skim',
    source: 'Baza TerraHistoria / Muzeum Warmińskie'
  },
  {
    id: 'site-raszyn-1809',
    name: 'Bitwa pod Raszynem (1809)',
    category: 'battle',
    lat: 52.1489, lng: 20.9164,
    yearStart: 1809, yearEnd: 1809,
    eraLabel: 'Epoka Napoleońska (Księstwo Warszawskie)',
    region: 'Mazowieckie',
    combatants: 'Księstwo Warszawskie i Saksonia (ks. Józef Poniatowski) vs Cesarstwo Austriackie (arcyks. Ferdynand d’Este)',
    outcome: 'Heroiczne powstrzymanie dwukrotnie silniejszej armii austriackiej',
    summary: 'Słynna bitwa 19 kwietnia 1809 r. o groblę falencką i przeprawę przez rzekę Raszynkę na przedpolach Warszawy.',
    details: 'Książę Józef Poniatowski z fajką w zębach osobiście poprowadził kontratak 1. batalionu 1. Pułku Piechoty na bagnety, odzyskując groblę i Raszyn.',
    terrainHint: 'Stawy Raszyńskie, grobla falencka i dawne mokradła doliny Raszynki.',
    legalStatus: 'protected_monument',
    legalNote: 'Rezerwat przyrody Stawy Raszyńskie i obszar zabytkowy — bezwzględny zakaz poszukiwań w rezerwacie.',
    finds: [
      { item: 'Kule karabinowe, guziki wojsk Księstwa Warszawskiego i armii austriackiej, elementy okuć broni', discoverer: 'Zbiory muzealne Warszawy i Raszyna', year: 'XIX–XX w.', dating: '1809 r.', museum: 'Muzeum Wojska Polskiego w Warszawie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Raszynem_(1809)',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-ostroleka-1831',
    name: 'Bitwa pod Ostrołęką (1831 — Powstanie Listopadowe)',
    category: 'battle',
    lat: 53.0894, lng: 21.5642,
    yearStart: 1831, yearEnd: 1831,
    eraLabel: 'Zabory (Powstanie Listopadowe)',
    region: 'Mazowieckie',
    combatants: 'Królestwo Polskie (gen. Jan Skrzynecki, gen. Józef Bem) vs Imperium Rosyjskie (feldmarsz. Iwan Dybicz)',
    outcome: 'Krwawa porażka strategiczna Polski; uratowanie armii dzięki szarży baterii konnej gen. Bema',
    summary: 'Jedna z najkrwawszych bitew Powstania Listopadowego (26 maja 1831 r.) o mosty na Narwi, unieśmiertelniona szarżą artylerii konnej Józefa Bema.',
    details: 'Walki toczyły się o przyczółek na lewym brzegu Narwi i piaszczyste wydmy na prawym brzegu (obecnie rejon Fortów Bema).',
    terrainHint: 'Piaszczysta dolina Narwi, wały i dawne szańce przyczółkowe.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Fortyfikacje i pole bitwy — poszukiwania wyłącznie ze zgodą WKZ.',
    finds: [
      { item: 'Kule armatnie, granaty artyleryjskie, guziki pułków liniowych Królestwa Polskiego i carskiej gwardii', discoverer: 'Badania Muzeum Kultury Kurpiowskiej i zespołów historycznych', year: '1990–2023', dating: '1831 r.', museum: 'Muzeum Żołnierzy Wyklętych / Muzeum Kultury Kurpiowskiej w Ostrołęce' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Ostro%C5%82%C4%99k%C4%85_(1831)',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-malogoszcz-1863',
    name: 'Bitwa pod Małogoszczem (1863 — Powstanie Styczniowe)',
    category: 'battle',
    lat: 50.8161, lng: 20.2686,
    yearStart: 1863, yearEnd: 1863,
    eraLabel: 'Zabory (Powstanie Styczniowe)',
    region: 'Świętokrzyskie',
    combatants: 'Oddziały powstańcze (gen. Marian Langiewicz, Antoni Jeziorański) vs Armia Rosyjska (gen. Ksawery Czengiery)',
    outcome: 'Zorganizowany odwrót powstańców z okrążenia po 5-godzinnej bitwie',
    summary: 'Jedna z największych bitew Powstania Styczniowego (24 lutego 1863 r.), w której wzięło udział ok. 2600 powstańców.',
    details: 'Powstańcy obsadzili wzgórza wokół Małogoszcza (m.in. Górę Sabianów i cmentarz), powstrzymując koncentryczny atak trzech kolumn rosyjskich i wyprowadzając tabor w stronę Bolmina.',
    terrainHint: 'Wapienne wzgórza Pasma Przedborsko-Małogoskiego (wyraźne skarpy i stare drogi polne na LIDAR).',
    legalStatus: 'permit_required',
    legalNote: 'Tereny prywatne i leśne — wymagana zgoda właściciela i świętokrzyskiego WKZ.',
    finds: [
      { item: 'Pociski typu Minié z belgijskich sztucerów i rosyjskich karabinów, guziki, klamry powstańcze', discoverer: 'Legalne badania rocznicowe i zbiory regionalne', year: '2013–2023', dating: '1863 r.', museum: 'Muzeum Narodowe w Kielcach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Ma%C5%82ogoszczem',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-modlin',
    name: 'Twierdza Modlin (Napoleon – II WŚ)',
    category: 'fortification',
    lat: 52.4383, lng: 20.6819,
    yearStart: 1807, yearEnd: 1939,
    eraLabel: 'XIX wiek – II Wojna Światowa',
    region: 'Mazowieckie',
    summary: 'Jedna z największych i najlepiej zachowanych twierdz w Europie, założona na rozkaz Napoleona w widłach Wisły i Narwi, później rozbudowana przez Rosjan (Nowogieorgijewsk).',
    details: 'Słynie z najdłuższego budynku koszarowego w Europie (2250 m!). Oblegana w 1813, 1831, 1915 (I WŚ) oraz bohatersko broniona przez Wojsko Polskie we wrześniu 1939 r.',
    terrainHint: 'Strategiczny zbieg Wisły, Narwi i Wkry — pierścień kilkunastu fortów zewnętrznych w promieniu 8–10 km.',
    legalStatus: 'protected_monument',
    legalNote: 'Zespół twierdzy wpisany do rejestru zabytków (część terenów czynna wojskowo) — zakaz nielegalnych poszukiwań.',
    finds: [
      { item: 'Bogate zbiory amunicji, oporządzenia z 1915 i 1939 r., dokumenty i elementy wyposażenia garnizonu', discoverer: 'Badania Muzeum Kampanii Wrześniowej i Twierdzy Modlin', year: '1990–2024', dating: '1807–1939', museum: 'Muzeum Kampanii Wrześniowej i Twierdzy Modlin' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Twierdza_Modlin',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-srebrna-gora',
    name: 'Twierdza Srebrna Góra (Największa Twierdza Górska Europy)',
    category: 'fortification',
    lat: 50.5750, lng: 16.6431,
    yearStart: 1765, yearEnd: 1867,
    eraLabel: 'XVIII–XIX wiek',
    region: 'Dolnośląskie',
    summary: 'Monumentalna pruska twierdza górska (Donjon i system fortów) wzniesiona przez Fryderyka II Wielkiego w Górach Sowich, niezdobyta nawet przez wojska Napoleona w 1807 r.',
    details: 'Broniła przełęczy srebrnogórskiej łączącej Śląsk z Kotliną Kłodzką. Podczas II WŚ mieścił się tu obóz jeniecki Oflag VIII B dla polskich oficerów.',
    terrainHint: 'Górskie grzbiety Warownej Góry (686 m n.p.m.) i Ostroga — spektakularne narysy bastionów na LIDAR.',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii — całkowity zakaz poszukiwań na terenie twierdzy i fortów.',
    finds: [
      { item: 'Kule armatnie z oblężenia 1807 r., monety fryderycjańskie, przedmioty polskich jeńców z Oflagu VIII B', discoverer: 'Badania archeologiczne podczas renowacji twierdzy', year: '2004–2023', dating: 'XVIII–XX w.', museum: 'Twierdza Srebrna Góra' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Twierdza_Srebrna_G%C3%B3ra',
    source: 'Baza TerraHistoria / NID'
  },
  {
    id: 'site-przemysl-fort',
    name: 'Twierdza Przemyśl (Oblężenia 1914–1915)',
    category: 'fortification',
    lat: 49.7839, lng: 22.7678,
    yearStart: 1854, yearEnd: 1915,
    eraLabel: 'XIX wiek – I Wojna Światowa',
    region: 'Podkarpackie',
    summary: 'Trzecia co do wielkości twierdza Europy przełomu XIX i XX w. (obwód 45 km, ponad 40 fortów), arena słynnych oblężeń I wojny światowej.',
    details: 'Austro-węgierska „Brama Węgier” broniąca przełęczy karpackich. Broniona przez ponad 120 000 żołnierzy (w tym wielu Polaków) podczas dwukrotnego rosyjskiego oblężenia w latach 1914–1915.',
    terrainHint: 'Pierścień wzgórz Pogórza Przemyskiego wokół doliny Sanu — na LIDAR widoczne kilometry okopów, stanowisk artyleryjskich i fos fortów.',
    legalStatus: 'protected_monument',
    legalNote: 'Zespół fortyfikacji wpisany do rejestru zabytków (uwaga na niewybuchy z I WŚ!).',
    finds: [
      { item: 'Klamry austro-węgierskie i rosyjskie, odznaki pułkowe, nieśmiertelniki, elementy wyposażenia z oblężenia 1915 r.', discoverer: 'Muzeum Twierdzy Przemyśl i legalne ekspedycje', year: '1980–2024', dating: '1914–1915', museum: 'Muzeum Twierdzy Przemyśl' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Twierdza_Przemy%C5%9Bl',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-osowiec',
    name: 'Twierdza Osowiec (I Wojna Światowa)',
    category: 'fortification',
    lat: 53.4711, lng: 22.6486,
    yearStart: 1882, yearEnd: 1915,
    eraLabel: 'XIX wiek – I Wojna Światowa',
    region: 'Podlaskie',
    summary: 'Potężna carska twierdza na bagnach biebrzańskich, wsławiona legendarnym „atakiem umarłych” po niemieckim ataku gazowym (6 sierpnia 1915 r.).',
    details: 'Jedyna przejezdna przeprawa przez bagna Biebrzy. Mimo wielomiesięcznego ostrzału niemieckimi moździerzami 420 mm „Gruba Berta” twierdza nie została zdobyta szturmem.',
    terrainHint: 'Rozległe torfowiska i wydmy Kotliny Biebrzańskiej (Biebrzański Park Narodowy).',
    legalStatus: 'protected_monument',
    legalNote: 'Teren Biebrzańskiego Parku Narodowego, jednostki wojskowej i zabytku — całkowity zakaz poszukiwań.',
    finds: [
      { item: 'Odłamki pocisków 420 mm, carskie i pruskie wyposażenie wojskowe, maski i pamiątki z 1915 r.', discoverer: 'Osowieckie Towarzystwo Fortyfikacyjne', year: '1990–2023', dating: '1914–1915', museum: 'Muzeum Twierdzy Osowiec' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Twierdza_Osowiec',
    source: 'Baza TerraHistoria'
  },

  // ---------- I i II WOJNA ŚWIATOWA (1914–1945) ----------
  {
    id: 'site-tannenberg-1914',
    name: 'Bitwa pod Tannenbergiem (1914 — I WŚ)',
    category: 'battle',
    lat: 53.4950, lng: 20.1750,
    yearStart: 1914, yearEnd: 1914,
    eraLabel: 'I Wojna Światowa',
    region: 'Warmińsko-Mazurskie',
    combatants: 'Cesarstwo Niemieckie (8. Armia — Hindenburg, Ludendorff) vs Imperium Rosyjskie (2. Armia — gen. Samsonow)',
    outcome: 'Okrążenie i niemal całkowite zniszczenie rosyjskiej 2. Armii',
    summary: 'Jedna z największych bitew manewrowych I wojny światowej (26–30 sierpnia 1914 r.), obejmująca olbrzymi obszar od Nidzicy i Olsztynka po Szczytno i Wielbark.',
    details: 'Walki toczyły się m.in. w lasach napiwodzko-ramuckich, pod Orłowem, Waplewem, Muszakami i Wielbarkiem, gdzie otoczono główne siły rosyjskie. W lasach wciąż widoczne są wyraźne transzeje i leje po pociskach.',
    terrainHint: 'Lasy Napiwodzko-Ramuckie, wzgórza morenowe i przesmyki między jeziorami — okopy bardzo wyraźne na LIDAR.',
    legalStatus: 'permit_required',
    legalNote: 'Poszukiwania w lasach wyłącznie za pisemną zgodą Nadleśnictwa i WKZ (szczególna uwaga na niewybuchy i cmentarze wojenne!).',
    finds: [
      { item: 'Klamry pruskie i carskie, odznaki pułkowe, hełmy pikielhauby (elementy okuć), łuski, manierki z 1914 r.', discoverer: 'Muzea regionalne i legalne badania stowarzyszeń', year: '2000–2024', dating: '1914 r.', museum: 'Muzeum Warmii i Mazur / Izby Historyczne w Olsztynku i Nidzicy' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Tannenbergiem_(1914)',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-gorlice-1915',
    name: 'Bitwa pod Gorlicami (1915 — Przełamanie Frontu Wschodniego)',
    category: 'battle',
    lat: 49.6544, lng: 21.1597,
    yearStart: 1915, yearEnd: 1915,
    eraLabel: 'I Wojna Światowa',
    region: 'Małopolskie (Beskid Niski)',
    combatants: 'Państwa Centralne (Niemcy i Austro-Węgry — gen. Mackensen) vs Imperium Rosyjskie (3. Armia)',
    outcome: 'Przełamanie frontu wschodniego i „Wielki Odwrót” armii rosyjskiej',
    summary: 'Jedna z najważniejszych operacji I wojny światowej (2–5 maja 1915 r.), zwana „Małym Verdun” — 4-godzinny huraganowy ogień 1500 dział na wzgórza Beskidu Niskiego.',
    details: 'Główne walki o wzgórza Pustki (Łużna), Magdalena, Sękowa i Małastów. W lasach Beskidu Niskiego zachowały się setki kilometrów okopów i kilkaset zabytkowych cmentarzy wojennych zaprojektowanych przez wybitnych architektów.',
    terrainHint: 'Lesiste wzgórza Beskidu Niskiego i Pogórza Ciężkowickiego — na LIDAR doskonale widać całe linie transzei, ziemianek i stanowisk moździerzy.',
    legalStatus: 'permit_required',
    legalNote: 'Absolutny zakaz wchodzenia z wykrywaczem w pobliże cmentarzy wojennych i mogił! Poza nimi wymagane pozwolenie właściciela/Nadleśnictwa i WKZ.',
    finds: [
      { item: 'Elementy umundurowania 3 armii (austro-węgierskiej, niemieckiej, rosyjskiej), nieśmiertelniki, zapalniki artyleryjskie, przybory okopowe', discoverer: 'Muzeum Regionalne PTTK w Gorlicach i grupy badawcze', year: '1970–2024', dating: '1915 r.', museum: 'Muzeum Regionalne PTTK w Gorlicach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Gorlicami',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-bzura-1939',
    name: 'Bitwa nad Bzurą (1939 — Największa Bitwa Kampanii Wrześniowej)',
    category: 'battle',
    lat: 52.1636, lng: 19.8650,
    yearStart: 1939, yearEnd: 1939,
    eraLabel: 'II Wojna Światowa (Wrzesień 1939)',
    region: 'Mazowieckie / Łódzkie',
    combatants: 'Wojsko Polskie (Armia „Poznań” i „Pomorze” — gen. Tadeusz Kutrzeba) vs Wehrmacht (Grupa Armii Południe)',
    outcome: 'Początkowy sukces polskiego zwrotu zaczepnego, później okrążenie i przebijanie się do Warszawy przez Puszczę Kampinoską',
    summary: 'Największa bitwa Kampanii Wrześniowej (9–22 września 1939 r.), toczona od Łęczycy, Piątku i Kutna po Łowicz, Sochaczew, Brochów i Iłów.',
    details: 'Polski manewr zaskoczył dowództwo niemieckie i zmusił je do przerzucenia dywizji pancernych spod Warszawy. Zacięte walki trwały na przeprawach pod Witkowicami, Brochowem i w Puszczy Kampinoskiej.',
    terrainHint: 'Dolina rzeki Bzury, łąki, lasy i wydmy Puszczy Kampinoskiej (uwaga: Kampinoski Park Narodowy!).',
    legalStatus: 'permit_required',
    legalNote: 'W Kampinoskim Parku Narodowym obowiązuje bezwzględny zakaz poszukiwań! Poza parkiem wymagana zgoda właściciela i WKZ.',
    finds: [
      { item: 'Polskie hełmy wz. 31, bagnety, elementy czołgów 7TP i tankietek TKS, nieśmiertelniki (w tym odnalezione i przekazane rodzinom poległych)', discoverer: 'Muzeum Ziemi Sochaczewskiej i Pola Bitwy nad Bzurą oraz licencjonowane grupy', year: '1973–2024', dating: 'Wrzesień 1939', museum: 'Muzeum Ziemi Sochaczewskiej i Pola Bitwy nad Bzurą' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_nad_Bzur%C4%85',
    source: 'Baza TerraHistoria / Muzeum w Sochaczewie'
  },
  {
    id: 'site-mru',
    name: 'Międzyrzecki Rejon Umocniony (MRU / Ostwall)',
    category: 'fortification',
    lat: 52.3711, lng: 15.4956,
    yearStart: 1934, yearEnd: 1945,
    eraLabel: 'II Wojna Światowa',
    region: 'Lubuskie',
    summary: 'Jeden z największych i najciekawszych systemów podziemnych fortyfikacji XX wieku w Europie — ponad 30 km podziemnych korytarzy, dworców kolejki i ponad 100 panzerwerków.',
    details: 'Niemiecki system umocnień broniący granicy wschodniej między Odrą a Wartą, przełamany przez Armię Czerwoną w styczniu 1945 r. Dziś dodatkowo największy w Europie zimowy rezerwat nietoperzy.',
    terrainHint: 'Pojezierze Lubuskie — potężne betonowe zęby smoka (zapory przeciwczołgowe), kanały i wzgórza kryjące pancerne kopuły.',
    legalStatus: 'protected_monument',
    legalNote: 'Rezerwat przyrody „Nietoperek” i zabytek militarny — ścisła ochrona.',
    finds: [
      { item: 'Elementy wyposażenia panzerwerków, zbiory militariów z walk w styczniu 1945 r., oryginalne mechanizmy pancerne', discoverer: 'Muzeum Fortyfikacji i Nietoperzy w Pniewie', year: '1980–2024', dating: '1934–1945', museum: 'Muzeum Fortyfikacji i Nietoperzy w Pniewie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Mi%C4%99dzyrzecki_Rejon_Umocniony',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-wal-pomorski',
    name: 'Wał Pomorski (Przełamanie 1945) i Skarby Pomorza',
    category: 'battle',
    lat: 53.3067, lng: 16.4161,
    yearStart: 1932, yearEnd: 1945,
    eraLabel: 'II Wojna Światowa',
    region: 'Zachodniopomorskie (Wałcz / Mirosławiec / Złocieniec)',
    combatants: '1 Armia Wojska Polskiego i Armia Czerwona vs Wehrmacht i Waffen-SS',
    outcome: 'Przełamanie niemieckich umocnień w lutym 1945 r.',
    summary: 'Głęboko rozbudowana linia schronów bojowych, okopów i przesmyków jeziornych, miejsce najcięższych walk 1 Armii WP w 1945 r.',
    details: 'Rozległe lasy wokół Wałcza, Nadarzyc, Zdbic i Złocieńca pełne są reliktów schronów żelbetowych, transzei i ziemianek. W pobliskim Złocieńcu wydobyto w 2016 r. słynną kapsułę czasu z 1934 r.',
    terrainHint: 'Pojezierze Wałeckie i Drawskie — gęste bory, liczne jeziora rynnowe, doskonała czytelność transzei na LIDAR.',
    legalStatus: 'permit_required',
    legalNote: 'Lasy Państwowe — wymagana zgoda Nadleśnictwa i WKZ; wyjątkowa ostrożność ze względu na niewybuchy z 1945 r.',
    finds: [
      { item: 'Kapsuła czasu z 1934 r. w Złocieńcu (monety, gazety, filmy, listy) oraz liczne pamiątki po 1 Armii WP (m.in. Skansen Bojowy w Zdbicach)', discoverer: 'Archeolodzy i eksploratorzy (m.in. dr Marcin Peterleitner, 2016)', year: '2016', dating: '1934–1945', museum: 'Muzeum Narodowe w Szczecinie / Muzeum Ziemi Wałeckiej' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Wa%C5%82_Pomorski',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-siekierki-1945',
    name: 'Forsowanie Odry pod Siekierkami i Gozdowicami (1945)',
    category: 'battle',
    lat: 52.8117, lng: 14.1567,
    yearStart: 1945, yearEnd: 1945,
    eraLabel: 'II Wojna Światowa',
    region: 'Zachodniopomorskie',
    combatants: '1 Armia Wojska Polskiego vs Wehrmacht (9. Armia)',
    outcome: 'Uchwycenie przyczółków i otwarcie drogi na Berlin',
    summary: 'Jedna z najtrudniejszych operacji desantowych Wojska Polskiego w II wojnie światowej (16–20 kwietnia 1945 r.) na rozlewiskach Odry.',
    details: 'Żołnierze 1 AWP sforsowali szeroko rozlaną Odrę pod silnym ogniem z niemieckich bunkrów i skarp po zachodniej stronie rzeki.',
    terrainHint: 'Szeroka dolina Odry, wały przeciwpowodziowe, dawne przeprawy pontonowe i skarpa w rejonie Gozdowic.',
    legalStatus: 'permit_required',
    legalNote: 'Obszar Cedyńskiego Parku Krajobrazowego i rejon cmentarza wojennego — obowiązuje ścisłe przestrzeganie stref ochronnych i zgoda WKZ.',
    finds: [
      { item: 'Elementy uzbrojenia, łodzi desantowych, hełmy i osobiste przedmioty żołnierzy 1 AWP', discoverer: 'Muzeum Pamiątek 1 Armii WP w Gozdowicach', year: '1960–2023', dating: 'Kwiecień 1945', museum: 'Muzeum Pamiątek 1 Armii WP w Starych Łysogórkach / Gozdowicach' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Forsowanie_Odry',
    source: 'Baza TerraHistoria'
  },

  // ---------- DODATKOWE GŁOŚNE ZNALEZISKA DETEKTORYSTYCZNE I ARCHEOLOGICZNE (2020–2024) ----------
  {
    id: 'site-cichoborz-hrubieszow',
    name: 'Skarb Rzymskich Denarów z Cichobórza (pow. hrubieszowski)',
    category: 'treasure',
    lat: 50.7131, lng: 23.9636,
    yearStart: 100, yearEnd: 210,
    eraLabel: 'Okres wpływów rzymskich',
    region: 'Lubelskie',
    summary: 'Największy na Lubelszczyźnie skarb srebrnych rzymskich denarów (1753 monety!) odkryty przez legalnie działającego poszukiwacza z wykrywaczem metali.',
    details: 'Odkryty w 2019 r. przez lokalnego pasjonata, który niezwłocznie zgłosił znalezisko do Muzeum w Hrubieszowie. Monety (od Nerwy po Septymiusza Sewera, łącznie ponad 5,5 kg srebra) należały prawdopodobnie do wojowników kultury przeworskiej lub Gotów.',
    terrainHint: 'Żyzna Kotlina Hrubieszowska na pograniczu z Ukrainą — obszar intensywnego osadnictwa gockiego (kultura wielbarska).',
    legalStatus: 'archaeological_zone',
    legalNote: 'Stanowisko przebadane przez archeologów i wpisane do ewidencji — przykład wzorowej współpracy poszukiwacza z muzeum.',
    finds: [
      { item: '1753 srebrne denary rzymskie (I–II w. n.e.) oraz 8 srebrnych posrebrzanych nitów z drewnianej szkatułki', discoverer: 'Mariusz Dyl (poszukiwacz) + badania archeologów z Muzeum w Hrubieszowie i UMCS', year: '2019', dating: '96–195 n.e.', museum: 'Muzeum im. ks. Stanisława Staszica w Hrubieszowie' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Cichob%C3%B3rz',
    source: 'Baza TerraHistoria / Muzeum w Hrubieszowie'
  },
  {
    id: 'site-zlotoryja-skarb',
    name: 'Okolice Złotoryi i Płuczki — Historyczne Płukanie Złota',
    category: 'settlement',
    lat: 51.1264, lng: 15.9200,
    yearStart: 1180, yearEnd: 1700,
    eraLabel: 'Średniowiecze – Nowożytność',
    region: 'Dolnośląskie (Kraina Wygasłych Wulkanów)',
    summary: 'Najstarszy ośrodek górnictwa złota na ziemiach polskich (XII–XIV w.) — w dolinie Kaczawy i potoków górskich wydobywano złotonośne piaski.',
    details: 'Złotoryja (Aureus Mons) otrzymała prawa miejskie już w 1211 r. Do dziś w rejonie Złotoryi, Lwówka Śląskiego i Kopacza można obserwować w lasach (zwłaszcza na LIDAR!) tysiące kopców płuczkowych i średniowiecznych sztolni.',
    terrainHint: 'Dolina Kaczawy, wzgórza bazaltowe Pogórza Kaczawskiego — na LIDAR widoczne średniowieczne pola płuczkowe i hałdy.',
    legalStatus: 'permit_required',
    legalNote: 'Zabytkowe sztolnie są chronione; poszukiwania poza obiektami wpisanymi do rejestru wymagają zgody właściciela/Nadleśnictwa i WKZ.',
    finds: [
      { item: 'Średniowieczne narzędzia górnicze, drobinki rodzimego złota, monety śląskie z XIII–XIV w.', discoverer: 'Badania górniczo-archeologiczne i Polskie Bractwo Kopaczy Złota', year: 'XX–XXI w.', dating: 'XII–XVI w.', museum: 'Muzeum Złota w Złotoryi' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Z%C5%82otoryja',
    source: 'Baza TerraHistoria / Muzeum Złota'
  },
  {
    id: 'site-niedzica',
    name: 'Zamek Dunajec w Niedzicy (Granica Polsko-Węgierska)',
    category: 'castle',
    lat: 49.4222, lng: 20.3197,
    yearStart: 1325, yearEnd: 1945,
    eraLabel: 'Późne średniowiecze – XX wiek',
    region: 'Małopolskie (Spisz)',
    summary: 'Malownicza warownia strzegąca dawnej granicy z Węgrami i szlaku handlowego doliną Dunajca, słynąca również z legendy o inkaskim kipu (testamencie).',
    details: 'Wzniesiony na stromej wapiennej skale naprzeciwko polskiego Zamku w Czorsztynie. Przez stulecia kontrolował przełom Dunajca oraz handel winem węgierskim, miedzią i solą.',
    terrainHint: 'Stromy cypel nad Jeziorem Czorsztyńskim i przełomem Pienin.',
    legalStatus: 'protected_monument',
    legalNote: 'Zabytek i otoczenie Pienińskiego Parku Narodowego — zakaz poszukiwań.',
    finds: [
      { item: 'Ołowiana tuba z rzekomym inkaskim pismem węzełkowym kipu (1946) oraz historyczne uzbrojenie i monety węgierskie', discoverer: 'Andrzej Benesz (1946) oraz badania konserwatorskie', year: '1946', dating: 'XIV–XVIII w.', museum: 'Muzeum Zamek Dunajec w Niedzicy' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Zamek_w_Niedzicy',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-kazimierz-dolny',
    name: 'Kazimierz Dolny — Port Spichlerzowy i Zamek',
    category: 'settlement',
    lat: 51.3189, lng: 21.9461,
    yearStart: 1340, yearEnd: 1800,
    eraLabel: 'Późne średniowiecze – I Rzeczpospolita',
    region: 'Lubelskie',
    summary: 'Perła renesansu i jeden z najważniejszych portów handlowych spławu wiślanego, z potężnymi spichlerzami zbożowymi i zamkiem Kazimierza Wielkiego.',
    details: 'W XVI–XVII w. przez tutejsze nabrzeża przechodziły dziesiątki tysięcy ton zboża z Lubelszczyzny i Rusi w drodze do Gdańska. Okoliczne lessowe wąwozy były naturalnymi drogami dojazdowymi wozów kupieckich.',
    terrainHint: 'Głębokie lessowe wąwozy (Korzeniowy Dół, Norowy Dół) uchodzące wprost do doliny Wisły.',
    legalStatus: 'protected_monument',
    legalNote: 'Pomnik Historii i Kazimierski Park Krajobrazowy — zakaz nielegalnych poszukiwań.',
    finds: [
      { item: 'Monety koronne, plomby kupieckie, naczynia renesansowe i okucia dawnych szkut wiślanych', discoverer: 'Badania archeologiczne na zamku i rynku', year: '1970–2020', dating: 'XIV–XVII w.', museum: 'Muzeum Nadwiślańskie w Kazimierzu Dolnym' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Kazimierz_Dolny',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-tyniec',
    name: 'Opactwo Benedyktynów w Tyńcu',
    category: 'settlement',
    lat: 50.0172, lng: 19.8022,
    yearStart: 1044, yearEnd: 1816,
    eraLabel: 'Wczesne średniowiecze – XIX wiek',
    region: 'Małopolskie',
    summary: 'Najstarszy istniejący klasztor w Polsce (założony w 1044 r. przez Kazimierza Odnowiciela), położony na wapiennej skale nad przełomem Wisły.',
    details: 'Wzgórze zamieszkane było już w epoce neolitu i przez Celtów (osada celtycka kultury lateńskiej!). Odegrało też ważną rolę jako twierdza konfederatów barskich (1771–1772).',
    terrainHint: 'Wapienne Wzgórze Klasztorne (Brama Tyniecka) nad Wisłą.',
    legalStatus: 'protected_monument',
    legalNote: 'Zabytek najwyższej klasy — ścisła ochrona.',
    finds: [
      { item: 'Złoty kielich i pastorał opata z XI w. (groby opatów), monety celtyckie i średniowieczne', discoverer: 'Zespół prof. Klementyny Żurowskiej', year: '1961–1965', dating: 'III w. p.n.e. – XVIII w.', museum: 'Muzeum Opactwa w Tyńcu / Zamek Królewski na Wawelu' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Opactwo_Benedyktyn%C3%B3w_w_Ty%C5%84cu',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-glogowek-lubiaz',
    name: 'Opactwo Cystersów w Lubiążu i Przeprawa Odrzańska',
    category: 'settlement',
    lat: 51.2614, lng: 16.4694,
    yearStart: 1163, yearEnd: 1945,
    eraLabel: 'Wczesne średniowiecze – II WŚ',
    region: 'Dolnośląskie',
    summary: 'Jeden z największych zespołów klasztornych w Europie, założony w 1163 r. przy ważnej przeprawie przez Odrę. Obiekt badań historycznych i legend o depozytach z 1945 r.',
    details: 'W czasie II wojny światowej w podziemiach i murach klasztoru Niemcy ulokowali tajne zakłady zbrojeniowe (m.in. produkcję podzespołów radarowych Telefunken).',
    terrainHint: 'Tarasy pradoliny Odry, starorzecza i rozległe bory na prawym brzegu rzeki.',
    legalStatus: 'protected_monument',
    legalNote: 'Zabytek klasy zerowej — zakaz prac bez zezwolenia WKZ.',
    finds: [
      { item: 'Relikty średniowiecznego klasztoru i cmentarzyska, znaleziska z okresu wojen husyckich i 1945 r.', discoverer: 'Badania archeologiczno-architektoniczne', year: '1980–2020', dating: 'XII–XX w.', museum: 'Fundacja Lubiąż' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Opactwo_Cysters%C3%B3w_w_Lubi%C4%85%C5%BCu',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-grob-wikinga-bodzia',
    name: 'Cmentarzysko Elit z Bodzi (Skandynawia i Ruś u Piastów)',
    category: 'treasure',
    lat: 52.7119, lng: 18.8789,
    yearStart: 980, yearEnd: 1035,
    eraLabel: 'Wczesne średniowiecze',
    region: 'Kujawsko-Pomorskie',
    summary: 'Jedno z najważniejszych odkryć archeologicznych XXI w. w Polsce — elitarne cmentarzysko wojowników z drużyny Bolesława Chrobrego (powiązanych z Rusią i Skandynawią).',
    details: 'Odkryte podczas badań wyprzedzających budowę autostrady A1. W grobie młodego wojownika znaleziono miecz typu wikińskiego, pas z tamgą księcia Światopełka Przeklętego oraz arabskie i angielskie monety.',
    terrainHint: 'Równina Kujawska na zachód od Włocławka, przy dawnym szlaku wzdłuż Wisły.',
    legalStatus: 'archaeological_zone',
    legalNote: 'Stanowisko archeologiczne przebadane przez IAiE PAN.',
    finds: [
      { item: 'Elitarny miecz wikiński, pas z brązowym zakończeniem z tamgą Rurykowiczów, srebrne kaptorgi, waga kupiecka i 70 monet z X–XI w.', discoverer: 'Zespół prof. Andrzeja Buko (IAiE PAN)', year: '2007–2009', dating: '980–1035 n.e.', museum: 'Państwowe Muzeum Archeologiczne / IAiE PAN' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bodzia',
    source: 'Baza TerraHistoria / IAiE PAN'
  },
  {
    id: 'site-oliwa-1627',
    name: 'Bitwa pod Oliwą (1627 — Zwycięstwo Polskiej Floty)',
    category: 'battle',
    lat: 54.4420, lng: 18.6300,
    yearStart: 1627, yearEnd: 1627,
    eraLabel: 'Rzeczpospolita (Wojny ze Szwecją)',
    region: 'Pomorskie (Zatoka Gdańska)',
    combatants: 'Flota Rzeczypospolitej (adm. Arend Dickmann, galeon „Rycerz Święty Jerzy”) vs Flota Szwedzka (adm. Nils Stiernsköld)',
    outcome: 'Zwycięstwo floty polskiej — zdobycie „Tigerna” i zatopienie „Solena”',
    summary: 'Największa zwycięska bitwa morska w dziejach dawnej Rzeczypospolitej (28 listopada 1627 r.) na redzie Gdańska.',
    details: 'Polska eskadra przerwała blokadę portu gdańskiego. W 1969 r. na dnie Zatoki Gdańskiej odnaleziono wrak szwedzkiego galeonu „Solen” wysadzonego podczas bitwy!',
    terrainHint: 'Zatoka Gdańska u wybrzeży Jelitkowa, Sopotu i Brzeźna.',
    legalStatus: 'protected_monument',
    legalNote: 'Wraki historyczne na dnie Bałtyku podlegają ścisłej ochronie Narodowego Muzeum Morskiego i Urzędu Morskiego.',
    finds: [
      { item: 'Wrak galeonu „Solen”: 20 armat brązowych i żelaznych, kule armatnie, monety szwedzkie, obuwie i przedmioty załogi', discoverer: 'Nurkowie i archeolodzy Centralnego Muzeum Morskiego (PRO)', year: '1969–1981', dating: '1627 r.', museum: 'Narodowe Muzeum Morskie w Gdańsku' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Oliw%C4%85',
    source: 'Baza TerraHistoria / NMM Gdańsk'
  },
  {
    id: 'site-studzianki-1944',
    name: 'Bitwa pod Studziankami (1944 — Przyczółek Warecko-Magnuszewski)',
    category: 'battle',
    lat: 51.6939, lng: 21.3372,
    yearStart: 1944, yearEnd: 1944,
    eraLabel: 'II Wojna Światowa',
    region: 'Mazowieckie (Puszcza Kozienicka)',
    combatants: '1 Brygada Pancerna im. Bohaterów Westerplatte i Armia Czerwona vs Dywizja Pancerno-Spadochronowa „Hermann Göring”',
    outcome: 'Utrzymanie przyczółka za Wisłą i rozbicie kontrataku pancernego Niemców',
    summary: 'Największa bitwa pancerna stoczona przez Wojsko Polskie na froncie wschodnim (9–16 sierpnia 1944 r.) w lasach pod Magnuszewem i Głowaczowem.',
    details: 'Zacięte starcia czołgów T-34 z niemieckimi Panterami i działami pancernymi w lesistym, piaszczystym terenie. Do dziś w rejonie wsi Studzianki Pancerne zachowały się liczne okopy i stanowiska.',
    terrainHint: 'Piaszczyste bory sosnowe między Pilicą a Radomką — transzeje i leje wyraźne na LIDAR.',
    legalStatus: 'permit_required',
    legalNote: 'Lasy Państwowe — wymagana zgoda Nadleśnictwa Dobieszyn i WKZ (duże zagrożenie niewybuchami!).',
    finds: [
      { item: 'Elementy gąsienic i pancerzy czołgów T-34 oraz PzKpfw V Panther, łuski artyleryjskie, elementy oporządzenia z 1944 r.', discoverer: 'Skansen i muzeum regionalne w Studziankach Pancernych', year: '1960–2022', dating: 'Sierpień 1944', museum: 'Izba Pamięci w Studziankach Pancernych' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Studziankami',
    source: 'Baza TerraHistoria'
  },
  {
    id: 'site-austerlitz',
    name: 'Pole Bitwy pod Austerlitz / Sławków (1805 — Europa)',
    category: 'battle',
    lat: 49.1281, lng: 16.7622,
    yearStart: 1805, yearEnd: 1805,
    eraLabel: 'Epoka Napoleońska (Europa)',
    region: 'Czechy (Morawy)',
    combatants: 'Cesarstwo Francuskie (Napoleon I) vs Rosja i Austria (Aleksander I, Franciszek II)',
    outcome: 'Arcydzieło taktyczne Napoleona — rozbicie III koalicji',
    summary: 'Słynna „Bitwa Trzech Cesarzy” (2 grudnia 1805 r.) na Wzgórzach Prackich niedaleko Brna — przykład danych europejskich w aplikacji.',
    details: 'Jeden z najważniejszych zabytków pól bitewnych Europy Środkowej. Po przybliżeniu dowolnego regionu Europy możesz nacisnąć „Skanuj archiwa w tym rejonie”, aby pobrać tysiące dodatkowych obiektów z Wikidanych i OSM.',
    terrainHint: 'Wzgórze Prackie (Pratecký kopec) i dawne stawy Zatczany.',
    legalStatus: 'protected_monument',
    legalNote: 'Obszar chroniony prawem Republiki Czeskiej — przestrzegaj lokalnych przepisów archeologicznych.',
    finds: [
      { item: 'Liczne kule armatnie, guziki pułkowe 3 armii, odznaczenia i elementy broni z 1805 r.', discoverer: 'Muzeum Mohyla míru (Pomnik Pokoju)', year: 'XIX–XXI w.', dating: '1805 r.', museum: 'Památník Mohyla míru, Prace' }
    ],
    wikipediaUrl: 'https://pl.wikipedia.org/wiki/Bitwa_pod_Austerlitz',
    source: 'Baza TerraHistoria / Europa'
  }
];
