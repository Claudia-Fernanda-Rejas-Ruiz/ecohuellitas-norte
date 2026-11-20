const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/data/database');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../src/middleware/auth');

describe('Integration Tests: Inspections Endpoints', () => {
  let inspectorToken;
  let citizenToken;

  beforeEach(() => {
    db.reset();
    inspectorToken = jwt.sign(
      { id: 'usr-2', email: 'carlos.mendoza@comas.gob.pe', name: 'Carlos Mendoza', role: 'inspector', district: 'Comas' },
      JWT_SECRET
    );
    citizenToken = jwt.sign(
      { id: 'usr-1', email: 'claudia.rejas@usil.pe', name: 'Claudia Rejas', role: 'citizen', district: 'Los Olivos' },
      JWT_SECRET
    );
  });

  test('GET /api/inspections/preview - debe previsualizar el cálculo de la multa sin autenticación', async () => {
    const res = await request(app)
      .get('/api/inspections/preview?district=Comas&infractionType=no_recojo_heces&isReincident=true');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.preview.fineAmount).toBe(618.00);
    expect(res.body.preview.ordinanceCode).toBe('ORD-MDC-584-2023');
  });

  test('POST /api/inspections - inspector debe poder emitir una sanción administrativa', async () => {
    const res = await request(app)
      .post('/api/inspections')
      .set('Authorization', `Bearer ${inspectorToken}`)
      .send({
        reportId: 'rep-1',
        infractorDni: '11223344',
        infractorName: 'Pedro Ramirez',
        district: 'Los Olivos',
        infractionType: 'no_recojo_heces',
        isReincident: true,
        observations: 'Infractor reincidente en el Parque Previ.'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.inspection.fineAmount).toBe(515.00);
    expect(res.body.inspection.actionType).toBe('multa');
  });

  test('POST /api/inspections - debe denegar acceso a rol citizen', async () => {
    const res = await request(app)
      .post('/api/inspections')
      .set('Authorization', `Bearer ${citizenToken}`)
      .send({
        infractorDni: '11223344',
        district: 'Los Olivos',
        infractionType: 'no_recojo_heces'
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
  });
});
