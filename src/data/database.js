// In-Memory Data Store with initial data for Lima Norte districts
const bcrypt = require('bcryptjs');

const initialUsers = [
  {
    id: 'usr-1',
    dni: '72345678',
    name: 'Claudia Rejas',
    email: 'claudia.rejas@usil.pe',
    passwordHash: bcrypt.hashSync('Password123!', 8),
    district: 'Los Olivos',
    address: 'Av. Las Palmeras 3820, Los Olivos',
    phone: '987654321',
    role: 'citizen',
    createdAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'usr-2',
    dni: '45678901',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@comas.gob.pe',
    passwordHash: bcrypt.hashSync('Fiscal123!', 8),
    district: 'Comas',
    address: 'Av. Universitaria 7200, Comas',
    phone: '976543210',
    role: 'inspector',
    createdAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'usr-3',
    dni: '10293847',
    name: 'Rosa Palacios',
    email: 'rosa.palacios@smp.gob.pe',
    passwordHash: bcrypt.hashSync('Supervisor123!', 8),
    district: 'San Martín de Porres',
    address: 'Av. Habich 450, SMP',
    phone: '965432109',
    role: 'admin',
    createdAt: '2026-11-01T10:00:00.000Z'
  }
];

const initialPets = [
  {
    id: 'pet-1',
    ownerId: 'usr-1',
    ownerName: 'Claudia Rejas',
    ownerDni: '72345678',
    ownerPhone: '987654321',
    code: 'EHN-LO-001',
    name: 'Rocky',
    species: 'canino',
    breed: 'Golden Retriever',
    size: 'grande',
    gender: 'macho',
    color: 'Dorado',
    birthYear: 2022,
    rabiesVaccine: true,
    vaccineDate: '2026-05-10',
    sterilized: true,
    district: 'Los Olivos',
    status: 'activo',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    qrCodeData: 'https://ecohuellitas.limanorte.pe/verify/EHN-LO-001',
    createdAt: '2026-11-02T11:00:00.000Z'
  },
  {
    id: 'pet-2',
    ownerId: 'usr-1',
    ownerName: 'Claudia Rejas',
    ownerDni: '72345678',
    ownerPhone: '987654321',
    code: 'EHN-LO-002',
    name: 'Luna',
    species: 'felino',
    breed: 'Siamés',
    size: 'pequeño',
    gender: 'hembra',
    color: 'Blanco y café',
    birthYear: 2023,
    rabiesVaccine: true,
    vaccineDate: '2026-06-15',
    sterilized: true,
    district: 'Los Olivos',
    status: 'activo',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    qrCodeData: 'https://ecohuellitas.limanorte.pe/verify/EHN-LO-002',
    createdAt: '2026-11-02T11:30:00.000Z'
  }
];

const initialReports = [
  {
    id: 'rep-1',
    citizenId: 'usr-1',
    citizenName: 'Claudia Rejas',
    district: 'Los Olivos',
    address: 'Parque Previ, Jr. Mercurio con Los Alisos',
    latitude: -11.9892,
    longitude: -77.0691,
    incidentType: 'heces_sin_recoger', // heces_sin_recoger | orina_fachada | mascota_suelta | maltrato
    severity: 'alta', // baja | media | alta
    description: 'Acumulación de heces de mascotas en la vereda lateral del parque infantil. Zona concurrida por niños.',
    status: 'en_inspeccion', // pendiente | en_inspeccion | atendido | sancionado
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80'
    ],
    assignedInspector: 'Carlos Mendoza',
    createdAt: '2026-11-10T14:30:00.000Z',
    updatedAt: '2026-11-12T09:15:00.000Z'
  },
  {
    id: 'rep-2',
    citizenId: 'usr-1',
    citizenName: 'Claudia Rejas',
    district: 'Comas',
    address: 'Av. Túpac Amaru Km 11, Parada San Carlos',
    latitude: -11.9354,
    longitude: -77.0456,
    incidentType: 'mascota_suelta',
    severity: 'media',
    description: 'Perros grandes sueltos sin correa en berma central haciendo necesidades en área verde.',
    status: 'pendiente',
    photos: [],
    assignedInspector: null,
    createdAt: '2026-11-14T16:00:00.000Z',
    updatedAt: '2026-11-14T16:00:00.000Z'
  },
  {
    id: 'rep-3',
    citizenId: 'usr-1',
    citizenName: 'Claudia Rejas',
    district: 'San Martín de Porres',
    address: 'Av. Perú cdra 24, esquina Jr. Callao',
    latitude: -12.0298,
    longitude: -77.0782,
    incidentType: 'orina_fachada',
    severity: 'alta',
    description: 'Deterioro severo de fachada y malos olores constantes por orina de mascotas sin limpieza por parte del dueño.',
    status: 'atendido',
    photos: [],
    assignedInspector: 'Rosa Palacios',
    createdAt: '2026-11-05T08:20:00.000Z',
    updatedAt: '2026-11-08T11:00:00.000Z'
  },
  {
    id: 'rep-4',
    citizenId: 'usr-1',
    citizenName: 'Claudia Rejas',
    district: 'Independencia',
    address: 'Jr. Tahuantinsuyo con Av. Túpac Amaru',
    latitude: -11.9965,
    longitude: -77.0521,
    incidentType: 'heces_sin_recoger',
    severity: 'media',
    description: 'Veredas sucias con heces secas sin recojo.',
    status: 'sancionado',
    photos: [],
    assignedInspector: 'Carlos Mendoza',
    createdAt: '2026-11-01T12:00:00.000Z',
    updatedAt: '2026-11-04T15:30:00.000Z'
  }
];

const initialInspections = [
  {
    id: 'insp-1',
    reportId: 'rep-4',
    inspectorId: 'usr-2',
    inspectorName: 'Carlos Mendoza',
    infractorDni: '09876543',
    infractorName: 'Juan Pérez Alva',
    district: 'Independencia',
    ordinanceCode: 'ORD-MDI-312-2024',
    infractionType: 'reincidencia_no_recojo_heces',
    actionType: 'multa', // notificacion_preventiva | multa | compromiso
    fineAmount: 515.00, // 10% UIT (UIT 2026 ~ 5150)
    uitPercentage: '10% UIT',
    status: 'emitida',
    observations: 'Infractor reincidente. Se levantó acta con registro fotográfico.',
    createdAt: '2026-11-04T15:30:00.000Z'
  }
];

const initialCleanPoints = [
  {
    id: 'cp-1',
    name: 'Punto Limpio Parque Previ',
    type: 'tacho_canino',
    district: 'Los Olivos',
    address: 'Jr. Mercurio con Los Alisos',
    latitude: -11.9890,
    longitude: -77.0690,
    hasBags: true,
    status: 'operativo'
  },
  {
    id: 'cp-2',
    name: 'Veterinaria Municipal Los Olivos',
    type: 'veterinaria_municipal',
    district: 'Los Olivos',
    address: 'Av. Antúnez de Mayolo 830',
    latitude: -11.9950,
    longitude: -77.0720,
    services: ['Vacunación antirrábica', 'Esterilización', 'Empadronamiento'],
    status: 'operativo'
  },
  {
    id: 'cp-3',
    name: 'Tacho Canino Parque Zonal Sinchi Roca',
    type: 'tacho_canino',
    district: 'Comas',
    address: 'Av. Universitaria s/n',
    latitude: -11.9300,
    longitude: -77.0500,
    hasBags: true,
    status: 'operativo'
  },
  {
    id: 'cp-4',
    name: 'Punto Limpio Plaza de Armas SMP',
    type: 'tacho_canino',
    district: 'San Martín de Porres',
    address: 'Av. Habich con Jr. Salaverry',
    latitude: -12.0250,
    longitude: -77.0600,
    hasBags: false,
    status: 'mantenimiento'
  },
  {
    id: 'cp-5',
    name: 'Centro Canino Municipal Independencia',
    type: 'veterinaria_municipal',
    district: 'Independencia',
    address: 'Av. Túpac Amaru 3800',
    latitude: -11.9920,
    longitude: -77.0550,
    services: ['Vacunación', 'Registro', 'Desparasitación'],
    status: 'operativo'
  }
];

class Database {
  constructor() {
    this.reset();
  }

  reset() {
    this.users = JSON.parse(JSON.stringify(initialUsers));
    this.pets = JSON.parse(JSON.stringify(initialPets));
    this.reports = JSON.parse(JSON.stringify(initialReports));
    this.inspections = JSON.parse(JSON.stringify(initialInspections));
    this.cleanPoints = JSON.parse(JSON.stringify(initialCleanPoints));
  }
}

const db = new Database();
module.exports = db;
