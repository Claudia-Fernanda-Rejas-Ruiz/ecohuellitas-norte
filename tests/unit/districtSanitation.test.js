const DistrictSanitationService = require('../../src/services/districtSanitationService');
const db = require('../../src/data/database');

describe('Unit Tests: DistrictSanitationService', () => {
  beforeEach(() => {
    db.reset();
  });

  test('debe retornar resumen global y desglose para los 4 distritos', () => {
    const metrics = DistrictSanitationService.getMetrics();
    expect(metrics).toHaveProperty('overview');
    expect(metrics).toHaveProperty('districtBreakdown');
    expect(metrics).toHaveProperty('incidentTypeBreakdown');
    expect(metrics.districtBreakdown.length).toBe(4);

    const losOlivos = metrics.districtBreakdown.find(d => d.district === 'Los Olivos');
    expect(losOlivos).toBeDefined();
    expect(losOlivos.sanitationScore).toBeGreaterThanOrEqual(0);
  });
});
