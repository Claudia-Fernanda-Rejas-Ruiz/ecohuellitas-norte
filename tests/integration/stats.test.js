const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/data/database');

describe('Integration Tests: Stats and Clean Points Endpoints', () => {
  beforeEach(() => {
    db.reset();
  });

  test('GET /api/stats/overview - debe retornar resumen de métricas e indicadores de salubridad', async () => {
    const res = await request(app).get('/api/stats/overview');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('overview');
    expect(res.body.data.districtBreakdown.length).toBe(4);
  });

  test('GET /api/stats/heatmap - debe retornar puntos georreferenciados para mapa de calor', async () => {
    const res = await request(app).get('/api/stats/heatmap');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.points.length).toBeGreaterThanOrEqual(1);
    expect(res.body.points[0]).toHaveProperty('lat');
    expect(res.body.points[0]).toHaveProperty('lng');
  });

  test('GET /api/clean-points - debe listar puntos limpios y tachos caninos', async () => {
    const res = await request(app).get('/api/clean-points');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.cleanPoints.length).toBeGreaterThanOrEqual(1);
  });
});
