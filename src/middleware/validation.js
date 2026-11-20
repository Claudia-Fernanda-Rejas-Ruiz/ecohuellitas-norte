const VALID_DISTRICTS = ['Los Olivos', 'Comas', 'San Martín de Porres', 'Independencia'];

const validateDni = (dni) => {
  return /^[0-9]{8}$/.test(dni);
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateRegister = (req, res, next) => {
  const { dni, name, email, password, district } = req.body;

  if (!dni || !name || !email || !password || !district) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios (dni, name, email, password, district).'
    });
  }

  if (!validateDni(dni)) {
    return res.status(400).json({
      success: false,
      message: 'El DNI debe contener exactamente 8 dígitos numéricos.'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'El formato de correo electrónico no es válido.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 6 caracteres.'
    });
  }

  if (!VALID_DISTRICTS.includes(district)) {
    return res.status(400).json({
      success: false,
      message: `Distrito no válido. Debe ser uno de: ${VALID_DISTRICTS.join(', ')}.`
    });
  }

  next();
};

const validateReport = (req, res, next) => {
  const { district, address, incidentType, latitude, longitude } = req.body;

  if (!district || !address || !incidentType || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos para el reporte (district, address, incidentType, latitude, longitude).'
    });
  }

  if (!VALID_DISTRICTS.includes(district)) {
    return res.status(400).json({
      success: false,
      message: `El reporte debe pertenecer a Lima Norte: ${VALID_DISTRICTS.join(', ')}.`
    });
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  if (isNaN(lat) || isNaN(lng) || lat < -13 || lat > -11 || lng < -78 || lng > -76) {
    return res.status(400).json({
      success: false,
      message: 'Las coordenadas GPS proporcionadas se encuentran fuera del rango de Lima Norte.'
    });
  }

  next();
};

module.exports = {
  VALID_DISTRICTS,
  validateDni,
  validateEmail,
  validateRegister,
  validateReport
};
