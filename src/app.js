const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const petRoutes = require('./routes/petRoutes');
const reportRoutes = require('./routes/reportRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const statsRoutes = require('./routes/statsRoutes');
const cleanPointRoutes = require('./routes/cleanPointRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security: Helmet HTTP Headers with CSP adjusted for CDN scripts/styles (Leaflet, Tailwind, FontAwesome)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com', 'https://unpkg.com', 'https://cdnjs.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
        fontSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'https://nominatim.openstreetmap.org', 'https://unpkg.com']
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// CORS configuration
app.use(cors());

// Rate limiting for API security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente en 15 minutos.'
  }
});
app.use('/api/', limiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static frontend assets
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    app: 'EcoHuellitas Norte API',
    version: '1.0.0',
    districtsCovered: ['Los Olivos', 'Comas', 'San Martín de Porres', 'Independencia'],
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/clean-points', cleanPointRoutes);

// Fallback to SPA for any other route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'Endpoint no encontrado.' });
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
