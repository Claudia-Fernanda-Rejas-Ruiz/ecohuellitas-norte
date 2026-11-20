/**
 * EcoHuellitas Norte - Frontend Controller & Application Logic
 * Modern, warm, responsive SPA with Leaflet, Chart.js, and Live Pet Preview.
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
  pets: [],
  reports: [],
  cleanPoints: [],
  stats: null,
  map: null,
  markersLayer: null,
  currentTab: 'home',
  activeMapFilter: 'all',
  petFilter: 'all',
  charts: {
    trend: null,
    types: null
  }
};

// District Coordinates Center (Lima Norte)
const DISTRICT_COORDS = {
  'Los Olivos': { lat: -11.9892, lng: -77.0691, zoom: 14 },
  'Comas': { lat: -11.9324, lng: -77.0506, zoom: 14 },
  'San Martín de Porres': { lat: -12.0125, lng: -77.0825, zoom: 14 },
  'Independencia': { lat: -11.9912, lng: -77.0515, zoom: 14 }
};

// Demo Users for Quick Switching
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

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  setupRoleSelector();
  setupIncidentCards();
  await loadInitialData();
  initMap();
  runFineCalculator();
  initCharts();
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
      showToast(`Modo cambiado a: ${getRoleLabel(state.currentUser.role)}`, 'info');
      refreshAllViews();
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
    case 'admin': return 'Admin Salubridad';
    case 'inspector': return 'Fiscalizador';
    default: return 'Vecino Empadronado';
  }
}

// Setup radio cards in wizard
function setupIncidentCards() {
  const cards = document.querySelectorAll('.incident-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('border-mint-600', 'bg-mint-50/70', 'ring-2', 'ring-mint-500'));
      card.classList.add('border-mint-600', 'bg-mint-50/70', 'ring-2', 'ring-mint-500');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const summaryType = document.getElementById('wiz-summary-type');
        if (summaryType) summaryType.textContent = getIncidentLabel(radio.value);
      }
    });
  });
}

function getIncidentLabel(type) {
  switch (type) {
    case 'heces_sin_recoger': return 'Heces sin recoger en vereda/parque';
    case 'orina_fachada': return 'Orina en fachada/esquina';
    case 'mascota_suelta': return 'Perro suelto sin correa';
    case 'maltrato': return 'Riesgo Sanitario / Maltrato';
    default: return type;
  }
}

// Toast Notifications System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const colorMap = {
    success: 'bg-mint-900 text-mint-100 border-mint-700',
    error: 'bg-coral-900 text-coral-100 border-coral-700',
    warning: 'bg-amber-900 text-amber-100 border-amber-700',
    info: 'bg-stone-900 text-stone-100 border-stone-700'
  };

  const iconMap = {
    success: 'fa-circle-check text-mint-400',
    error: 'fa-circle-xmark text-coral-400',
    warning: 'fa-triangle-exclamation text-amber-400',
    info: 'fa-circle-info text-stone-400'
  };

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-warm-xl text-xs font-semibold transition-all duration-300 transform translate-y-2 opacity-0 ${colorMap[type] || colorMap.info}`;
  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || iconMap.info} text-base"></i>
    <div class="flex-1">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-stone-400 hover:text-white transition">
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

// Trigger Confetti Celebration
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#f43f5e', '#f59e0b', '#10b981']
    });
  }
}

// Fetch Initial Data
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

    refreshAllViews();
  } catch (error) {
    console.error('Error al cargar datos:', error);
    showToast('Error de conexión con la API REST local.', 'error');
  }
}

// Refresh all views
function refreshAllViews() {
  renderOverviewStats();
  renderHomePets();
  renderHomeReportsTimeline();
  renderPetsGrid();
  renderReportsTable();
  renderDashboardTable();
  updateCharts();
  if (state.map) updateMapMarkers();
}

// Switch SPA Navigation Tabs
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
        navBtn.classList.add('bg-white', 'text-stone-900', 'shadow-sm');
        navBtn.classList.remove('text-stone-600', 'hover:bg-white/60');
      } else {
        navBtn.classList.remove('bg-white', 'text-stone-900', 'shadow-sm');
        navBtn.classList.add('text-stone-600', 'hover:bg-white/60');
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

  if (tabId === 'dashboard') {
    setTimeout(() => {
      updateCharts();
    }, 200);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Overview Statistics
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

// Render Pets in Home Preview Carousel
function renderHomePets() {
  const container = document.getElementById('home-pets-container');
  if (!container) return;

  if (state.pets.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white p-8 rounded-3xl border border-stone-200 text-center text-stone-500">
        <i class="fa-solid fa-dog text-3xl text-stone-300 mb-2"></i>
        <p class="font-bold text-stone-700">Aún no tienes mascotas empadronadas</p>
        <p class="text-xs text-stone-400 mt-1">Registra a tu mascota para generar su carné digital oficial con QR.</p>
        <button onclick="openPetRegisterWizard()" class="mt-4 bg-mint-600 hover:bg-mint-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md">
          Empadronar Mascota Ahora
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.pets.slice(0, 3).map(pet => renderSinglePetCard(pet)).join('');
}

// Render Complete Pets Grid in Pets Tab
function renderPetsGrid() {
  const container = document.getElementById('pets-grid');
  if (!container) return;

  let filtered = state.pets;
  if (state.petFilter === 'canino') filtered = state.pets.filter(p => p.species === 'canino');
  else if (state.petFilter === 'felino') filtered = state.pets.filter(p => p.species === 'felino');
  else if (state.petFilter === 'rabies') filtered = state.pets.filter(p => p.rabiesVaccine);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full bg-white p-10 rounded-3xl border border-stone-200 text-center text-stone-500">
        <p class="font-bold text-stone-700">No hay mascotas con el filtro seleccionado</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(pet => renderSinglePetCard(pet)).join('');
}

function filterPets(filter) {
  state.petFilter = filter;
  const chips = document.querySelectorAll('.pet-filter-chip');
  chips.forEach(chip => {
    if (chip.textContent.toLowerCase().includes(filter === 'all' ? 'todas' : filter)) {
      chip.className = 'pet-filter-chip px-3.5 py-1.5 rounded-full bg-stone-900 text-white font-bold transition';
    } else {
      chip.className = 'pet-filter-chip px-3.5 py-1.5 rounded-full bg-white text-stone-600 border border-stone-200 hover:bg-stone-50 font-semibold transition';
    }
  });
  renderPetsGrid();
}

// Single Pet Card HTML Template
function renderSinglePetCard(pet) {
  return `
    <div class="bg-white rounded-3xl border border-stone-200/90 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        <div class="relative h-44 bg-stone-100 overflow-hidden">
          <img src="${pet.photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80'}" alt="${pet.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>
          <span class="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-white text-stone-900 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
            ${pet.registrationCode}
          </span>
          <div class="absolute bottom-3 left-4">
            <h4 class="font-display font-extrabold text-xl text-white drop-shadow-sm">${pet.name}</h4>
            <p class="text-xs text-mint-200 font-semibold drop-shadow-sm">${pet.breed} · ${pet.district}</p>
          </div>
        </div>

        <div class="p-5 space-y-3">
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70">
              <span class="text-stone-400 block text-[10px] uppercase font-bold">Especie / Sexo</span>
              <span class="text-stone-800 font-bold capitalize">${pet.species} (${pet.gender})</span>
            </div>
            <div class="bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70">
              <span class="text-stone-400 block text-[10px] uppercase font-bold">Tamaño</span>
              <span class="text-stone-800 font-bold capitalize">${pet.size}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 text-[11px]">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold ${pet.rabiesVaccine ? 'bg-mint-50 text-mint-800 border border-mint-200' : 'bg-coral-50 text-coral-800 border border-coral-200'}">
              <i class="fa-solid ${pet.rabiesVaccine ? 'fa-syringe text-mint-600' : 'fa-triangle-exclamation text-coral-600'}"></i> ${pet.rabiesVaccine ? 'Antirrábica al día' : 'Sin Vacuna'}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold ${pet.sterilized ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-stone-100 text-stone-600'}">
              <i class="fa-solid fa-check text-blue-600"></i> ${pet.sterilized ? 'Esterilizado' : 'Sin Esterilizar'}
            </span>
          </div>
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="openPetQrModal('${pet.id}')" class="w-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold py-3 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs">
          <i class="fa-solid fa-qrcode text-mint-400"></i> Ver Carné Digital QR
        </button>
      </div>
    </div>
  `;
}

// Render Timeline of Reports on Home
function renderHomeReportsTimeline() {
  const container = document.getElementById('home-reports-timeline');
  if (!container) return;

  if (state.reports.length === 0) {
    container.innerHTML = `<p class="text-xs text-stone-500 text-center py-4">No hay reportes registrados.</p>`;
    return;
  }

  container.innerHTML = state.reports.slice(0, 4).map(rep => {
    const statusMap = {
      pending: { label: 'Pendiente', color: 'bg-amber-100 text-amber-900 border-amber-300', dot: 'bg-amber-500' },
      in_investigation: { label: 'En Inspección', color: 'bg-blue-100 text-blue-900 border-blue-300', dot: 'bg-blue-500' },
      resolved: { label: 'Atendido / Limpio', color: 'bg-mint-100 text-mint-900 border-mint-300', dot: 'bg-mint-500' },
      sanctioned: { label: 'Sancionado', color: 'bg-purple-100 text-purple-900 border-purple-300', dot: 'bg-purple-500' }
    };
    const s = statusMap[rep.status] || statusMap.pending;

    return `
      <div class="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 hover:bg-white hover:shadow-warm-sm transition">
        <div class="w-3 h-3 rounded-full ${s.dot} mt-1.5 flex-shrink-0"></div>
        <div class="flex-1 space-y-1">
          <div class="flex items-center justify-between gap-2">
            <span class="font-bold text-stone-900 text-xs">${rep.address}</span>
            <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${s.color} font-mono">${s.label}</span>
          </div>
          <p class="text-[11px] text-stone-500">${rep.district} · ${rep.description || getIncidentLabel(rep.incidentType)}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Open Pet QR Modal
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

  if (modal) modal.classList.remove('hidden');
}

function toggleQrModal(show) {
  const modal = document.getElementById('modal-qr');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

function openPetRegisterWizard() {
  togglePetModal(true);
  updateLivePetPreview();
}

function togglePetModal(show) {
  const modal = document.getElementById('modal-pet');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

// Live Pet Preview Update
function updateLivePetPreview() {
  const name = document.getElementById('pet-name')?.value || 'Rocky';
  const species = document.getElementById('pet-species')?.value || 'canino';
  const breed = document.getElementById('pet-breed')?.value || 'Golden Retriever';
  const gender = document.getElementById('pet-gender')?.value || 'macho';
  const photo = document.getElementById('pet-photo')?.value || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80';

  const previewName = document.getElementById('preview-name');
  const previewDetails = document.getElementById('preview-details');
  const previewPhoto = document.getElementById('preview-photo');

  if (previewName) previewName.textContent = name;
  if (previewDetails) previewDetails.textContent = `${species === 'canino' ? 'Canino' : 'Felino'} · ${breed} · ${gender}`;
  if (previewPhoto) previewPhoto.src = photo;
}

// Handle Pet Registration Submit
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
      triggerConfetti();
      showToast(`Mascota ${name} empadronada exitosamente. Carné QR emitido.`, 'success');
      state.pets.unshift(result.data);
      refreshAllViews();
      togglePetModal(false);
      document.getElementById('pet-register-form').reset();
      openPetQrModal(result.data.id);
    } else {
      showToast(result.message || 'Error al empadronar mascota', 'error');
    }
  } catch (error) {
    console.error('Error al registrar mascota:', error);
    showToast('Error de red al registrar mascota', 'error');
  }
}

// 3-Step Wizard Navigation
function goToWizardStep(step) {
  const s1 = document.getElementById('wizard-step-1');
  const s2 = document.getElementById('wizard-step-2');
  const s3 = document.getElementById('wizard-step-3');

  const ind1 = document.getElementById('step-ind-1');
  const ind2 = document.getElementById('step-ind-2');
  const ind3 = document.getElementById('step-ind-3');

  if (s1) s1.classList.add('hidden');
  if (s2) s2.classList.add('hidden');
  if (s3) s3.classList.add('hidden');

  if (step === 1) {
    if (s1) s1.classList.remove('hidden');
    if (ind1) ind1.className = 'flex items-center gap-2 text-mint-700 font-bold';
    if (ind2) ind2.className = 'flex items-center gap-2 text-stone-400 font-bold';
    if (ind3) ind3.className = 'flex items-center gap-2 text-stone-400 font-bold';
  } else if (step === 2) {
    if (s2) s2.classList.remove('hidden');
    if (ind1) ind1.className = 'flex items-center gap-2 text-mint-700 font-bold';
    if (ind2) ind2.className = 'flex items-center gap-2 text-mint-700 font-bold';
    if (ind3) ind3.className = 'flex items-center gap-2 text-stone-400 font-bold';
  } else if (step === 3) {
    if (s3) s3.classList.remove('hidden');
    if (ind1) ind1.className = 'flex items-center gap-2 text-mint-700 font-bold';
    if (ind2) ind2.className = 'flex items-center gap-2 text-mint-700 font-bold';
    if (ind3) ind3.className = 'flex items-center gap-2 text-mint-700 font-bold';

    // Update summary values
    const district = document.getElementById('wiz-district')?.value || 'Los Olivos';
    const address = document.getElementById('wiz-address')?.value || 'Sin dirección';
    const checkedRadio = document.querySelector('input[name="wizard-type"]:checked');
    const incidentType = checkedRadio ? checkedRadio.value : 'heces_sin_recoger';

    const sumDistrict = document.getElementById('wiz-summary-district');
    const sumType = document.getElementById('wiz-summary-type');
    const sumAddress = document.getElementById('wiz-summary-address');

    if (sumDistrict) sumDistrict.textContent = district;
    if (sumType) sumType.textContent = getIncidentLabel(incidentType);
    if (sumAddress) sumAddress.textContent = address;
  }
}

function updateWizardLocationByDistrict(district) {
  const coords = DISTRICT_COORDS[district];
  if (coords) {
    document.getElementById('wiz-lat').value = coords.lat;
    document.getElementById('wiz-lng').value = coords.lng;
  }
}

function detectWizardGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        document.getElementById('wiz-lat').value = pos.coords.latitude.toFixed(5);
        document.getElementById('wiz-lng').value = pos.coords.longitude.toFixed(5);
        showToast('Ubicación GPS detectada correctamente', 'info');
      },
      () => showToast('No se pudo acceder al GPS. Coordenadas por defecto.', 'warning')
    );
  }
}

// Handle Wizard Report Submission
async function handleWizardSubmit(event) {
  event.preventDefault();
  const checkedRadio = document.querySelector('input[name="wizard-type"]:checked');
  const incidentType = checkedRadio ? checkedRadio.value : 'heces_sin_recoger';
  const district = document.getElementById('wiz-district').value;
  const address = document.getElementById('wiz-address').value;
  const severity = document.getElementById('wiz-severity').value;
  const lat = parseFloat(document.getElementById('wiz-lat').value);
  const lng = parseFloat(document.getElementById('wiz-lng').value);
  const description = document.getElementById('wiz-description').value;
  const photoUrl = document.getElementById('wiz-photo').value;

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
        photoUrl: photoUrl || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80'
      })
    });

    const result = await response.json();
    if (result.success) {
      triggerConfetti();
      showToast('Reporte ciudadano enviado con éxito a fiscalización municipal', 'success');
      state.reports.unshift(result.data);
      refreshAllViews();
      document.getElementById('report-wizard-form').reset();
      goToWizardStep(1);
      switchTab('map-view');
    } else {
      showToast(result.message || 'Error al enviar reporte', 'error');
    }
  } catch (error) {
    console.error('Error al enviar reporte:', error);
    showToast('Error de red al procesar reporte', 'error');
  }
}

// Leaflet Map Initialization with CartoDB Positron
function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  state.map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([-11.975, -77.065], 13);

  // CartoDB Positron (clean, bright and friendly)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }).addTo(state.map);

  state.markersLayer = L.layerGroup().addTo(state.map);
  updateMapMarkers();
}

// Update Markers on Leaflet Map
function updateMapMarkers() {
  if (!state.map || !state.markersLayer) return;
  state.markersLayer.clearLayers();

  const filter = state.activeMapFilter;

  // Add Incident Reports
  state.reports
    .filter(rep => filter === 'all' || rep.district === filter)
    .forEach(rep => {
      const color = rep.severity === 'alta' ? '#f43f5e' : (rep.severity === 'media' ? '#f59e0b' : '#3b82f6');
      const marker = L.circleMarker([rep.location.lat, rep.location.lng], {
        radius: rep.severity === 'alta' ? 10 : 8,
        fillColor: color,
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9
      });

      marker.bindPopup(`
        <div class="p-2 space-y-1 text-stone-800 text-xs">
          <span class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full ${rep.severity === 'alta' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}">
            ${getIncidentLabel(rep.incidentType)}
          </span>
          <h4 class="font-bold text-sm text-stone-900 mt-1">${rep.address}</h4>
          <p class="text-stone-600">${rep.district} · Severidad ${rep.severity}</p>
          <p class="text-[11px] text-stone-500">${rep.description || 'Reporte vecinal'}</p>
        </div>
      `);
      state.markersLayer.addLayer(marker);
    });

  // Add Clean Points (Tachos caninos)
  state.cleanPoints
    .filter(cp => filter === 'all' || cp.district === filter)
    .forEach(cp => {
      const marker = L.circleMarker([cp.location.lat, cp.location.lng], {
        radius: 9,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.95
      });

      marker.bindPopup(`
        <div class="p-2 space-y-1 text-stone-800 text-xs">
          <span class="font-bold uppercase tracking-wider text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Punto Limpio Municipal
          </span>
          <h4 class="font-bold text-sm text-stone-900 mt-1">${cp.name}</h4>
          <p class="text-stone-600">${cp.district} · Tachos Caninos y Dispensador</p>
        </div>
      `);
      state.markersLayer.addLayer(marker);
    });
}

function filterMap(district) {
  state.activeMapFilter = district;
  
  const buttons = document.querySelectorAll('#map-filter-buttons button');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-district') === district) {
      btn.className = 'px-3.5 py-1.5 text-xs rounded-xl bg-mint-700 text-white font-bold shadow-sm transition';
    } else {
      btn.className = 'px-3.5 py-1.5 text-xs rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition';
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

// Live Fine Calculator
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
          ? 'bg-rose-950 border border-rose-500/50 text-rose-300 px-4 py-2 rounded-xl text-xs font-bold'
          : 'bg-mint-950 border border-mint-500/50 text-mint-300 px-4 py-2 rounded-xl text-xs font-bold';
      }
      if (ordinanceEl) ordinanceEl.textContent = `${data.ordinanceCode} · ${data.legalBasis}`;
    }
  } catch (error) {
    console.error('Error al calcular sanción:', error);
  }
}

// Render Reports Table in Fiscalization View
function renderReportsTable() {
  const tbody = document.getElementById('fiscal-table-body');
  if (!tbody) return;

  if (state.reports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-stone-400">No hay reportes registrados</td></tr>`;
    return;
  }

  tbody.innerHTML = state.reports.map(rep => {
    const severityBadge = {
      alta: 'bg-coral-100 text-coral-800 border-coral-200',
      media: 'bg-amber-100 text-amber-800 border-amber-200',
      baja: 'bg-mint-100 text-mint-800 border-mint-200'
    }[rep.severity] || 'bg-stone-100 text-stone-700';

    const statusBadge = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      in_investigation: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-mint-100 text-mint-800 border-mint-200',
      sanctioned: 'bg-purple-100 text-purple-800 border-purple-200'
    }[rep.status] || 'bg-stone-100 text-stone-700';

    const statusLabel = {
      pending: 'Pendiente',
      in_investigation: 'En Inspección',
      resolved: 'Atendido / Limpio',
      sanctioned: 'Sancionado'
    }[rep.status] || rep.status;

    return `
      <tr class="hover:bg-stone-50/80 transition">
        <td class="p-4 font-mono text-xs text-stone-400">${rep.id}</td>
        <td class="p-4 font-bold text-stone-900">${rep.district}</td>
        <td class="p-4">
          <div class="font-bold text-stone-800">${rep.address}</div>
          <div class="text-[11px] text-stone-500">${rep.description || 'Sin notas'}</div>
        </td>
        <td class="p-4 text-xs capitalize">${getIncidentLabel(rep.incidentType)}</td>
        <td class="p-4">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${severityBadge}">
            ${rep.severity}
          </span>
        </td>
        <td class="p-4">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusBadge}">
            ${statusLabel}
          </span>
        </td>
        <td class="p-4 text-right space-x-1">
          <button onclick="updateReportStatus('${rep.id}', 'in_investigation')" title="Marcar en investigación" class="p-2 rounded-xl bg-stone-100 hover:bg-blue-100 text-blue-700 transition text-xs">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <button onclick="updateReportStatus('${rep.id}', 'resolved')" title="Marcar atendido" class="p-2 rounded-xl bg-stone-100 hover:bg-mint-100 text-mint-700 transition text-xs">
            <i class="fa-solid fa-check"></i>
          </button>
          <button onclick="openSanctionModal('${rep.id}')" title="Emitir sanción" class="p-2 rounded-xl bg-stone-100 hover:bg-coral-100 text-coral-700 transition text-xs">
            <i class="fa-solid fa-gavel"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Update Report Status
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
      if (newStatus === 'resolved') triggerConfetti();
      showToast(`Estado del reporte ${reportId} actualizado a ${newStatus}`, 'success');
      const rep = state.reports.find(r => r.id === reportId);
      if (rep) rep.status = newStatus;
      refreshAllViews();
    } else {
      showToast(result.message || 'No autorizado', 'error');
    }
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    showToast('Error de red al actualizar reporte', 'error');
  }
}

// Sanction Modal Handlers
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
      triggerConfetti();
      showToast(`Acta de infracción ${result.data.ticketNumber} emitida exitosamente`, 'success');
      toggleSanctionModal(false);
      updateReportStatus(reportId, 'sanctioned');
    } else {
      showToast(result.message || 'Error al emitir sanción', 'error');
    }
  } catch (error) {
    console.error('Error al emitir sanción:', error);
    showToast('Error de red al emitir sanción', 'error');
  }
}

// Render Dashboard District Breakdown
function renderDashboardTable() {
  if (!state.stats) return;
  const districtTbody = document.getElementById('dashboard-district-body');
  if (districtTbody) {
    districtTbody.innerHTML = state.stats.districts.map(d => `
      <tr class="hover:bg-stone-50/80 transition">
        <td class="p-4 font-bold text-stone-900">${d.district}</td>
        <td class="p-4 text-stone-700">${d.totalReports}</td>
        <td class="p-4 text-mint-700 font-bold">${d.resolvedReports}</td>
        <td class="p-4">
          <div class="flex items-center gap-2">
            <div class="w-16 bg-stone-200 rounded-full h-2 overflow-hidden">
              <div class="bg-mint-600 h-2 rounded-full" style="width: ${d.resolutionRate}%"></div>
            </div>
            <span class="text-xs font-bold text-stone-700">${d.resolutionRate}%</span>
          </div>
        </td>
        <td class="p-4 text-stone-700 font-semibold">${d.petsRegistered}</td>
        <td class="p-4 text-stone-700 font-semibold">${d.cleanPointsCount}</td>
        <td class="p-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold ${d.sanitationScore >= 80 ? 'bg-mint-100 text-mint-900 border border-mint-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
            ${d.sanitationScore} / 100
          </span>
        </td>
      </tr>
    `).join('');
  }
}

// Initialize Bento Grid Charts with Chart.js
function initCharts() {
  const trendCanvas = document.getElementById('chart-trend');
  const typesCanvas = document.getElementById('chart-types');

  if (trendCanvas && !state.charts.trend) {
    state.charts.trend = new Chart(trendCanvas, {
      type: 'line',
      data: {
        labels: ['Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov'],
        datasets: [
          {
            label: 'Reportes Registrados',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: '#f43f5e',
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Focos Resueltos',
            data: [10, 16, 14, 22, 20, 26],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  if (typesCanvas && !state.charts.types) {
    state.charts.types = new Chart(typesCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Heces', 'Orina', 'Sueltos', 'Riesgo'],
        datasets: [{
          data: [2, 1, 1, 0],
          backgroundColor: ['#f43f5e', '#f59e0b', '#3b82f6', '#a855f7'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

function updateCharts() {
  if (state.charts.types && state.stats && state.stats.global.incidentBreakdown) {
    const b = state.stats.global.incidentBreakdown;
    state.charts.types.data.datasets[0].data = [
      b.heces_sin_recoger || 0,
      b.orina_fachada || 0,
      b.mascota_suelta || 0,
      b.maltrato || 0
    ];
    state.charts.types.update();
  }
}
