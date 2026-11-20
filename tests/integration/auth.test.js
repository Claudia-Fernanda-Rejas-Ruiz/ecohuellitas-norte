const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/data/database');

describe('Integration Tests: Auth Endpoints', () => {
  beforeEach(() => {
    db.reset();
  });

  test('POST /api/auth/register - debe registrar un nuevo vecino exitosamente', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        dni: '88776655',
        name: 'Maria Sanchez',
        email: 'maria.sanchez@gmail.com',
        password: 'Password123!',
        district: 'Comas',
        address: 'Av. Tupac Amaru 4500',
        phone: '998877665'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.name).toBe('Maria Sanchez');
  });

  test('POST /api/auth/register - debe rechazar DNI con longitud incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        dni: '1234',
        name: 'Invalido',
        email: 'invalido@gmail.com',
        password: 'Password123!',
        district: 'Comas'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/auth/login - debe autenticar usuario válido y generar JWT', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'claudia.rejas@usil.pe',
        password: 'Password123!'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - debe rechazar contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'claudia.rejas@usil.pe',
        password: 'WrongPassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
