const { v4: uuidv4 } = require('uuid');
const db = require('../data/database');

class ReportController {
  static async getAllReports(req, res) {
    const { district, status, incidentType, severity } = req.query;
    let results = [...db.reports];

    if (district) {
      results = results.filter(r => r.district.toLowerCase() === district.toLowerCase());
    }

    if (status) {
      results = results.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }

    if (incidentType) {
      results = results.filter(r => r.incidentType.toLowerCase() === incidentType.toLowerCase());
    }

    if (severity) {
      results = results.filter(r => r.severity.toLowerCase() === severity.toLowerCase());
    }

    // Sort newest first
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return res.status(200).json({
      success: true,
      count: results.length,
      reports: results
    });
  }

  static async getReportById(req, res) {
    const { id } = req.params;
    const report = db.reports.find(r => r.id === id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Reporte de salubridad no encontrado.' });
    }

    return res.status(200).json({ success: true, report });
  }

  static async createReport(req, res) {
    const { district, address, latitude, longitude, incidentType, severity, description, photos } = req.body;

    const user = req.user ? (db.users.find(u => u.id === req.user.id) || req.user) : null;

    const newReport = {
      id: `rep-${uuidv4().substring(0, 8)}`,
      citizenId: user ? user.id : 'anonimo',
      citizenName: user ? user.name : 'Vecino de Lima Norte',
      district,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      incidentType: incidentType || 'heces_sin_recoger',
      severity: severity || 'media',
      description: description || 'Punto crítico de salubridad reportado por vecino.',
      status: 'pendiente',
      photos: Array.isArray(photos) ? photos : [],
      assignedInspector: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.reports.push(newReport);

    return res.status(201).json({
      success: true,
      message: 'Reporte ciudadano registrado exitosamente. Se ha notificado a fiscalización de Lima Norte.',
      report: newReport
    });
  }

  static async updateReportStatus(req, res) {
    const { id } = req.params;
    const { status, assignedInspector, notes } = req.body;

    const report = db.reports.find(r => r.id === id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Reporte no encontrado.' });
    }

    const validStatuses = ['pendiente', 'en_inspeccion', 'atendido', 'sancionado'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Estado no válido. Debe ser uno de: ${validStatuses.join(', ')}.`
      });
    }

    if (status) report.status = status;
    if (assignedInspector) report.assignedInspector = assignedInspector;
    if (notes) report.notes = notes;
    report.updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      message: `Reporte actualizado a estado '${report.status}'.`,
      report
    });
  }
}

module.exports = ReportController;
