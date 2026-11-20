const { v4: uuidv4 } = require('uuid');
const db = require('../data/database');
const FineCalculatorService = require('../services/fineCalculatorService');

class InspectionController {
  static async getAllInspections(req, res) {
    const { district, status, actionType } = req.query;
    let results = [...db.inspections];

    if (district) {
      results = results.filter(i => i.district.toLowerCase() === district.toLowerCase());
    }

    if (status) {
      results = results.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }

    if (actionType) {
      results = results.filter(i => i.actionType.toLowerCase() === actionType.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      inspections: results
    });
  }

  static async createInspection(req, res) {
    const { reportId, infractorDni, infractorName, district, infractionType, isReincident, observations } = req.body;

    if (!infractorDni || !district || !infractionType) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios (infractorDni, district, infractionType).'
      });
    }

    const fineData = FineCalculatorService.calculateFine(district, infractionType, Boolean(isReincident));

    const inspector = req.user ? (db.users.find(u => u.id === req.user.id) || req.user) : { id: 'usr-2', name: 'Carlos Mendoza' };

    const newInspection = {
      id: `insp-${uuidv4().substring(0, 8)}`,
      reportId: reportId || null,
      inspectorId: inspector.id,
      inspectorName: inspector.name,
      infractorDni,
      infractorName: infractorName || 'Ciudadano Notificado',
      district,
      ordinanceCode: fineData.ordinanceCode,
      ordinanceName: fineData.ordinanceName,
      infractionType: fineData.infractionType,
      actionType: fineData.isPreventive ? 'notificacion_preventiva' : 'multa',
      fineAmount: fineData.fineAmount,
      uitPercentage: fineData.uitPercentage,
      status: 'emitida',
      observations: observations || 'Intervención de fiscalización en vía pública según ordenanza municipal.',
      createdAt: new Date().toISOString()
    };

    db.inspections.push(newInspection);

    // If reportId was provided, update report status
    if (reportId) {
      const rep = db.reports.find(r => r.id === reportId);
      if (rep) {
        rep.status = fineData.isPreventive ? 'atendido' : 'sancionado';
        rep.updatedAt = new Date().toISOString();
      }
    }

    return res.status(201).json({
      success: true,
      message: fineData.isPreventive
        ? 'Notificación preventiva emitida con éxito.'
        : `Sanción municipal emitida por ${fineData.uitPercentage} (S/ ${fineData.fineAmount.toFixed(2)}).`,
      inspection: newInspection
    });
  }

  static async calculateFinePreview(req, res) {
    const { district, infractionType, isReincident } = req.query;
    if (!district || !infractionType) {
      return res.status(400).json({
        success: false,
        message: 'Debe especificar district e infractionType en la consulta.'
      });
    }

    const result = FineCalculatorService.calculateFine(district, infractionType, isReincident === 'true');
    return res.status(200).json({ success: true, preview: result });
  }
}

module.exports = InspectionController;
