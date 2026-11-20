const FineCalculatorService = require('../../src/services/fineCalculatorService');

describe('Unit Tests: FineCalculatorService', () => {
  test('debe calcular la multa preventiva (5% UIT) para primera infracción en Los Olivos', () => {
    const res = FineCalculatorService.calculateFine('Los Olivos', 'no_recojo_heces', false);
    expect(res.district).toBe('Los Olivos');
    expect(res.isReincident).toBe(false);
    expect(res.fineAmount).toBe(257.50); // 5% of 5150
    expect(res.isPreventive).toBe(true);
    expect(res.ordinanceCode).toBe('ORD-MDLO-512-2023');
  });

  test('debe calcular la multa agravada (10% UIT) por reincidencia en Los Olivos', () => {
    const res = FineCalculatorService.calculateFine('Los Olivos', 'no_recojo_heces', true);
    expect(res.isReincident).toBe(true);
    expect(res.fineAmount).toBe(515.00); // 10% of 5150
    expect(res.isPreventive).toBe(false);
  });

  test('debe calcular la multa para Comas según su ordenanza específica', () => {
    const res = FineCalculatorService.calculateFine('Comas', 'no_recojo_heces', true);
    expect(res.district).toBe('Comas');
    expect(res.fineAmount).toBe(618.00); // 12% of 5150 in Comas
    expect(res.ordinanceCode).toBe('ORD-MDC-584-2023');
  });

  test('debe retornar la lista de distritos cubiertos de Lima Norte', () => {
    const dists = FineCalculatorService.getDistricts();
    expect(dists).toContain('Los Olivos');
    expect(dists).toContain('Comas');
    expect(dists).toContain('San Martín de Porres');
    expect(dists).toContain('Independencia');
  });
});
