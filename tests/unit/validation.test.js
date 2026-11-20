const { validateDni, validateEmail, VALID_DISTRICTS } = require('../../src/middleware/validation');

describe('Unit Tests: Validation Helpers', () => {
  test('debe validar DNI de 8 dígitos numéricos correctamente', () => {
    expect(validateDni('72345678')).toBe(true);
    expect(validateDni('1234567')).toBe(false); // 7 digits
    expect(validateDni('123456789')).toBe(false); // 9 digits
    expect(validateDni('7234567A')).toBe(false); // with letters
  });

  test('debe validar formato de correo electrónico', () => {
    expect(validateEmail('vecino@gmail.com')).toBe(true);
    expect(validateEmail('claudia.rejas@usil.pe')).toBe(true);
    expect(validateEmail('correo-invalido')).toBe(false);
    expect(validateEmail('@dominio.com')).toBe(false);
  });

  test('debe contener los 4 distritos oficiales de Lima Norte', () => {
    expect(VALID_DISTRICTS).toEqual([
      'Los Olivos',
      'Comas',
      'San Martín de Porres',
      'Independencia'
    ]);
  });
});
