/**
 * EcoHuellitas Norte - Capa de Datos Mock Aislada
 * Persistencia en localStorage con soporte para migrar a API REST real.
 */

const STORAGE_KEYS = {
  PETS: 'ehn_pets_data',
  REPORTS: 'ehn_reports_data',
  CLEAN_POINTS: 'ehn_clean_points_data',
  USERS: 'ehn_users_data',
  AUDIT_LOGS: 'ehn_audit_logs_data',
  INSPECTIONS: 'ehn_inspections_data'
};

export const UIT_2026 = 5350.00;

export const DISTRICT_ORDINANCES = {
  'Los Olivos': {
    ordinanceNumber: 'Ordenanza N° 512-CDLO / MDLO',
    fineFirstOffensePercent: 0.05,
    fineFirstOffenseAmount: 267.50,
    fineRepeatPercent: 0.10,
    fineRepeatAmount: 535.00,
    sanitationIndex: 82.5,
    activePatrols: 6,
    cleanPointsCount: 4
  },
  'Comas': {
    ordinanceNumber: 'Ordenanza N° 580-MDC',
    fineFirstOffensePercent: 0.06,
    fineFirstOffenseAmount: 321.00,
    fineRepeatPercent: 0.12,
    fineRepeatAmount: 642.00,
    sanitationIndex: 74.0,
    activePatrols: 5,
    cleanPointsCount: 3
  },
  'San Martín de Porres': {
    ordinanceNumber: 'Ordenanza N° 498-MDSMP',
    fineFirstOffensePercent: 0.05,
    fineFirstOffenseAmount: 267.50,
    fineRepeatPercent: 0.10,
    fineRepeatAmount: 535.00,
    sanitationIndex: 71.8,
    activePatrols: 7,
    cleanPointsCount: 4
  },
  'Independencia': {
    ordinanceNumber: 'Ordenanza N° 415-MDI',
    fineFirstOffensePercent: 0.04,
    fineFirstOffenseAmount: 214.00,
    fineRepeatPercent: 0.08,
    fineRepeatAmount: 428.00,
    sanitationIndex: 78.2,
    activePatrols: 4,
    cleanPointsCount: 2
  }
};

export const MOCK_USERS = [
  {
    id: 'user-001',
    name: 'Claudia Rejas',
    email: 'claudia.rejas@gmail.com',
    role: 'citizen',
    district: 'Los Olivos',
    dni: '74839201',
    phone: '987654321',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    registeredPetsCount: 2,
    onboardingCompleted: true
  },
  {
    id: 'user-002',
    name: 'Carlos Mendoza',
    email: 'inspector.olivos@munilosolivos.gob.pe',
    role: 'inspector',
    district: 'Los Olivos',
    dni: '45678912',
    badgeNumber: 'INSP-LO-402',
    phone: '912345678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    onboardingCompleted: true
  },
  {
    id: 'user-003',
    name: 'Mariana Quispe',
    email: 'inspector.comas@municomas.gob.pe',
    role: 'inspector',
    district: 'Comas',
    dni: '46891234',
    badgeNumber: 'INSP-COM-115',
    phone: '923456789',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    onboardingCompleted: true
  },
  {
    id: 'user-004',
    name: 'Ing. Roberto Silva',
    email: 'admin.salubridad@limanorte.gob.pe',
    role: 'admin',
    district: 'Los Olivos',
    dni: '10293847',
    badgeNumber: 'DIR-AMB-01',
    phone: '934567890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    onboardingCompleted: true
  }
];

export const INITIAL_PETS = [
  {
    id: 'pet-001',
    name: 'Rocky',
    species: 'canino',
    breed: 'Golden Retriever',
    gender: 'Macho',
    ageYears: 3,
    color: 'Dorado',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    registrationCode: 'EHN-LO-2026-0081',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-LO-2026-0081',
    district: 'Los Olivos',
    address: 'Av. Antúnez de Mayolo 1240',
    ownerId: 'user-001',
    ownerName: 'Claudia Rejas',
    ownerDni: '74839201',
    ownerPhone: '987654321',
    rabiesVaccine: true,
    vaccineDate: '2026-01-15',
    sterilized: true,
    microchip: '981098102938475',
    dangerousBreed: false,
    registeredAt: '2026-01-20T10:30:00Z'
  },
  {
    id: 'pet-002',
    name: 'Luna',
    species: 'canino',
    breed: 'Siberian Husky',
    gender: 'Hembra',
    ageYears: 2,
    color: 'Gris y Blanco',
    photoUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&q=80',
    registrationCode: 'EHN-LO-2026-0082',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-LO-2026-0082',
    district: 'Los Olivos',
    address: 'Av. Antúnez de Mayolo 1240',
    ownerId: 'user-001',
    ownerName: 'Claudia Rejas',
    ownerDni: '74839201',
    ownerPhone: '987654321',
    rabiesVaccine: true,
    vaccineDate: '2026-02-01',
    sterilized: false,
    microchip: '981098102938476',
    dangerousBreed: false,
    registeredAt: '2026-02-05T14:15:00Z'
  },
  {
    id: 'pet-003',
    name: 'Thor',
    species: 'canino',
    breed: 'Rottweiler',
    gender: 'Macho',
    ageYears: 4,
    color: 'Negro y Fuego',
    photoUrl: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600&q=80',
    registrationCode: 'EHN-COM-2026-0120',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-COM-2026-0120',
    district: 'Comas',
    address: 'Av. Túpac Amaru 3450',
    ownerId: 'user-010',
    ownerName: 'Jorge Alarcón',
    ownerDni: '41238901',
    ownerPhone: '981122334',
    rabiesVaccine: true,
    vaccineDate: '2025-11-20',
    sterilized: true,
    microchip: '981098102938111',
    dangerousBreed: true,
    registeredAt: '2026-01-10T09:00:00Z'
  },
  {
    id: 'pet-004',
    name: 'Milo',
    species: 'canino',
    breed: 'Mestizo',
    gender: 'Macho',
    ageYears: 1,
    color: 'Caramelo',
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
    registrationCode: 'EHN-SMP-2026-0045',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-SMP-2026-0045',
    district: 'San Martín de Porres',
    address: 'Av. Perú 2100',
    ownerId: 'user-011',
    ownerName: 'Lucía Benítez',
    ownerDni: '48291034',
    ownerPhone: '976543210',
    rabiesVaccine: true,
    vaccineDate: '2026-01-18',
    sterilized: true,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-01-22T11:45:00Z'
  },
  {
    id: 'pet-005',
    name: 'Canela',
    species: 'canino',
    breed: 'Cocker Spaniel',
    gender: 'Hembra',
    ageYears: 5,
    color: 'Canela claro',
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    registrationCode: 'EHN-IND-2026-0029',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-IND-2026-0029',
    district: 'Independencia',
    address: 'Av. Carlos Izaguirre 680',
    ownerId: 'user-012',
    ownerName: 'Renzo Paredes',
    ownerDni: '44901283',
    ownerPhone: '954321098',
    rabiesVaccine: true,
    vaccineDate: '2025-10-14',
    sterilized: true,
    microchip: '981098102938222',
    dangerousBreed: false,
    registeredAt: '2026-01-15T15:20:00Z'
  },
  {
    id: 'pet-006',
    name: 'Boby',
    species: 'canino',
    breed: 'Schnauzer Miniatura',
    gender: 'Macho',
    ageYears: 2,
    color: 'Sal y Pimienta',
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    registrationCode: 'EHN-LO-2026-0083',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-LO-2026-0083',
    district: 'Los Olivos',
    address: 'Jr. Los Claveles 430, Urb. Covida',
    ownerId: 'user-013',
    ownerName: 'Rosa Valdivia',
    ownerDni: '47891230',
    ownerPhone: '943210987',
    rabiesVaccine: true,
    vaccineDate: '2026-02-10',
    sterilized: false,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-02-11T12:00:00Z'
  },
  {
    id: 'pet-007',
    name: 'Kira',
    species: 'canino',
    breed: 'Pitbull Terrier',
    gender: 'Hembra',
    ageYears: 3,
    color: 'Atigrado',
    photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80',
    registrationCode: 'EHN-COM-2026-0121',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-COM-2026-0121',
    district: 'Comas',
    address: 'Av. Universitaria 6500',
    ownerId: 'user-014',
    ownerName: 'Víctor Morales',
    ownerDni: '42318976',
    ownerPhone: '932109876',
    rabiesVaccine: true,
    vaccineDate: '2025-12-05',
    sterilized: true,
    microchip: '981098102938333',
    dangerousBreed: true,
    registeredAt: '2026-01-28T16:40:00Z'
  },
  {
    id: 'pet-008',
    name: 'Simba',
    species: 'felino',
    breed: 'Europeo Común',
    gender: 'Macho',
    ageYears: 2,
    color: 'Naranja atigrado',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    registrationCode: 'EHN-SMP-2026-0046',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-SMP-2026-0046',
    district: 'San Martín de Porres',
    address: 'Av. Habich 340',
    ownerId: 'user-015',
    ownerName: 'Andrea Navarro',
    ownerDni: '49812376',
    ownerPhone: '921098765',
    rabiesVaccine: true,
    vaccineDate: '2026-01-08',
    sterilized: true,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-01-12T10:10:00Z'
  },
  {
    id: 'pet-009',
    name: 'Max',
    species: 'canino',
    breed: 'Pastor Alemán',
    gender: 'Macho',
    ageYears: 5,
    color: 'Negro y Fuego',
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
    registrationCode: 'EHN-IND-2026-0030',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-IND-2026-0030',
    district: 'Independencia',
    address: 'Jr. Tahuantinsuyo 1120',
    ownerId: 'user-016',
    ownerName: 'Dante Huamán',
    ownerDni: '43981245',
    ownerPhone: '910987654',
    rabiesVaccine: true,
    vaccineDate: '2025-09-22',
    sterilized: false,
    microchip: '981098102938444',
    dangerousBreed: false,
    registeredAt: '2026-01-05T08:30:00Z'
  },
  {
    id: 'pet-010',
    name: 'Pelusa',
    species: 'canino',
    breed: 'Poodle Toy',
    gender: 'Hembra',
    ageYears: 4,
    color: 'Blanco',
    photoUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80',
    registrationCode: 'EHN-LO-2026-0084',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-LO-2026-0084',
    district: 'Los Olivos',
    address: 'Av. Las Palmeras 3890',
    ownerId: 'user-017',
    ownerName: 'Elena Carrasco',
    ownerDni: '46781290',
    ownerPhone: '909876543',
    rabiesVaccine: true,
    vaccineDate: '2026-02-14',
    sterilized: true,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-02-15T17:00:00Z'
  },
  {
    id: 'pet-011',
    name: 'Zeus',
    species: 'canino',
    breed: 'Dóberman',
    gender: 'Macho',
    ageYears: 3,
    color: 'Negro y Óxido',
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80',
    registrationCode: 'EHN-COM-2026-0122',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-COM-2026-0122',
    district: 'Comas',
    address: 'Av. Belaúnde Oeste 450',
    ownerId: 'user-018',
    ownerName: 'Manuel Ríos',
    ownerDni: '41890234',
    ownerPhone: '998877665',
    rabiesVaccine: true,
    vaccineDate: '2025-11-30',
    sterilized: true,
    microchip: '981098102938555',
    dangerousBreed: true,
    registeredAt: '2026-01-19T13:20:00Z'
  },
  {
    id: 'pet-012',
    name: 'Maya',
    species: 'canino',
    breed: 'Border Collie',
    gender: 'Hembra',
    ageYears: 2,
    color: 'Negro y Blanco',
    photoUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&q=80',
    registrationCode: 'EHN-SMP-2026-0047',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-SMP-2026-0047',
    district: 'San Martín de Porres',
    address: 'Av. José Granda 1520',
    ownerId: 'user-019',
    ownerName: 'Valeria Castro',
    ownerDni: '45091823',
    ownerPhone: '987766554',
    rabiesVaccine: true,
    vaccineDate: '2026-01-25',
    sterilized: true,
    microchip: '981098102938666',
    dangerousBreed: false,
    registeredAt: '2026-01-26T09:40:00Z'
  },
  {
    id: 'pet-013',
    name: 'Bruno',
    species: 'canino',
    breed: 'Bulldog Francés',
    gender: 'Macho',
    ageYears: 1,
    color: 'Atigrado oscuro',
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80',
    registrationCode: 'EHN-LO-2026-0085',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-LO-2026-0085',
    district: 'Los Olivos',
    address: 'Av. Carlos Izaguirre 1180',
    ownerId: 'user-020',
    ownerName: 'Fiorella Espinoza',
    ownerDni: '47182904',
    ownerPhone: '976655443',
    rabiesVaccine: true,
    vaccineDate: '2026-02-08',
    sterilized: false,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-02-09T14:50:00Z'
  },
  {
    id: 'pet-014',
    name: 'Toby',
    species: 'canino',
    breed: 'Beagle',
    gender: 'Macho',
    ageYears: 3,
    color: 'Tricolor',
    photoUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&q=80',
    registrationCode: 'EHN-IND-2026-0031',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-IND-2026-0031',
    district: 'Independencia',
    address: 'Av. Túpac Amaru 4200',
    ownerId: 'user-021',
    ownerName: 'Gabriel Soria',
    ownerDni: '43890123',
    ownerPhone: '965544332',
    rabiesVaccine: true,
    vaccineDate: '2025-10-29',
    sterilized: true,
    microchip: '981098102938777',
    dangerousBreed: false,
    registeredAt: '2026-01-07T11:10:00Z'
  },
  {
    id: 'pet-015',
    name: 'Coqueta',
    species: 'canino',
    breed: 'Mestizo Shih Tzu',
    gender: 'Hembra',
    ageYears: 4,
    color: 'Blanco y Miel',
    photoUrl: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&q=80',
    registrationCode: 'EHN-SMP-2026-0048',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=EHN-SMP-2026-0048',
    district: 'San Martín de Porres',
    address: 'Av. Lima 850',
    ownerId: 'user-022',
    ownerName: 'Carla Mendoza',
    ownerDni: '49012837',
    ownerPhone: '954433221',
    rabiesVaccine: true,
    vaccineDate: '2026-01-30',
    sterilized: true,
    microchip: null,
    dangerousBreed: false,
    registeredAt: '2026-01-31T16:00:00Z'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-001',
    title: 'Heces caninas sin recoger en Parque Central',
    incidentType: 'heces_sin_recoger',
    district: 'Los Olivos',
    address: 'Parque Central de Covida, Calle Los Naranjos cdra 3',
    coordinates: { lat: -11.9922, lng: -77.0708 },
    photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    description: 'Varios dueños pasean a sus perros temprano y no recogen los desechos en la zona de juegos infantiles.',
    status: 'pending',
    priority: 'alta',
    citizenId: 'user-001',
    citizenName: 'Claudia Rejas',
    assignedInspectorId: null,
    assignedInspectorName: null,
    createdAt: '2026-02-18T08:15:00Z',
    updatedAt: '2026-02-18T08:15:00Z',
    timeline: [
      { id: 'tl-1', action: 'Reporte registrado por ciudadano', user: 'Claudia Rejas', timestamp: '2026-02-18T08:15:00Z', comment: 'Evidencia fotográfica adjuntada con geolocalización.' }
    ]
  },
  {
    id: 'rep-002',
    title: 'Orina recurrente en esquina comercial',
    incidentType: 'orina_fachada',
    district: 'Los Olivos',
    address: 'Av. Antúnez de Mayolo 1250, frente a banco',
    coordinates: { lat: -11.9940, lng: -77.0690 },
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    description: 'Olores fétidos permanentes en fachada comercial por orina constante de mascotas sin limpieza.',
    status: 'in_progress',
    priority: 'media',
    citizenId: 'user-001',
    citizenName: 'Claudia Rejas',
    assignedInspectorId: 'user-002',
    assignedInspectorName: 'Carlos Mendoza',
    createdAt: '2026-02-17T11:30:00Z',
    updatedAt: '2026-02-18T09:00:00Z',
    timeline: [
      { id: 'tl-2', action: 'Reporte registrado', user: 'Claudia Rejas', timestamp: '2026-02-17T11:30:00Z', comment: 'Reporte ingresado.' },
      { id: 'tl-3', action: 'Asignado a cuadrilla de fiscalización', user: 'Carlos Mendoza', timestamp: '2026-02-18T09:00:00Z', comment: 'Cuadrilla de desinfección y serenos en ruta.' }
    ]
  },
  {
    id: 'rep-003',
    title: 'Perro suelto sin correa ni bozal en alameda',
    incidentType: 'mascota_suelta',
    district: 'Comas',
    address: 'Alameda Túpac Amaru km 11',
    coordinates: { lat: -11.9355, lng: -77.0540 },
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
    description: 'Can de raza grande suelto asusta a transeúntes y ciclistas cerca de paradero.',
    status: 'reviewing',
    priority: 'alta',
    citizenId: 'user-010',
    citizenName: 'Jorge Alarcón',
    assignedInspectorId: 'user-003',
    assignedInspectorName: 'Mariana Quispe',
    createdAt: '2026-02-18T07:45:00Z',
    updatedAt: '2026-02-18T08:30:00Z',
    timeline: [
      { id: 'tl-4', action: 'Reporte ciudadano', user: 'Jorge Alarcón', timestamp: '2026-02-18T07:45:00Z', comment: 'Alerta de seguridad vecinal.' },
      { id: 'tl-5', action: 'En revisión por inspector', user: 'Mariana Quispe', timestamp: '2026-02-18T08:30:00Z', comment: 'Se coordina patrullaje integrado con serenazgo.' }
    ]
  },
  {
    id: 'rep-004',
    title: 'Acumulación de heces en parque Fray Bartolomé',
    incidentType: 'heces_sin_recoger',
    district: 'San Martín de Porres',
    address: 'Parque Fray Bartolomé de las Casas, cdra 2',
    coordinates: { lat: -12.0160, lng: -77.0580 },
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
    description: 'Área verde deteriorada por falta de recojo cívico. Vecinos solicitan tacho canino.',
    status: 'resolved',
    priority: 'media',
    citizenId: 'user-011',
    citizenName: 'Lucía Benítez',
    assignedInspectorId: 'user-004',
    assignedInspectorName: 'Ing. Roberto Silva',
    createdAt: '2026-02-16T14:20:00Z',
    updatedAt: '2026-02-17T16:00:00Z',
    timeline: [
      { id: 'tl-6', action: 'Reporte registrado', user: 'Lucía Benítez', timestamp: '2026-02-16T14:20:00Z', comment: 'Foco de salubridad.' },
      { id: 'tl-7', action: 'Atención completada', user: 'Ing. Roberto Silva', timestamp: '2026-02-17T16:00:00Z', comment: 'Cuadrilla limpió el parque e instaló cartel informativo de ordenanza N° 498-MDSMP.' }
    ]
  },
  {
    id: 'rep-005',
    title: 'Mascota agresiva sin supervisión en pasaje',
    incidentType: 'mascota_suelta',
    district: 'Independencia',
    address: 'Pasaje Los Libertadores 140, Ermitaño Bajo',
    coordinates: { lat: -11.9880, lng: -77.0490 },
    photoUrl: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600&q=80',
    description: 'Perro raza potencialmente peligrosa suelto en la puerta del pasaje sin bozal.',
    status: 'in_progress',
    priority: 'alta',
    citizenId: 'user-012',
    citizenName: 'Renzo Paredes',
    assignedInspectorId: 'user-002',
    assignedInspectorName: 'Carlos Mendoza',
    createdAt: '2026-02-18T06:30:00Z',
    updatedAt: '2026-02-18T07:15:00Z',
    timeline: [
      { id: 'tl-8', action: 'Alerta vecinal urgente', user: 'Renzo Paredes', timestamp: '2026-02-18T06:30:00Z', comment: 'Riesgo de mordedura.' }
    ]
  },
  {
    id: 'rep-006',
    title: 'Desechos biológicos en frontis de colegio',
    incidentType: 'heces_sin_recoger',
    district: 'Los Olivos',
    address: 'Jr. Huandoy con Av. Marañón',
    coordinates: { lat: -11.9680, lng: -77.0720 },
    photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    description: 'Suciedad en vereda donde transitan escolares todos los días a las 7:30 am.',
    status: 'resolved',
    priority: 'alta',
    citizenId: 'user-013',
    citizenName: 'Rosa Valdivia',
    assignedInspectorId: 'user-002',
    assignedInspectorName: 'Carlos Mendoza',
    createdAt: '2026-02-15T07:10:00Z',
    updatedAt: '2026-02-16T11:00:00Z',
    timeline: [
      { id: 'tl-9', action: 'Reportado', user: 'Rosa Valdivia', timestamp: '2026-02-15T07:10:00Z', comment: 'Zona escolar.' },
      { id: 'tl-10', action: 'Limpieza y sensibilización realizada', user: 'Carlos Mendoza', timestamp: '2026-02-16T11:00:00Z', comment: 'Intervención de serenazgo ambiental y recojo total.' }
    ]
  },
  {
    id: 'rep-007',
    title: 'Heces caninas en berma central de Universitaria',
    incidentType: 'heces_sin_recoger',
    district: 'Comas',
    address: 'Av. Universitaria con Av. San Felipe',
    coordinates: { lat: -11.9210, lng: -77.0480 },
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    description: 'Berma central utilizada como botadero canino por dueños irresponsables en la noche.',
    status: 'pending',
    priority: 'media',
    citizenId: 'user-014',
    citizenName: 'Víctor Morales',
    assignedInspectorId: null,
    assignedInspectorName: null,
    createdAt: '2026-02-18T09:10:00Z',
    updatedAt: '2026-02-18T09:10:00Z',
    timeline: [
      { id: 'tl-11', action: 'Reporte registrado', user: 'Víctor Morales', timestamp: '2026-02-18T09:10:00Z', comment: 'Solicitan fiscalización nocturna.' }
    ]
  },
  {
    id: 'rep-008',
    title: 'Orina ácida en rejas de parque zonal',
    incidentType: 'orina_fachada',
    district: 'San Martín de Porres',
    address: 'Av. Canta Callao con Av. Dominicos',
    coordinates: { lat: -12.0020, lng: -77.0910 },
    photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    description: 'Corrosión y mal olor en estructuras metálicas del perímetro del parque.',
    status: 'reviewing',
    priority: 'baja',
    citizenId: 'user-015',
    citizenName: 'Andrea Navarro',
    assignedInspectorId: 'user-004',
    assignedInspectorName: 'Ing. Roberto Silva',
    createdAt: '2026-02-17T16:40:00Z',
    updatedAt: '2026-02-18T08:00:00Z',
    timeline: [
      { id: 'tl-12', action: 'Ingreso', user: 'Andrea Navarro', timestamp: '2026-02-17T16:40:00Z', comment: 'Daño a mobiliario urbano.' }
    ]
  },
  {
    id: 'rep-009',
    title: 'Perros abandonados en terreno descampado',
    incidentType: 'maltrato',
    district: 'Independencia',
    address: 'Av. Chinchaysuyo cdra 8, zona alta',
    coordinates: { lat: -11.9790, lng: -77.0390 },
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
    description: 'Cachorros en aparente desnutrición sin agua ni techo.',
    status: 'in_progress',
    priority: 'alta',
    citizenId: 'user-016',
    citizenName: 'Dante Huamán',
    assignedInspectorId: 'user-003',
    assignedInspectorName: 'Mariana Quispe',
    createdAt: '2026-02-18T06:00:00Z',
    updatedAt: '2026-02-18T07:30:00Z',
    timeline: [
      { id: 'tl-13', action: 'Reporte de bienestar animal', user: 'Dante Huamán', timestamp: '2026-02-18T06:00:00Z', comment: 'Rescate preventivo coordinado con veterinaria municipal.' }
    ]
  },
  {
    id: 'rep-010',
    title: 'Heces constantes en Parque Santa Rosa',
    incidentType: 'heces_sin_recoger',
    district: 'Los Olivos',
    address: 'Parque Santa Rosa, Urb. Mercurio',
    coordinates: { lat: -11.9860, lng: -77.0750 },
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
    description: 'Vecinos de la zona sacan hasta 4 perros a la vez sin bolsas higiénicas.',
    status: 'resolved',
    priority: 'media',
    citizenId: 'user-017',
    citizenName: 'Elena Carrasco',
    assignedInspectorId: 'user-002',
    assignedInspectorName: 'Carlos Mendoza',
    createdAt: '2026-02-14T10:00:00Z',
    updatedAt: '2026-02-15T15:00:00Z',
    timeline: [
      { id: 'tl-14', action: 'Reportado', user: 'Elena Carrasco', timestamp: '2026-02-14T10:00:00Z', comment: 'Vecinos organizados.' },
      { id: 'tl-15', action: 'Sanción preventiva emitida', user: 'Carlos Mendoza', timestamp: '2026-02-15T15:00:00Z', comment: 'Se notificó a 2 propietarios infractores bajo ordenanza 512-CDLO.' }
    ]
  },
  // Additional realistic reports for data richness
  {
    id: 'rep-011',
    title: 'Orina en puerta de botica comunitaria',
    incidentType: 'orina_fachada',
    district: 'Comas',
    address: 'Av. México con Av. Túpac Amaru',
    coordinates: { lat: -11.9480, lng: -77.0510 },
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    description: 'Afecta la salubridad de un establecimiento farmacéutico.',
    status: 'pending',
    priority: 'media',
    citizenId: 'user-018',
    citizenName: 'Manuel Ríos',
    assignedInspectorId: null,
    assignedInspectorName: null,
    createdAt: '2026-02-17T18:00:00Z',
    updatedAt: '2026-02-17T18:00:00Z',
    timeline: [{ id: 'tl-16', action: 'Creado', user: 'Manuel Ríos', timestamp: '2026-02-17T18:00:00Z', comment: 'Pendiente de asignación.' }]
  },
  {
    id: 'rep-012',
    title: 'Suciedad canina en losa deportiva comunal',
    incidentType: 'heces_sin_recoger',
    district: 'San Martín de Porres',
    address: 'Losa Deportiva San Germán, cdra 4',
    coordinates: { lat: -12.0220, lng: -77.0650 },
    photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
    description: 'Niños juegan fútbol sobre restos fecales secos de perros.',
    status: 'in_progress',
    priority: 'alta',
    citizenId: 'user-019',
    citizenName: 'Valeria Castro',
    assignedInspectorId: 'user-004',
    assignedInspectorName: 'Ing. Roberto Silva',
    createdAt: '2026-02-18T05:30:00Z',
    updatedAt: '2026-02-18T08:00:00Z',
    timeline: [{ id: 'tl-17', action: 'En limpieza programada', user: 'Ing. Roberto Silva', timestamp: '2026-02-18T08:00:00Z', comment: 'Lavado con agua a presión e hipoclorito.' }]
  },
  {
    id: 'rep-013',
    title: 'Manada de 5 perros sueltos en mercado',
    incidentType: 'mascota_suelta',
    district: 'Independencia',
    address: 'Mercado Central de Tahuantinsuyo',
    coordinates: { lat: -11.9830, lng: -77.0420 },
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
    description: 'Peleas de perros y riesgo a clientes que llevan bolsas de comida.',
    status: 'reviewing',
    priority: 'alta',
    citizenId: 'user-020',
    citizenName: 'Fiorella Espinoza',
    assignedInspectorId: 'user-003',
    assignedInspectorName: 'Mariana Quispe',
    createdAt: '2026-02-18T06:50:00Z',
    updatedAt: '2026-02-18T07:40:00Z',
    timeline: [{ id: 'tl-18', action: 'Evaluación veterinaria municipal', user: 'Mariana Quispe', timestamp: '2026-02-18T07:40:00Z', comment: 'Captura humanitaria y chequeo de chips.' }]
  },
  {
    id: 'rep-014',
    title: 'Heces acumuladas en bulevar peatonal',
    incidentType: 'heces_sin_recoger',
    district: 'Los Olivos',
    address: 'Bulevar Los Olivos, Jr. Manuel Gonzales Prada',
    coordinates: { lat: -11.9960, lng: -77.0670 },
    photoUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
    description: 'El bulevar gastronómico se ve afectado por excrementos en las jardineras.',
    status: 'resolved',
    priority: 'alta',
    citizenId: 'user-021',
    citizenName: 'Gabriel Soria',
    assignedInspectorId: 'user-002',
    assignedInspectorName: 'Carlos Mendoza',
    createdAt: '2026-02-13T12:00:00Z',
    updatedAt: '2026-02-14T10:00:00Z',
    timeline: [{ id: 'tl-19', action: 'Resuelto', user: 'Carlos Mendoza', timestamp: '2026-02-14T10:00:00Z', comment: 'Desinfección total y cámaras de seguridad activadas.' }]
  },
  {
    id: 'rep-015',
    title: 'Orina en paradero de transporte público',
    incidentType: 'orina_fachada',
    district: 'Comas',
    address: 'Paradero La Pascana, Av. Túpac Amaru',
    coordinates: { lat: -11.9280, lng: -77.0500 },
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    description: 'Pasajeros no pueden esperar sentados por el hedor persistente.',
    status: 'pending',
    priority: 'media',
    citizenId: 'user-022',
    citizenName: 'Carla Mendoza',
    assignedInspectorId: null,
    assignedInspectorName: null,
    createdAt: '2026-02-18T08:40:00Z',
    updatedAt: '2026-02-18T08:40:00Z',
    timeline: [{ id: 'tl-20', action: 'Registrado', user: 'Carla Mendoza', timestamp: '2026-02-18T08:40:00Z', comment: 'Esperando cuadrilla nocturna.' }]
  },
  {
    id: 'rep-016',
    title: 'Perro pitbull sin bozal atacó a otra mascota',
    incidentType: 'mascota_suelta',
    district: 'San Martín de Porres',
    address: 'Parque Ecológico San Martín, Av. Mayolo',
    coordinates: { lat: -12.0080, lng: -77.0780 },
    photoUrl: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=600&q=80',
    description: 'Dueño se negó a colocar bozal. Se requiere intervención de fiscalización y policía.',
    status: 'resolved',
    priority: 'alta',
    citizenId: 'user-001',
    citizenName: 'Claudia Rejas',
    assignedInspectorId: 'user-004',
    assignedInspectorName: 'Ing. Roberto Silva',
    createdAt: '2026-02-12T15:30:00Z',
    updatedAt: '2026-02-13T18:00:00Z',
    timeline: [{ id: 'tl-21', action: 'Multa aplicada', user: 'Ing. Roberto Silva', timestamp: '2026-02-13T18:00:00Z', comment: 'Sanción de 10% UIT aplicada bajo ordenanza 498-MDSMP.' }]
  },
  // Adding more mock reports to ensure 40+ records
  ...Array.from({ length: 25 }).map((_, i) => {
    const districts = ['Los Olivos', 'Comas', 'San Martín de Porres', 'Independencia'];
    const types = ['heces_sin_recoger', 'orina_fachada', 'mascota_suelta', 'maltrato'];
    const statuses = ['pending', 'reviewing', 'in_progress', 'resolved'];
    const d = districts[i % 4];
    const t = types[i % 4];
    const s = statuses[i % 4];
    const idNum = 17 + i;
    const baseCoords = {
      'Los Olivos': { lat: -11.99 + (i * 0.002), lng: -77.07 + (i * 0.001) },
      'Comas': { lat: -11.93 + (i * 0.002), lng: -77.05 + (i * 0.001) },
      'San Martín de Porres': { lat: -12.01 + (i * 0.002), lng: -77.07 + (i * 0.001) },
      'Independencia': { lat: -11.98 + (i * 0.002), lng: -77.04 + (i * 0.001) }
    };
    return {
      id: `rep-0${idNum}`,
      title: `Incidente urbano de ${t === 'heces_sin_recoger' ? 'heces' : t === 'orina_fachada' ? 'orina' : 'mascota'} en sector ${i + 1}`,
      incidentType: t,
      district: d,
      address: `Sector vecinal ${i + 1}, ${d}`,
      coordinates: baseCoords[d],
      photoUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80',
      description: `Reporte de salubridad y convivencia vecinal generado por ciudadano en ${d}.`,
      status: s,
      priority: i % 3 === 0 ? 'alta' : 'media',
      citizenId: `user-0${(i % 10) + 1}`,
      citizenName: `Vecino Vigilante ${i + 1}`,
      assignedInspectorId: s !== 'pending' ? 'user-002' : null,
      assignedInspectorName: s !== 'pending' ? 'Carlos Mendoza' : null,
      createdAt: `2026-02-${String(10 + (i % 8)).padStart(2, '0')}T${String(8 + (i % 10)).padStart(2, '0')}:00:00Z`,
      updatedAt: `2026-02-${String(10 + (i % 8)).padStart(2, '0')}T${String(10 + (i % 10)).padStart(2, '0')}:00:00Z`,
      timeline: [
        { id: `tl-gen-${i}`, action: 'Registro inicial', user: `Vecino Vigilante ${i + 1}`, timestamp: `2026-02-12T10:00:00Z`, comment: 'Registro ingresado en plataforma.' }
      ]
    };
  })
];

export const INITIAL_CLEAN_POINTS = [
  { id: 'cp-01', name: 'Tacho Canino Parque Central Covida', district: 'Los Olivos', address: 'Parque Central Covida', coordinates: { lat: -11.9930, lng: -77.0715 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 06:00' },
  { id: 'cp-02', name: 'Dispensador Ecológico Parque Santa Rosa', district: 'Los Olivos', address: 'Parque Santa Rosa, Mercurio', coordinates: { lat: -11.9865, lng: -77.0745 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 07:30' },
  { id: 'cp-03', name: 'Estación Canina Bulevar Los Olivos', district: 'Los Olivos', address: 'Jr. Manuel Gonzales Prada', coordinates: { lat: -11.9965, lng: -77.0665 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-17 19:00' },
  { id: 'cp-04', name: 'Punto Limpio Plaza Cívica Pro', district: 'Los Olivos', address: 'Av. Próceres de Huandoy', coordinates: { lat: -11.9675, lng: -77.0710 }, bagDispenser: false, status: 'operational', lastEmptied: '2026-02-18 05:45' },
  
  { id: 'cp-05', name: 'Tacho Canino Parque Zonal Sinchi Roca', district: 'Comas', address: 'Av. Universitaria con Av. Sangarará', coordinates: { lat: -11.9320, lng: -77.0515 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 06:15' },
  { id: 'cp-06', name: 'Estación de Limpieza Alameda Túpac Amaru', district: 'Comas', address: 'Túpac Amaru km 12', coordinates: { lat: -11.9250, lng: -77.0490 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-17 18:00' },
  { id: 'cp-07', name: 'Tacho Parque Manhattan', district: 'Comas', address: 'Jr. Manhattan 320, San Agustín', coordinates: { lat: -11.9410, lng: -77.0560 }, bagDispenser: false, status: 'needs_maintenance', lastEmptied: '2026-02-16 11:00' },
  
  { id: 'cp-08', name: 'Punto Canino Parque Fray Bartolomé', district: 'San Martín de Porres', address: 'Parque Fray Bartolomé cdra 2', coordinates: { lat: -12.0155, lng: -77.0585 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 07:00' },
  { id: 'cp-09', name: 'Dispensador Parque Ecológico Mayolo', district: 'San Martín de Porres', address: 'Av. Mayolo con Av. 12 de Octubre', coordinates: { lat: -12.0075, lng: -77.0775 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 06:45' },
  { id: 'cp-10', name: 'Tacho Canino Parque San Germán', district: 'San Martín de Porres', address: 'Jr. Germán Stiglich 450', coordinates: { lat: -12.0215, lng: -77.0645 }, bagDispenser: false, status: 'operational', lastEmptied: '2026-02-17 16:30' },
  
  { id: 'cp-11', name: 'Estación Canina Alameda Tahuantinsuyo', district: 'Independencia', address: 'Av. Tahuantinsuyo cdra 6', coordinates: { lat: -11.9825, lng: -77.0430 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 07:15' },
  { id: 'cp-12', name: 'Tacho Canino Plaza Cívica Independencia', district: 'Independencia', address: 'Av. Túpac Amaru km 4.5', coordinates: { lat: -11.9895, lng: -77.0505 }, bagDispenser: true, status: 'operational', lastEmptied: '2026-02-18 05:30' }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'log-01', user: 'Claudia Rejas', role: 'citizen', action: 'Registro de mascota', details: 'Empadronó a Rocky (EHN-LO-2026-0081)', timestamp: '2026-02-18T08:15:00Z' },
  { id: 'log-02', user: 'Carlos Mendoza', role: 'inspector', action: 'Actualización de estado', details: 'Cambió reporte #rep-002 a En Atención', timestamp: '2026-02-18T09:00:00Z' },
  { id: 'log-03', user: 'Ing. Roberto Silva', role: 'admin', action: 'Resolución de foco', details: 'Marcó #rep-004 como Resuelto en SMP', timestamp: '2026-02-17T16:00:00Z' },
  { id: 'log-04', user: 'Mariana Quispe', role: 'inspector', action: 'Inspección de campo', details: 'Fiscalizó alameda Túpac Amaru en Comas', timestamp: '2026-02-18T08:30:00Z' }
];

// Helper to initialize or retrieve from localStorage
function getStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

/**
 * Capa de API Unificada Mock
 */
export const api = {
  // === AUTENTICACIÓN & USUARIOS ===
  async getCurrentUser() {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    const activeUserId = localStorage.getItem('ehn_active_user_id') || 'user-001';
    return users.find(u => u.id === activeUserId) || users[0];
  },

  async login(email, password, asDemoRole = null) {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    let user;
    if (asDemoRole) {
      user = users.find(u => u.role === asDemoRole) || users[0];
    } else {
      user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user) {
      throw new Error('Credenciales inválidas. Comprueba tu correo o usa el modo Demo.');
    }

    localStorage.setItem('ehn_active_user_id', user.id);
    this.addAuditLog(user.name, user.role, 'Inicio de sesión', `Sesión iniciada en ${user.district}`);
    return user;
  },

  async registerUser(userData) {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    const newUser = {
      id: `user-${Date.now()}`,
      registeredPetsCount: 0,
      onboardingCompleted: true,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80`,
      ...userData
    };
    users.push(newUser);
    setStoredData(STORAGE_KEYS.USERS, users);
    localStorage.setItem('ehn_active_user_id', newUser.id);
    this.addAuditLog(newUser.name, newUser.role || 'citizen', 'Registro de nuevo usuario', `Usuario registrado en ${newUser.district}`);
    return newUser;
  },

  async updateUser(userId, patchData) {
    const users = getStoredData(STORAGE_KEYS.USERS, MOCK_USERS);
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('Usuario no encontrado');
    users[index] = { ...users[index], ...patchData };
    setStoredData(STORAGE_KEYS.USERS, users);
    return users[index];
  },

  // === MASCOTAS ===
  async getPets(filters = {}) {
    let pets = getStoredData(STORAGE_KEYS.PETS, INITIAL_PETS);
    if (filters.district && filters.district !== 'all') {
      pets = pets.filter(p => p.district === filters.district);
    }
    if (filters.ownerId) {
      pets = pets.filter(p => p.ownerId === filters.ownerId);
    }
    if (filters.species && filters.species !== 'all') {
      pets = pets.filter(p => p.species === filters.species);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      pets = pets.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.breed.toLowerCase().includes(q) || 
        p.registrationCode.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q)
      );
    }
    return pets;
  },

  async getPetById(id) {
    const pets = getStoredData(STORAGE_KEYS.PETS, INITIAL_PETS);
    const pet = pets.find(p => p.id === id || p.registrationCode === id);
    if (!pet) throw new Error('Mascota no encontrada en el padrón oficial.');
    return pet;
  },

  async createPet(petData) {
    const pets = getStoredData(STORAGE_KEYS.PETS, INITIAL_PETS);
    const districtPrefix = {
      'Los Olivos': 'LO',
      'Comas': 'COM',
      'San Martín de Porres': 'SMP',
      'Independencia': 'IND'
    }[petData.district] || 'LN';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `EHN-${districtPrefix}-2026-${randomNum}`;

    const newPet = {
      id: `pet-${Date.now()}`,
      registrationCode: code,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(code)}`,
      registeredAt: new Date().toISOString(),
      ...petData
    };

    pets.unshift(newPet);
    setStoredData(STORAGE_KEYS.PETS, pets);

    this.addAuditLog(petData.ownerName || 'Ciudadano', 'citizen', 'Empadronamiento de mascota', `Se emitió el carné digital ${code} para ${petData.name}`);
    return newPet;
  },

  async updatePet(id, updateData) {
    const pets = getStoredData(STORAGE_KEYS.PETS, INITIAL_PETS);
    const index = pets.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Mascota no encontrada');
    pets[index] = { ...pets[index], ...updateData, updatedAt: new Date().toISOString() };
    setStoredData(STORAGE_KEYS.PETS, pets);
    return pets[index];
  },

  async deletePet(id) {
    const pets = getStoredData(STORAGE_KEYS.PETS, INITIAL_PETS);
    const pet = pets.find(p => p.id === id);
    const filtered = pets.filter(p => p.id !== id);
    setStoredData(STORAGE_KEYS.PETS, filtered);
    if (pet) {
      this.addAuditLog('Sistema', 'citizen', 'Baja de mascota del padrón', `Se retiró el registro de ${pet.name} (${pet.registrationCode})`);
    }
    return { success: true, deletedPet: pet };
  },

  // === REPORTES DE SALUBRIDAD ===
  async getReports(filters = {}) {
    let reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);

    if (filters.district && filters.district !== 'all') {
      reports = reports.filter(r => r.district === filters.district);
    }
    if (filters.status && filters.status !== 'all') {
      reports = reports.filter(r => r.status === filters.status);
    }
    if (filters.incidentType && filters.incidentType !== 'all') {
      reports = reports.filter(r => r.incidentType === filters.incidentType);
    }
    if (filters.citizenId) {
      reports = reports.filter(r => r.citizenId === filters.citizenId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      reports = reports.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.address.toLowerCase().includes(q) || 
        r.description.toLowerCase().includes(q) ||
        r.citizenName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }

    // Ordenamiento por fecha descendente por defecto
    return reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getReportById(id) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const report = reports.find(r => r.id === id);
    if (!report) throw new Error('Reporte no encontrado');
    return report;
  },

  async createReport(reportData) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const newId = `rep-0${Math.floor(100 + Math.random() * 900)}`;

    const newReport = {
      id: newId,
      status: 'pending',
      priority: reportData.priority || 'media',
      assignedInspectorId: null,
      assignedInspectorName: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: `tl-${Date.now()}`,
          action: 'Reporte registrado por ciudadano',
          user: reportData.citizenName || 'Ciudadano',
          timestamp: new Date().toISOString(),
          comment: 'Evidencia georreferenciada enviada a fiscalización municipal.'
        }
      ],
      ...reportData
    };

    reports.unshift(newReport);
    setStoredData(STORAGE_KEYS.REPORTS, reports);

    this.addAuditLog(reportData.citizenName || 'Ciudadano', 'citizen', 'Reporte de punto crítico', `Nuevo foco ${newReport.incidentType} en ${newReport.district}`);
    return newReport;
  },

  async updateReportStatus(reportId, status, user, comment = '') {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const index = reports.findIndex(r => r.id === reportId);
    if (index === -1) throw new Error('Reporte no encontrado');

    const prevStatus = reports[index].status;
    reports[index].status = status;
    reports[index].updatedAt = new Date().toISOString();

    const statusLabels = {
      pending: 'Pendiente',
      reviewing: 'En revisión',
      in_progress: 'En atención',
      resolved: 'Resuelto',
      rejected: 'Desestimado'
    };

    reports[index].timeline.unshift({
      id: `tl-${Date.now()}`,
      action: `Cambio de estado a ${statusLabels[status] || status}`,
      user: user.name || 'Fiscalizador',
      timestamp: new Date().toISOString(),
      comment: comment || `Estado modificado desde el panel municipal (antes: ${statusLabels[prevStatus] || prevStatus}).`
    });

    setStoredData(STORAGE_KEYS.REPORTS, reports);
    this.addAuditLog(user.name || 'Fiscalizador', user.role || 'inspector', 'Actualización de reporte', `#${reportId} marcado como ${status}`);
    return reports[index];
  },

  async assignReportInspector(reportId, inspectorId, inspectorName, user) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const index = reports.findIndex(r => r.id === reportId);
    if (index === -1) throw new Error('Reporte no encontrado');

    reports[index].assignedInspectorId = inspectorId;
    reports[index].assignedInspectorName = inspectorName;
    if (reports[index].status === 'pending') {
      reports[index].status = 'reviewing';
    }
    reports[index].updatedAt = new Date().toISOString();

    reports[index].timeline.unshift({
      id: `tl-${Date.now()}`,
      action: `Asignado a inspector ${inspectorName}`,
      user: user.name || 'Administrador',
      timestamp: new Date().toISOString(),
      comment: `Asignación de patrullaje e inspección en campo.`
    });

    setStoredData(STORAGE_KEYS.REPORTS, reports);
    return reports[index];
  },

  async addReportComment(reportId, user, comment) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const index = reports.findIndex(r => r.id === reportId);
    if (index === -1) throw new Error('Reporte no encontrado');

    const newComment = {
      id: `tl-${Date.now()}`,
      action: 'Comentario interno / Actualización de campo',
      user: user.name,
      timestamp: new Date().toISOString(),
      comment
    };

    reports[index].timeline.unshift(newComment);
    reports[index].updatedAt = new Date().toISOString();
    setStoredData(STORAGE_KEYS.REPORTS, reports);
    return reports[index];
  },

  async deleteReport(reportId, user) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    const report = reports.find(r => r.id === reportId);
    const filtered = reports.filter(r => r.id !== reportId);
    setStoredData(STORAGE_KEYS.REPORTS, filtered);
    this.addAuditLog(user.name || 'Admin', user.role || 'admin', 'Eliminación de reporte', `Se eliminó el reporte #${reportId}`);
    return { success: true, deletedReport: report };
  },

  async bulkUpdateReports(reportIds, patchData, user) {
    const reports = getStoredData(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
    let updatedCount = 0;

    const newReports = reports.map(r => {
      if (reportIds.includes(r.id)) {
        updatedCount++;
        const updated = { ...r, ...patchData, updatedAt: new Date().toISOString() };
        if (patchData.status) {
          updated.timeline.unshift({
            id: `tl-${Date.now()}-${r.id}`,
            action: `Acción masiva: ${patchData.status}`,
            user: user.name,
            timestamp: new Date().toISOString(),
            comment: 'Actualizado mediante acción en lote desde el dashboard.'
          });
        }
        return updated;
      }
      return r;
    });

    setStoredData(STORAGE_KEYS.REPORTS, newReports);
    this.addAuditLog(user.name, user.role, 'Acción masiva en reportes', `Se actualizaron ${updatedCount} reportes simultáneamente`);
    return { updatedCount, reports: newReports };
  },

  // === PUNTOS LIMPIOS & MAPAS ===
  async getCleanPoints(district = 'all') {
    let points = getStoredData(STORAGE_KEYS.CLEAN_POINTS, INITIAL_CLEAN_POINTS);
    if (district && district !== 'all') {
      points = points.filter(p => p.district === district);
    }
    return points;
  },

  async createCleanPoint(pointData) {
    const points = getStoredData(STORAGE_KEYS.CLEAN_POINTS, INITIAL_CLEAN_POINTS);
    const newPoint = {
      id: `cp-${Date.now()}`,
      status: 'operational',
      lastEmptied: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ...pointData
    };
    points.push(newPoint);
    setStoredData(STORAGE_KEYS.CLEAN_POINTS, points);
    return newPoint;
  },

  // === SANCIONES & CALCULADORA NORMATIVA ===
  calculateFine(district, isRepeat = false, incidentType = 'heces_sin_recoger') {
    const ord = DISTRICT_ORDINANCES[district] || DISTRICT_ORDINANCES['Los Olivos'];
    const percentage = isRepeat ? ord.fineRepeatPercent : ord.fineFirstOffensePercent;
    const amount = UIT_2026 * percentage;

    let legalRef = ord.ordinanceNumber;
    let description = `Infracción por ${incidentType === 'heces_sin_recoger' ? 'no recoger heces en vía pública' : incidentType === 'orina_fachada' ? 'permitir orina en fachadas sin limpieza' : 'pasear mascota suelta sin correa ni bozal'}`;

    return {
      district,
      isRepeat,
      uitBase: UIT_2026,
      finePercentage: percentage * 100,
      fineAmount: amount,
      formattedAmount: `S/ ${amount.toFixed(2)}`,
      ordinanceNumber: legalRef,
      description
    };
  },

  // === RESUMEN Y ESTADÍSTICAS DEL DASHBOARD ===
  async getDashboardStats(district = 'all') {
    const reports = await this.getReports({ district });
    const pets = await this.getPets({ district });
    const cleanPoints = await this.getCleanPoints(district);

    const totalReports = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const reviewing = reports.filter(r => r.status === 'reviewing').length;
    const inProgress = reports.filter(r => r.status === 'in_progress').length;
    const resolved = reports.filter(r => r.status === 'resolved').length;
    const resolutionRate = totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0;

    // Conteo por tipo
    const byType = {
      heces_sin_recoger: reports.filter(r => r.incidentType === 'heces_sin_recoger').length,
      orina_fachada: reports.filter(r => r.incidentType === 'orina_fachada').length,
      mascota_suelta: reports.filter(r => r.incidentType === 'mascota_suelta').length,
      maltrato: reports.filter(r => r.incidentType === 'maltrato').length
    };

    // Conteo por distrito
    const byDistrict = {
      'Los Olivos': reports.filter(r => r.district === 'Los Olivos').length,
      'Comas': reports.filter(r => r.district === 'Comas').length,
      'San Martín de Porres': reports.filter(r => r.district === 'San Martín de Porres').length,
      'Independencia': reports.filter(r => r.district === 'Independencia').length
    };

    // Tendencia mensual mock para gráficos
    const monthlyTrend = [
      { month: 'Sep 25', reports: 18, resolved: 14, pets: 45 },
      { month: 'Oct 25', reports: 24, resolved: 19, pets: 62 },
      { month: 'Nov 25', reports: 31, resolved: 25, pets: 88 },
      { month: 'Dic 25', reports: 28, resolved: 24, pets: 110 },
      { month: 'Ene 26', reports: 36, resolved: 30, pets: 142 },
      { month: 'Feb 26', reports: totalReports, resolved: resolved, pets: pets.length }
    ];

    return {
      kpis: {
        totalPets: pets.length,
        totalReports,
        pending,
        reviewing,
        inProgress,
        resolved,
        resolutionRate,
        totalCleanPoints: cleanPoints.length,
        activePatrols: 22
      },
      byType,
      byDistrict,
      monthlyTrend,
      ordinances: DISTRICT_ORDINANCES
    };
  },

  // === AUDITORÍA & LOGS ===
  getAuditLogs() {
    return getStoredData(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  addAuditLog(user, role, action, details) {
    const logs = getStoredData(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    logs.unshift({
      id: `log-${Date.now()}`,
      user,
      role,
      action,
      details,
      timestamp: new Date().toISOString()
    });
    setStoredData(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 50));
  },

  // === EXPORTACIÓN CSV REAL ===
  async exportReportsCSV(district = 'all') {
    const reports = await this.getReports({ district });
    const headers = ['ID', 'Titulo', 'Tipo', 'Distrito', 'Direccion', 'Estado', 'Prioridad', 'Ciudadano', 'Inspector', 'Fecha_Creacion'];
    
    const rows = reports.map(r => [
      r.id,
      `"${r.title.replace(/"/g, '""')}"`,
      r.incidentType,
      r.district,
      `"${r.address.replace(/"/g, '""')}"`,
      r.status,
      r.priority,
      `"${r.citizenName.replace(/"/g, '""')}"`,
      `"${(r.assignedInspectorName || 'Sin asignar').replace(/"/g, '""')}"`,
      r.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `reportes_salubridad_lima_norte_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return { success: true, count: reports.length };
  },

  // === REINICIAR A DATOS POR DEFECTO ===
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PETS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.CLEAN_POINTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem('ehn_active_user_id');
    window.location.reload();
  }
};
