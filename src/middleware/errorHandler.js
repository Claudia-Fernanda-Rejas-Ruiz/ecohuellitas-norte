const errorHandler = (err, req, res, next) => {
  console.error('[Error Handler]', err);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Error interno del servidor en EcoHuellitas Norte.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
