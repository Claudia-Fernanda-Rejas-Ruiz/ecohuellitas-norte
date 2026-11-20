/**
 * EcoHuellitas Norte - Frontend Application Controller
 * Handles SPA navigation, Leaflet map, REST API calls, QR modals, and state management.
 */

// Application State
const state = {
  currentUser: {
    id: 'user-001',
    name: 'Claudia Rejas',
    email: 'vecino@losolivos.gob.pe',
    role: 'citizen',
    district: 'Los Olivos'
  },
  token: null,
  pets: [],
  reports: [],
  cleanPoints: [],
  stats: null,
  map: null,
  markersLayer: null,
  currentTab: 'home',
  activeMapFilter: 'all'
};

// District Coordinates Center (Lima Norte)
const DISTRICT_COORDS = {
  'Los Olivos': { lat: -11.9892, lng: -77.0691, zoom: 14 },
  'Comas': { lat: -11.9324, lng: -77.0506, zoom: 14 },
  'San Martín de Porres': { lat: -12.0125, lng: -77.0825, zoom: 14 },
  'Independencia': { lat: -11.9912, lng: -77.0515, zoom: 14 }
};

// Available Demo Users for quick role switching
const DEMO_USERS = {
  citizen: {
    id: 'user-001',
    name: 'Claudia Rejas',
    email: 'vecino@losolivos.gob.pe',
    role: 'citizen',
    district: 'Los Olivos'
  },
  inspector: {
    id: 'user-002',
    name: 'Carlos Mendoza',
    email: 'inspector@losolivos.gob.pe',
    role: 'inspector',
    district: 'Los Olivos'
  },
  admin: {
    id: 'user-003',
    name: 'Supervisión Sanitaria',
    email: 'admin@ecohuellitas.pe',
    role: 'admin',
    district: 'Los Olivos'
  }
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
  setupRoleSelector();
  await loadInitialData();
  initMap();
  runFineCalculator();
});

// Setup Demo User Role Selector
function setupRoleSelector() {
  const roleSelect = document.getElementById('demo-role-select');
  if (roleSelect) {
    roleSelect.value = state.currentUser.role;
    roleSelect.addEventListener('change', (e) => {
      const selectedRole = e.target.value;
      state.currentUser = DEMO_USERS[selectedRole] || DEMO_USERS.citizen;
      updateUserBadge();
      showToast(`Cambiado a rol: ${getRoleLabel(state.currentUser.role)}`, 'info');
      refreshViews();
    });
  }
  updateUserBadge();
}

function updateUserBadge() {
  const nameEl = document.getElementById('user-name-display');
  const roleEl = document.getElementById('user-role-display');
  if (nameEl) nameEl.textContent = state.currentUser.name;
  if (roleEl) roleEl.textContent = `${getRoleLabel(state.currentUser.role)} · ${state.currentUser.district}`;
}

function getRoleLabel(role) {
  switch (role) {
    case 'admin': return 'Administrador';
    case 'inspector': return 'Fiscalizador Municipal';
    default: return 'Vecino Empadronado';
  }
}

// Toast Notifications System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const colorMap = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-500 text-rose-100',
    warning: 'bg-amber-900/90 border-amber-500 text-amber-100',
    info: 'bg-slate-900/90 border-cyan-500 text-cyan-100'
  };

  const iconMap = {
    success: 'fa-check-circle text-emerald-400',
    error: 'fa-circle-xmark text-rose-400',
    warning: 'fa-triangle-exclamation text-amber-400',
    info: 'fa-circle-info text-cyan-400'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl text-sm transition-all duration-300 transform translate-y-2 opacity-0 ${colorMap[type] || colorMap.info}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || iconMap.info} text-lg"></i>
    <div class="flex-1 font-medium">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white transition">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Fetch Initial Data from REST Endpoints
async function loadInitialData() {
  try {
    const [statsRes, petsRes, reportsRes, cleanPointsRes] = await Promise.all([
      fetch('/api/stats/overview').then(r => r.json()),
      fetch('/api/pets').then(r => r.json()),
      fetch('/api/reports').then(r => r.json()),
      fetch('/api/clean-points').then(r => r.json())
    ]);

    if (statsRes.success) state.stats = statsRes.data;
    if (petsRes.success) state.pets = petsRes.data;
    if (reportsRes.success) state.reports = reportsRes.data;
    if (cleanPointsRes.success) state.cleanPoints = cleanPointsRes.data;

    renderOverviewStats();
    renderPetsGrid();
    renderReportsTable();
    renderDashboardAnalytics();
  } catch (error) {
    console.error('Error al cargar datos iniciales:', error);
    showToast('Error al conectar con la API REST local.', 'error');
  }
}

// Refresh all UI views with current state
function refreshViews() {
  renderOverviewStats();
  renderPetsGrid();
  renderReportsTable();
  renderDashboardAnalytics();
  if (state.map) updateMapMarkers();
}

// Navigation Tabs Switcher
function switchTab(tabId) {
  state.currentTab = tabId;
  const tabs = ['home', 'pets', 'report', 'map-view', 'fiscal', 'dashboard'];
  
  tabs.forEach(tab => {
    const section = document.getElementById(`tab-${tab}`);
    const navBtn = document.getElementById(`nav-${tab}`);
    if (section) {
      if (tab === tabId) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    }
    if (navBtn) {
      if (tab === tabId) {
        navBtn.classList.add('bg-emerald-700', 'text-white', 'shadow-sm');
        navBtn.classList.remove('text-slate-200', 'hover:bg-emerald-800/60');
      } else {
        navBtn.classList.remove('bg-emerald-700', 'text-white', 'shadow-sm');
        navBtn.classList.add('text-slate-200', 'hover:bg-emerald-800/60');
      }
    }
  });

  if (tabId === 'map-view') {
    setTimeout(() => {
      if (state.map) {
        state.map.invalidateSize();
        updateMapMarkers();
      }
    }, 200);
  }
}

// Render Overview Quick Stats
function renderOverviewStats() {
  if (!state.stats) return;
  const petsCount = document.getElementById('stat-pets');
  const reportsCount = document.getElementById('stat-reports');
  const resRate = document.getElementById('stat-resolution');
  const cleanPointsCount = document.getElementById('stat-cleanpoints');

  if (petsCount) petsCount.textContent = state.pets.length || state.stats.global.totalPets;
  if (reportsCount) reportsCount.textContent = state.reports.length || state.stats.global.totalReports;
  if (resRate) resRate.textContent = `${state.stats.global.resolutionRate}%`;
  if (cleanPointsCount) cleanPointsCount.textContent = state.cleanPoints.length || state.stats.global.totalCleanPoints;
}

// Render Pets Cards Grid
function renderPetsGrid() {
  const container = document.getElementById('pets-grid');
  if (!container) return;

  if (state.pets.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <i class="fa-solid fa-dog text-4xl mb-3 text-slate-600"></i>
        <p class="font-semibold text-lg text-slate-300">No hay mascotas empadronadas aun</p>
        <p class="text-xs text-slate-500 mt-1">Registra a tu mascota para generar su carné digital oficial con QR.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.pets.map(pet => `
    <div class="bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between group">
      <div>
        <div class="relative h-44 bg-slate-950 overflow-hidden">
          <img src="${pet.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80'}" alt="${pet.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
          <span class="absolute top-3 right-3 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-lg">
            ${pet.registrationCode}
          </span>
          <div class="absolute bottom-3 left-4">
            <h3 class="text-xl font-bold text-white tracking-wide">${pet.name}</h3>
            <p class="text-xs text-emerald-300 font-medium">${pet.breed} · ${pet.district}</p>
          </div>
        </div>

        <div class="p-4 space-y-3">
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Especie / Sexo</span>
              <span class="text-slate-200 font-semibold capitalize">${pet.species} (${pet.gender})</span>
            </div>
            <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">Tamaño</span>
              <span class="text-slate-200 font-semibold capitalize">${pet.size}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 text-[11px]">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${pet.rabiesVaccine ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50' : 'bg-rose-950/80 text-rose-300 border border-rose-700/50'}">
              <i class="fa-solid ${pet.rabiesVaccine ? 'fa-syringe' : 'fa-triangle-exclamation'}"></i> ${pet.rabiesVaccine ? 'Vacuna Antirrábica' : 'Sin Vacuna'}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg ${pet.sterilized ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/50' : 'bg-slate-800 text-slate-400'}">
              <i class="fa-solid fa-check"></i> ${pet.sterilized ? 'Esterilizado' : 'No Esterilizado'}
            </span>
          </div>
        </div>
      </div>

      <div class="p-4 pt-0">
        <button onclick="openPetQrModal('${pet.id}')" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm">
          <i class="fa-solid fa-qrcode text-base"></i> Ver Carné Digital QR
        </button>
      </div>
    </div>
  `).join('');
}

// Open QR Modal for Specific Pet
function openPetQrModal(petId) {
  const pet = state.pets.find(p => p.id === petId);
  if (!pet) return;

  const modal = document.getElementById('modal-qr');
  const nameEl = document.getElementById('qr-modal-name');
  const codeEl = document.getElementById('qr-modal-code');
  const breedEl = document.getElementById('qr-modal-breed');
  const photoEl = document.getElementById('qr-modal-photo');
  const qrImgEl = document.getElementById('qr-modal-img');

  if (nameEl) nameEl.textContent = pet.name;
  if (codeEl) codeEl.textContent = pet.registrationCode;
  if (breedEl) breedEl.textContent = `${pet.species === 'canino' ? 'Canino' : 'Felino'} · ${pet.breed} · ${pet.district}`;
  if (photoEl) photoEl.src = pet.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80';
  if (qrImgEl) qrImgEl.src = pet.qrCodeUrl || '';

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function toggleQrModal(show) {
  const modal = document.getElementById('modal-qr');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

function togglePetModal(show) {
  const modal = document.getElementById('modal-pet');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

// Handle Pet Registration Form
async function handleRegisterPet(event) {
  event.preventDefault();
  const name = document.getElementById('pet-name').value;
  const species = document.getElementById('pet-species').value;
  const breed = document.getElementById('pet-breed').value || 'Mestizo';
  const size = document.getElementById('pet-size').value;
  const gender = document.getElementById('pet-gender').value;
  const rabiesVaccine = document.getElementById('pet-rabies').checked;
  const sterilized = document.getElementById('pet-sterilized').checked;
  const photoUrl = document.getElementById('pet-photo').value;

  try {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer demo-token-${state.currentUser.id}`
      },
      body: JSON.stringify({
        name,
        species,
        breed,
        size,
        gender,
        district: state.currentUser.district,
        rabiesVaccine,
        sterilized,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80',
        userId: state.currentUser.id
      })
    });

    const result = await response.json();
    if (result.success) {
      showToast(`Mascota ${name} empadronada exitosamente con carné QR`, 'success');
      state.pets.unshift(result.data);
      renderPetsGrid();
      renderOverviewStats();
      togglePetModal(false);
      document.getElementById('pet-form').reset();
      openPetQrModal(result.data.id);
    } else {
      showToast(result.message || 'Error al registrar mascota', 'error');
    }
  } catch (error) {
    console.error('Error al registrar mascota:', error);
    showToast('Error de red al registrar mascota', 'error');
  }
}

// Handle Critical Point Report Form
async function handleCreateReport(event) {
  event.preventDefault();
  const district = document.getElementById('rep-district').value;
  const incidentType = document.getElementById('rep-type').value;
  const address = document.getElementById('rep-address').value;
  const severity = document.getElementById('rep-severity').value;
  const lat = parseFloat(document.getElementById('rep-lat').value);
  const lng = parseFloat(document.getElementById('rep-lng').value);
  const description = document.getElementById('rep-description').value;
  const photoUrl = document.getElementById('rep-photo').value;

  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer demo-token-${state.currentUser.id}`
      },
      body: JSON.stringify({
        district,
        incidentType,
        address,
        severity,
        location: { lat, lng },
        description,
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80'
      })
    });

    const result = await response.json();
    if (result.success) {
      showToast('Reporte ciudadano enviado con éxito a fiscalización municipal', 'success');
      state.reports.unshift(result.data);
      renderReportsTable();
      renderOverviewStats();
      renderDashboardAnalytics();
      if (state.map) updateMapMarkers();
      document.getElementById('report-form').reset();
      switchTab('map-view');
    } else {
      showToast(result.message || 'Error al enviar reporte', 'error');
    }
  } catch (error) {
    console.error('Error al crear reporte:', error);
    showToast('Error de red al enviar reporte', 'error');
  }
}

// Detect GPS Current Location
function detectGPSLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById('rep-lat').value = lat.toFixed(5);
        document.getElementById('rep-lng').value = lng.toFixed(5);
        showToast('Ubicación GPS detectada correctamente', 'info');
      },
      (error) => {
        console.warn('Geolocation error:', error);
        showToast('No se pudo acceder al GPS. Usando coordenadas por defecto.', 'warning');
      }
    );
  } else {
    showToast('Tu navegador no soporta geolocalización', 'warning');
  }
}

function updateLocationByDistrict(district) {
  const coords = DISTRICT_COORDS[district];
  if (coords) {
    document.getElementById('rep-lat').value = coords.lat;
    document.getElementById('rep-lng').value = coords.lng;
  }
}

// Render Reports Table in Fiscalization View
function renderReportsTable() {
  const tbody = document.getElementById('fiscal-table-body');
  if (!tbody) return;

  if (state.reports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-400">No hay reportes registrados</td></tr>`;
    return;
  }

  tbody.innerHTML = state.reports.map(rep => {
    const severityBadge = {
      alta: 'bg-rose-950/80 text-rose-300 border-rose-700/50',
      media: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
      baja: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
    }[rep.severity] || 'bg-slate-800 text-slate-300';

    const statusBadge = {
      pending: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
      in_investigation: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50',
      resolved: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
      sanctioned: 'bg-purple-950/80 text-purple-300 border-purple-700/50'
    }[rep.status] || 'bg-slate-800 text-slate-300';

    const statusLabel = {
      pending: 'Pendiente',
      in_investigation: 'En Inspección',
      resolved: 'Atendido / Limpio',
      sanctioned: 'Sancionado'
    }[rep.status] || rep.status;

    return `
      <tr class="hover:bg-slate-800/40 transition">
        <td class="p-3.5 font-mono text-xs text-slate-400">${rep.id}</td>
        <td class="p-3.5 font-semibold text-slate-200">${rep.district}</td>
        <td class="p-3.5">
          <div class="font-medium text-slate-300">${rep.address}</div>
          <div class="text-[11px] text-slate-500">${rep.description || 'Sin notas adicionales'}</div>
        </td>
        <td class="p-3.5 text-xs text-slate-400 capitalize">${rep.incidentType ? rep.incidentType.replace(/_/g, ' ') : 'General'}</td>
        <td class="p-3.5">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${severityBadge}">
            ${rep.severity}
          </span>
        </td>
        <td class="p-3.5">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge}">
            ${statusLabel}
          </span>
        </td>
        <td class="p-3.5 text-right space-x-1">
          <button onclick="updateReportStatus('${rep.id}', 'in_investigation')" title="Marcar en investigación" class="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/50 text-cyan-400 transition text-xs">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button onclick="updateReportStatus('${rep.id}', 'resolved')" title="Marcar atendido" class="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/50 text-emerald-400 transition text-xs">
            <i class="fa-solid fa-check"></i>
          </button>
          <button onclick="openSanctionModal('${rep.id}')" title="Emitir sanción administrativa" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400 transition text-xs">
            <i class="fa-solid fa-gavel"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Update Report Status Action
async function updateReportStatus(reportId, newStatus) {
  try {
    const response = await fetch(`/api/reports/${reportId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer demo-token-${state.currentUser.id}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    const result = await response.json();
    if (result.success) {
      showToast(`Estado del reporte ${reportId} actualizado`, 'success');
      const rep = state.reports.find(r => r.id === reportId);
      if (rep) rep.status = newStatus;
      renderReportsTable();
      renderDashboardAnalytics();
      if (state.map) updateMapMarkers();
    } else {
      showToast(result.message || 'No autorizado para cambiar estado', 'error');
    }
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    showToast('Error de red al actualizar reporte', 'error');
  }
}

// Initialize Leaflet Map
function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  state.map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([-11.975, -77.065], 13);

  // CartoDB Dark/Voyager tile layer for high-end look
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }).addTo(state.map);

  state.markersLayer = L.layerGroup().addTo(state.map);
  updateMapMarkers();
}

// Update Map Markers according to active filter
function updateMapMarkers() {
  if (!state.map || !state.markersLayer) return;
  state.markersLayer.clearLayers();

  const filter = state.activeMapFilter;

  // Add Reports Markers
  state.reports
    .filter(rep => filter === 'all' || rep.district === filter)
    .forEach(rep => {
      const color = rep.severity === 'alta' ? '#e11d48' : (rep.severity === 'media' ? '#f59e0b' : '#3b82f6');
      const marker = L.circleMarker([rep.location.lat, rep.location.lng], {
        radius: rep.severity === 'alta' ? 9 : 7,
        fillColor: color,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      });

      marker.bindPopup(`
        <div class="p-2 space-y-1 text-slate-800 text-xs">
          <span class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${rep.severity === 'alta' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
            ${rep.incidentType.replace(/_/g, ' ')}
          </span>
          <h4 class="font-bold text-sm text-slate-900">${rep.address}</h4>
          <p class="text-slate-600">${rep.district} · Severidad ${rep.severity}</p>
          <p class="text-[11px] text-slate-500">${rep.description || ''}</p>
        </div>
      `);
      state.markersLayer.addLayer(marker);
    });

  // Add Clean Points (Tachos caninos)
  state.cleanPoints
    .filter(cp => filter === 'all' || cp.district === filter)
    .forEach(cp => {
      const marker = L.circleMarker([cp.location.lat, cp.location.lng], {
        radius: 8,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      });

      marker.bindPopup(`
        <div class="p-2 space-y-1 text-slate-800 text-xs">
          <span class="font-bold uppercase tracking-wider text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
            Punto Limpio Municipal
          </span>
          <h4 class="font-bold text-sm text-slate-900">${cp.name}</h4>
          <p class="text-slate-600">${cp.district} · Tachos Caninos y Dispensador</p>
        </div>
      `);
      state.markersLayer.addLayer(marker);
    });
}

function filterMap(district) {
  state.activeMapFilter = district;
  
  // Update button active states
  const buttons = document.querySelectorAll('#map-filter-buttons button');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-district') === district) {
      btn.className = 'px-3 py-1.5 text-xs rounded-xl bg-emerald-600 text-white font-bold shadow-md transition';
    } else {
      btn.className = 'px-3 py-1.5 text-xs rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium transition';
    }
  });

  if (district !== 'all' && DISTRICT_COORDS[district]) {
    const target = DISTRICT_COORDS[district];
    state.map.flyTo([target.lat, target.lng], target.zoom, { duration: 1 });
  } else {
    state.map.flyTo([-11.975, -77.065], 13, { duration: 1 });
  }

  updateMapMarkers();
}

// Live Fine Calculator based on Ordinance & UIT 2026
async function runFineCalculator() {
  const district = document.getElementById('calc-district')?.value || 'Los Olivos';
  const infractionType = document.getElementById('calc-type')?.value || 'no_recojo_heces';
  const isReincident = document.getElementById('calc-reincident')?.value === 'true';

  try {
    const res = await fetch(`/api/inspections/preview?district=${encodeURIComponent(district)}&infractionType=${encodeURIComponent(infractionType)}&isReincident=${isReincident}`);
    const result = await res.json();
    if (result.success) {
      const data = result.data;
      const amountEl = document.getElementById('calc-amount');
      const actionEl = document.getElementById('calc-action');
      const ordinanceEl = document.getElementById('calc-ordinance');

      if (amountEl) amountEl.textContent = `S/ ${data.fineAmount.toFixed(2)} (${data.uitPercentage}% UIT)`;
      if (actionEl) {
        actionEl.textContent = data.actionRequired;
        actionEl.className = data.isReincident 
          ? 'bg-rose-950/80 border border-rose-500/50 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold'
          : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold';
      }
      if (ordinanceEl) ordinanceEl.textContent = `${data.ordinanceCode} · ${data.legalBasis}`;
    }
  } catch (error) {
    console.error('Error al calcular sanción:', error);
  }
}

// Render Dashboard Analytics
function renderDashboardAnalytics() {
  if (!state.stats) return;
  const districtTbody = document.getElementById('dashboard-district-body');
  if (districtTbody) {
    districtTbody.innerHTML = state.stats.districts.map(d => `
      <tr class="hover:bg-slate-800/40 transition">
        <td class="p-3.5 font-bold text-slate-200">${d.district}</td>
        <td class="p-3.5 text-slate-300">${d.totalReports}</td>
        <td class="p-3.5 text-emerald-400 font-semibold">${d.resolvedReports}</td>
        <td class="p-3.5">
          <div class="flex items-center gap-2">
            <div class="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: ${d.resolutionRate}%"></div>
            </div>
            <span class="text-xs font-semibold text-slate-300">${d.resolutionRate}%</span>
          </div>
        </td>
        <td class="p-3.5 text-slate-300">${d.petsRegistered}</td>
        <td class="p-3.5 text-slate-300">${d.cleanPointsCount}</td>
        <td class="p-3.5">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${d.sanitationScore >= 80 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/50' : 'bg-amber-950/80 text-amber-300 border border-amber-600/50'}">
            ${d.sanitationScore} / 100
          </span>
        </td>
      </tr>
    `).join('');
  }

  // Distribution Bars
  const barsContainer = document.getElementById('incident-type-bars');
  if (barsContainer && state.stats.global.incidentBreakdown) {
    const total = state.reports.length || 1;
    const breakdown = state.stats.global.incidentBreakdown;
    const labels = {
      heces_sin_recoger: { name: 'Heces no recogidas', color: 'bg-rose-500' },
      orina_fachada: { name: 'Orina en fachadas', color: 'bg-amber-500' },
      mascota_suelta: { name: 'Perro suelto sin correa', color: 'bg-cyan-500' },
      maltrato: { name: 'Riesgo / Maltrato', color: 'bg-purple-500' }
    };

    barsContainer.innerHTML = Object.entries(breakdown).map(([key, count]) => {
      const info = labels[key] || { name: key, color: 'bg-slate-500' };
      const pct = Math.round((count / total) * 100);
      return `
        <div class="space-y-1">
          <div class="flex justify-between text-xs text-slate-300">
            <span>${info.name}</span>
            <span class="font-bold">${count} (${pct}%)</span>
          </div>
          <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div class="${info.color} h-2.5 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Sanction Modal Trigger
function openSanctionModal(reportId) {
  const rep = state.reports.find(r => r.id === reportId);
  if (!rep) return;

  const modal = document.getElementById('modal-sanction');
  if (!modal) return;

  document.getElementById('sanc-report-id').value = rep.id;
  document.getElementById('sanc-district').value = rep.district;
  document.getElementById('sanc-address').textContent = rep.address;
  modal.classList.remove('hidden');
}

function toggleSanctionModal(show) {
  const modal = document.getElementById('modal-sanction');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

// Submit Official Sanction
async function handleEmitSanction(event) {
  event.preventDefault();
  const reportId = document.getElementById('sanc-report-id').value;
  const district = document.getElementById('sanc-district').value;
  const infractionType = document.getElementById('sanc-type').value;
  const isReincident = document.getElementById('sanc-reincident').checked;
  const offenderDni = document.getElementById('sanc-dni').value;
  const offenderName = document.getElementById('sanc-offender-name').value;
  const notes = document.getElementById('sanc-notes').value;

  try {
    const response = await fetch('/api/inspections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer demo-token-${state.currentUser.id}`
      },
      body: JSON.stringify({
        reportId,
        district,
        infractionType,
        isReincident,
        offenderDni,
        offenderName,
        inspectorNotes: notes
      })
    });

    const result = await response.json();
    if (result.success) {
      showToast(`Acta de fiscalización ${result.data.ticketNumber} emitida exitosamente`, 'success');
      toggleSanctionModal(false);
      updateReportStatus(reportId, 'sanctioned');
    } else {
      showToast(result.message || 'Error al emitir sanción', 'error');
    }
  } catch (error) {
    console.error('Error al emitir sanción:', error);
    showToast('Error de red al procesar la sanción', 'error');
  }
}
