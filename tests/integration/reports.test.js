const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/data/database');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../src/middleware/auth');

describe('Integration Tests: Reports Endpoints', () => {
  let inspectorToken;

  beforeEach(() => {
    db.reset();
    inspectorToken = jwt.sign(
      { id: 'usr-2', email: 'carlos.mendoza@comas.gob.pe', name: 'Carlos Mendoza', role: 'inspector', district: 'Comas' },
      JWT_SECRET
    );
  });

  test('GET /api/reports - debe listar todos los reportes de puntos críticos', async () => {
    const res = await request(app).get('/api/reports');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.reports.length).toBeGreaterThanOrEqual(1);
  });

  test('POST /api/reports - debe crear un nuevo reporte con coordenadas válidas de Lima Norte', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({
        district: 'Los Olivos',
        address: 'Av. Carlos Izaguirre 1250',
        latitude: -11.9922,
        longitude: -77.0711,
        incidentType: 'heces_sin_recoger',
        severity: 'alta',
        description: 'Parque infantil lleno de heces caninas sin recoger.'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.report.district).toBe('Los Olivos');
    expect(res.body.report.status).toBe('pendiente');
  });

  test('PATCH /api/reports/:id/status - inspector debe poder actualizar estado del reporte', async () => {
    const res = await request(app)
      .patch('/api/reports/rep-1/status')
      .set('Authorization', `Bearer ${inspectorToken}`)
      .send({
        status: 'atendido',
        notes: 'Cuadrilla de limpieza municipal atendió la zona.'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.report.status).toBe('atendido');
  });
});
