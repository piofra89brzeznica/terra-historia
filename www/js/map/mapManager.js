// TerraHistoria — Silnik mapy (Leaflet + Geoportal LIDAR WMS + Satelita + Topografia + opcjonalnie Google Maps)
import { CATEGORIES, formatYearRange } from '../data/historicalData.js';

export class MapManager {
  constructor(containerId, callbacks = {}) {
    this.containerId = containerId;
    this.callbacks = callbacks;
    this.map = null;
    this.baseLayers = {};
    this.activeBaseId = 'streets';
    this.overlays = {};
    this.overlayState = {
      lidar: false,
      labels: false,
      routes: true
    };
    this.lidarOpacity = 0.65;
    this.clusterGroup = null;
    this.routeLayerGroup = null;
    this.markersById = new Map();
    this.selectedId = null;
    this.userMarker = null;
    this.userAccuracyCircle = null;
    this.userPosition = null;
    this.gpsWatchId = null;
    this.addPinMode = false;
    this.googleLoadedKey = null;
  }

  init() {
    const L = window.L;
    this.map = L.map(this.containerId, {
      center: [52.05, 19.35],
      zoom: 6,
      minZoom: 4,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: true,
      preferCanvas: true
    });

    this.map.attributionControl.setPrefix('');

    const fastTileOpts = {
      updateWhenIdle: true,
      updateWhenZooming: false,
      keepBuffer: 2
    };

    // --- PODKŁADY MAPOWE (100% darmowe, bez klucza API, zoptymalizowane pod szybkość) ---
    this.baseLayers = {
      streets: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
        ...fastTileOpts,
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }),
      osm: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        ...fastTileOpts,
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }),
      topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        ...fastTileOpts,
        maxZoom: 17,
        attribution: '&copy; OpenTopoMap (CC-BY-SA) &copy; OSM'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        ...fastTileOpts,
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri World Imagery'
      }),
      dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        ...fastTileOpts,
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }),
      geoportal_orto: L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/ORTO/WMS/StandardResolution', {
        ...fastTileOpts,
        layers: 'Raster',
        format: 'image/jpeg',
        transparent: false,
        version: '1.3.0',
        tileSize: 512,
        maxZoom: 19,
        attribution: '&copy; GUGiK Geoportal Ortofotomapa'
      })
    };

    this.baseLayers[this.activeBaseId].addTo(this.map);

    // --- WARSTWY SPECJALNE (LIDAR POLSKA + ETYKIETY — bez płatnych kluczy API) ---
    this.overlays = {
      lidar: L.tileLayer.wms('https://mapy.geoportal.gov.pl/wss/service/PZGIK/NMT/GRID1/WMS/ShadedRelief', {
        ...fastTileOpts,
        layers: 'Raster',
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        tileSize: 512,
        opacity: this.lidarOpacity,
        maxZoom: 19,
        attribution: '&copy; GUGiK Geoportal LIDAR (ISOK NMT)'
      }),
      labels: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
        ...fastTileOpts,
        maxZoom: 19,
        subdomains: 'abcd',
        pane: 'overlayPane'
      })
    };

    // Grupa szlaków handlowych
    this.routeLayerGroup = L.layerGroup().addTo(this.map);

    // Grupa klastrowanych markerów
    if (L.markerClusterGroup) {
      this.clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 46,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster) => {
          const count = cluster.getChildCount();
          const size = count >= 50 ? 'lg' : count >= 15 ? 'md' : 'sm';
          return L.divIcon({
            html: `<div class="th-cluster th-cluster-${size}"><span>${count}</span></div>`,
            className: 'th-cluster-wrap',
            iconSize: L.point(40, 40)
          });
        }
      });
    } else {
      this.clusterGroup = L.layerGroup();
    }
    this.clusterGroup.addTo(this.map);

    // Zdarzenia mapy
    this.map.on('click', (e) => {
      if (this.addPinMode) {
        this.setAddPinMode(false);
        this.callbacks.onMapPickLocation?.(e.latlng.lat, e.latlng.lng);
      } else {
        this.callbacks.onMapClick?.(e.latlng);
      }
    });

    this.map.on('moveend', () => {
      this.callbacks.onBoundsChange?.(this.map.getBounds(), this.map.getZoom());
    });

    return this.map;
  }

  /**
   * Tworzy estetyczną ikonę SVG dla kategorii
   */
  createCategoryIcon(categoryId, isSelected = false, isLive = false) {
    const L = window.L;
    const cat = CATEGORIES[categoryId] || CATEGORIES.settlement;
    const cls = [
      'th-pin',
      isSelected ? 'th-pin-selected' : '',
      isLive ? 'th-pin-live' : ''
    ].filter(Boolean).join(' ');

    return L.divIcon({
      className: 'th-pin-wrapper',
      html: `
        <div class="${cls}" style="--pin-color: ${cat.color};">
          <div class="th-pin-head">${cat.svg}</div>
          <div class="th-pin-tip"></div>
        </div>
      `,
      iconSize: [36, 44],
      iconAnchor: [18, 42],
      popupAnchor: [0, -40]
    });
  }

  /**
   * Renderuje punkty historyczne na mapie
   */
  renderSites(sites) {
    const L = window.L;
    this.clusterGroup.clearLayers();
    this.markersById.clear();

    const markers = [];
    for (const site of sites) {
      if (site.lat == null || site.lng == null) continue;
      const isSelected = site.id === this.selectedId;
      const marker = L.marker([site.lat, site.lng], {
        icon: this.createCategoryIcon(site.category, isSelected, site.isLive),
        title: site.name
      });

      const yearTxt = formatYearRange(site.yearStart, site.yearEnd);
      const cat = CATEGORIES[site.category] || CATEGORIES.settlement;
      marker.bindTooltip(
        `<div class="th-tooltip">
          <strong>${this._escape(site.name)}</strong>
          <div class="th-tooltip-meta"><span style="color:${cat.color}">●</span> ${cat.singular} • ${yearTxt}</div>
        </div>`,
        { direction: 'top', offset: [0, -38], opacity: 0.96 }
      );

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.selectItem(site.id);
        this.callbacks.onSelectItem?.(site);
      });

      this.markersById.set(site.id, { marker, site });
      markers.push(marker);
    }

    if (this.clusterGroup.addLayers) {
      this.clusterGroup.addLayers(markers);
    } else {
      markers.forEach(m => this.clusterGroup.addLayer(m));
    }
  }

  /**
   * Renderuje historyczne szlaki handlowe (polilinie + znacznik środkowy)
   */
  renderRoutes(routes) {
    const L = window.L;
    this.routeLayerGroup.clearLayers();
    if (!this.overlayState.routes) return;

    for (const route of routes) {
      if (!route.coordinates || route.coordinates.length < 2) continue;
      const isSelected = route.id === this.selectedId;

      // Podkład rozjaśniający dla kontrastu na mapie satelitarnej i LIDAR
      const glowLine = L.polyline(route.coordinates, {
        color: '#0f172a',
        weight: isSelected ? 9 : 6,
        opacity: isSelected ? 0.85 : 0.55,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false
      });

      const mainLine = L.polyline(route.coordinates, {
        color: route.color || '#f59e0b',
        weight: isSelected ? 5 : 3.5,
        opacity: isSelected ? 1 : 0.9,
        dashArray: isSelected ? null : (route.dashArray || '10, 6'),
        lineCap: 'round',
        lineJoin: 'round'
      });

      const yearTxt = formatYearRange(route.yearStart, route.yearEnd);
      mainLine.bindTooltip(
        `<div class="th-tooltip">
          <strong>🛤️ ${this._escape(route.name)}</strong>
          <div class="th-tooltip-meta">Szlak handlowy • ${yearTxt}</div>
        </div>`,
        { sticky: true, opacity: 0.96 }
      );

      mainLine.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.selectItem(route.id);
        this.callbacks.onSelectItem?.(route);
      });

      mainLine.on('mouseover', () => mainLine.setStyle({ weight: 6, opacity: 1 }));
      mainLine.on('mouseout', () => {
        if (this.selectedId !== route.id) {
          mainLine.setStyle({ weight: 3.5, opacity: 0.9 });
        }
      });

      // Znacznik kategorii na środku szlaku (ułatwia kliknięcie na ekranie dotykowym telefonu)
      const midIdx = Math.floor(route.coordinates.length / 2);
      const midPt = route.coordinates[midIdx];
      const badge = L.marker(midPt, {
        icon: L.divIcon({
          className: 'th-route-badge-wrap',
          html: `<div class="th-route-badge ${isSelected ? 'active' : ''}" style="--route-color:${route.color || '#f59e0b'}">
            <span>${this._escape(route.name.split('(')[0].trim())}</span>
          </div>`,
          iconSize: [0, 0]
        })
      });
      badge.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        this.selectItem(route.id);
        this.callbacks.onSelectItem?.(route);
      });

      glowLine.addTo(this.routeLayerGroup);
      mainLine.addTo(this.routeLayerGroup);
      badge.addTo(this.routeLayerGroup);
    }
  }

  selectItem(id) {
    const prev = this.selectedId;
    this.selectedId = id;
    if (prev && this.markersById.has(prev)) {
      const entry = this.markersById.get(prev);
      entry.marker.setIcon(this.createCategoryIcon(entry.site.category, false, entry.site.isLive));
    }
    if (id && this.markersById.has(id)) {
      const entry = this.markersById.get(id);
      entry.marker.setIcon(this.createCategoryIcon(entry.site.category, true, entry.site.isLive));
    }
  }

  flyTo(lat, lng, zoom = 12) {
    this.map.flyTo([lat, lng], Math.max(this.map.getZoom(), zoom), {
      duration: 0.9
    });
  }

  fitRoute(coordinates) {
    if (!coordinates || coordinates.length < 2) return;
    this.map.fitBounds(window.L.latLngBounds(coordinates), {
      padding: [50, 50],
      maxZoom: 10
    });
  }

  setBaseLayer(layerId) {
    if (!this.baseLayers[layerId]) return false;
    if (this.baseLayers[this.activeBaseId]) {
      this.map.removeLayer(this.baseLayers[this.activeBaseId]);
    }
    this.activeBaseId = layerId;
    this.baseLayers[layerId].addTo(this.map);
    // Upewnij się, że nakładki są nad podkładem
    if (this.overlayState.lidar && this.overlays.lidar) this.overlays.lidar.bringToFront();
    if (this.overlayState.labels && this.overlays.labels) this.overlays.labels.bringToFront();
    return true;
  }

  toggleOverlay(overlayId, enabled) {
    this.overlayState[overlayId] = enabled;
    if (overlayId === 'routes') {
      if (!enabled) this.routeLayerGroup.clearLayers();
      return;
    }
    const layer = this.overlays[overlayId];
    if (!layer) return;
    if (enabled) {
      layer.addTo(this.map);
      if (layer.bringToFront) layer.bringToFront();
    } else {
      this.map.removeLayer(layer);
    }
  }

  setLidarOpacity(value) {
    this.lidarOpacity = Math.max(0.15, Math.min(1, value));
    if (this.overlays.lidar) {
      this.overlays.lidar.setOpacity(this.lidarOpacity);
    }
  }

  /**
   * Opcjonalne doładowanie Google Maps API, jeśli użytkownik wpisze swój klucz w Ustawieniach
   */
  async enableGoogleMaps(apiKey) {
    const key = (apiKey || '').trim();
    if (!key) return { ok: false, message: 'Brak klucza Google Maps API.' };
    if (this.googleLoadedKey === key && this.baseLayers.google_hybrid) {
      return { ok: true, message: 'Warstwy Google Maps są gotowe.' };
    }

    try {
      if (!window.google?.maps) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&language=pl`;
          s.async = true;
          s.onload = resolve;
          s.onerror = () => reject(new Error('Nie udało się załadować Google Maps API. Sprawdź klucz.'));
          document.head.appendChild(s);
        });
      }

      if (!window.L?.gridLayer?.googleMutant) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://unpkg.com/leaflet.gridlayer.googlemutant@0.15.0/dist/Leaflet.GoogleMutant.js';
          s.async = true;
          s.onload = resolve;
          s.onerror = () => reject(new Error('Nie udało się załadować wtyczki GoogleMutant.'));
          document.head.appendChild(s);
        });
      }

      this.baseLayers.google_terrain = window.L.gridLayer.googleMutant({ type: 'terrain', maxZoom: 20 });
      this.baseLayers.google_hybrid = window.L.gridLayer.googleMutant({ type: 'hybrid', maxZoom: 20 });
      this.googleLoadedKey = key;
      return { ok: true, message: 'Aktywowano warstwy Google Maps (Teren i Hybryda).' };
    } catch (err) {
      return { ok: false, message: err.message || 'Błąd ładowania Google Maps.' };
    }
  }

  /**
   * Śledzenie GPS użytkownika (jak niebieska kropka w Google Maps)
   */
  locateUser(onSuccess, onError) {
    if (!navigator.geolocation) {
      onError?.('Twoja przeglądarka nie obsługuje geolokalizacji GPS.');
      return;
    }

    const L = window.L;
    const handlePos = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      this.userPosition = { lat: latitude, lng: longitude, accuracy };

      if (!this.userMarker) {
        this.userMarker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: 'th-gps-dot-wrap',
            html: '<div class="th-gps-pulse"></div><div class="th-gps-dot"></div>',
            iconSize: [22, 22],
            iconAnchor: [11, 11]
          }),
          zIndexOffset: 1000
        }).addTo(this.map);

        this.userAccuracyCircle = L.circle([latitude, longitude], {
          radius: Math.min(accuracy, 300),
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.14,
          weight: 1.5
        }).addTo(this.map);
      } else {
        this.userMarker.setLatLng([latitude, longitude]);
        this.userAccuracyCircle.setLatLng([latitude, longitude]).setRadius(Math.min(accuracy, 300));
      }

      onSuccess?.(this.userPosition);
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handlePos(pos);
        this.map.flyTo([pos.coords.latitude, pos.coords.longitude], 13, { duration: 0.9 });
      },
      (err) => {
        const msg = err.code === 1
          ? 'Brak zgody na dostęp do GPS. Włącz lokalizację dla tej strony w ustawieniach telefonu.'
          : 'Nie udało się ustalić pozycji GPS. Upewnij się, że GPS jest włączony (HTTPS wymagane na Androidzie).';
        onError?.(msg);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 10000 }
    );

    if (this.gpsWatchId == null) {
      this.gpsWatchId = navigator.geolocation.watchPosition(
        handlePos,
        () => {},
        { enableHighAccuracy: true, maximumAge: 15000 }
      );
    }
  }

  setAddPinMode(active) {
    this.addPinMode = active;
    const container = this.map?.getContainer();
    if (container) {
      container.classList.toggle('th-pick-mode', active);
    }
  }

  getBounds() {
    return this.map.getBounds();
  }

  getZoom() {
    return this.map.getZoom();
  }

  zoomIn() { this.map.zoomIn(); }
  zoomOut() { this.map.zoomOut(); }

  _escape(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
}
