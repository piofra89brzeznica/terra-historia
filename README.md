# TerraHistoria — Interaktywna Mapa Historyczna i Terenowa (Android PWA + Capacitor)

**TerraHistoria** to mobilna aplikacja kartograficzna inspirowana ergonomią Map Google, stworzona z myślą o pasjonatach historii, analizy dawnych szlaków handlowych, pól bitewnych, zamków oraz odpowiedzialnego planowania legalnych badań terenowych.

## Główne funkcje
- **Podkłady mapowe i rzeźba terenu:**
  - Mapa drogowa (Carto Voyager), Mapa topograficzna (OpenTopoMap), Satelita HD (Esri), **Geoportal Ortofotomapa PL (GUGiK)**.
  - **Geoportal LIDAR (ISOK NMT — cieniowanie rzeźby terenu)** z suwakiem przezroczystości — ujawnia kurhany, dawne wąwozy traktowe, wały grodzisk i okopy nawet pod gęstym lasem.
  - Globalne cieniowanie wzgórz (**Hillshade**) dla całej Europy.
  - **Opcjonalne Google Maps (Teren i Hybryda)** — po wklejeniu własnego klucza Google Maps API w Ustawieniach aplikacji.
- **Baza historyczna (ok. 6000 lat historii: 4000 p.n.e. – 1950 n.e.):**
  - **8 historycznych szlaków handlowych** (Szlak Bursztynowy, Via Regia, Szlak Solny, Via Hanseatica, Szlak Jagielloński, Szlak Wiślany, Wielki Trakt Napoleoński, Szlak Wschodni Piastowski).
  - **Pola bitewne, zamki, grody, twierdze, dawne osady i głośne udokumentowane znaleziska** (ze szczegółami: *co znaleziono, kto odkrył, kiedy, datowanie i muzeum*).
  - **Skanowanie otwartych archiwów na żywo** (**Wikidata SPARQL** + **OpenStreetMap `historic=*`**) dla dowolnego rejonu Polski i całej Europy.
- **Oś czasu, filtry i sortowanie:**
  - Podwójny suwak zakresu lat (`4000 p.n.e. – 1950 n.e.`) + szybkie filtry epok.
  - Własne ikony SVG dla każdej kategorii i panel listy z sortowaniem (chronologicznie, według liczby znalezisk, odległości GPS, ulubionych).
- **Narzędzia terenowe:**
  - Śledzenie lokalizacji GPS na żywo, przycisk bezpośredniej nawigacji w Google Maps, własny **Dziennik Terenowy** (zapisywanie własnych punktów z notatkami i statusem pozwolenia WKZ) oraz eksport do **GPX** i **GeoJSON**.
  - Wbudowany **Przewodnik prawny WKZ / NID** i oznaczenia stref chronionych.

---

## Jak zainstalować aplikację na telefonie z Androidem?

### Metoda 1: Najszybsza — instalacja jako aplikacja PWA przez Chrome (30 sekund, bez instalacji narzędzi)
1. Wejdź na darmową stronę **[app.netlify.com/drop](https://app.netlify.com/drop)** na komputerze.
2. Przeciągnij cały folder **`www`** z tego projektu w okno przeglądarki.
3. Po chwili otrzymasz własny bezpieczny adres **HTTPS** (wymagany przez Androida dla GPS i instalacji PWA).
4. Otwórz ten link w przeglądarce **Chrome na telefonie z Androidem**.
5. Kliknij zielony przycisk **„📲 Zainstaluj na Androidzie”** w aplikacji lub menu przeglądarki **⋮ → „Zainstaluj aplikację”**.
6. Ikona **TerraHistoria** pojawi się na pulpicie telefonu i będzie uruchamiać się na pełnym ekranie jak natywna aplikacja!

### Metoda 2: Automatyczny plik instalacyjny `.apk` przez GitHub Actions (bez Android Studio na komputerze)
1. Utwórz darmowe repozytorium na **GitHubie** i wgraj cały folder projektu `terra-historia`.
2. Wejdź w zakładkę **Actions** → **Build TerraHistoria Android APK** → kliknij **Run workflow**.
3. Po ok. 3 minutach w sekcji **Artifacts** pojawi się gotowy plik **`TerraHistoria-Android-APK`** (`app-debug.apk`).
4. Pobierz plik na telefon z Androidem i zainstaluj go (zezwól na instalację z nieznanych źródeł).

### Metoda 3: Lokalne uruchomienie na komputerze (podgląd w przeglądarce)
Kliknij prawym przyciskiem na plik `start-server.ps1` → **Uruchom w programie PowerShell**, a następnie otwórz w przeglądarce:
`http://localhost:8080`
