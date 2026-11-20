require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🐾 Servidor EcoHuellitas Norte iniciado exitosamente.`);
  console.log(`🌐 Acceso local: http://localhost:${PORT}`);
  console.log(`📍 Cobertura: Los Olivos | Comas | San Martín de Porres | Independencia`);
});
