const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/data/database');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../src/middleware/auth');

describe('Integration Tests: Pets Endpoints', () => {
  let citizenToken;

  beforeEach(() => {
    db.reset();
    citizenToken = jwt.sign(
      { id: 'usr-1', email: 'claudia.rejas@usil.pe', name: 'Claudia Rejas', district: 'Los Olivos', role: 'citizen' },
      JWT_SECRET
    );
  });

  test('GET /api/pets - debe listar mascotas del usuario autenticado', async () => {
    const res = await request(app)
      .get('/api/pets')
      .set('Authorization', `Bearer ${citizenToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.pets)).toBe(true);
  });

  test('POST /api/pets - debe registrar una nueva mascota y generar su código QR', async () => {
    const res = await request(app)
      .post('/api/pets')
      .set('Authorization', `Bearer ${citizenToken}`)
      .send({
        name: 'Toby',
        species: 'canino',
        breed: 'Beagle',
        size: 'mediano',
        gender: 'macho',
        birthYear: 2021,
        rabiesVaccine: true,
        vaccineDate: '2026-04-10',
        sterilized: true
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.pet.code).toMatch(/^EHN-LO-\d+$/);
    expect(res.body.pet).toHaveProperty('qrImage');
  });

  test('GET /api/pets/verify/:code - debe permitir verificación pública de mascota por QR', async () => {
    const res = await request(app).get('/api/pets/verify/EHN-LO-001');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.verification.name).toBe('Rocky');
    expect(res.body.verification.species).toBe('canino');
  });
});
