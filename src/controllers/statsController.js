const DistrictSanitationService = require('../services/districtSanitationService');

class StatsController {
  static async getOverviewMetrics(req, res) {
    const metrics = DistrictSanitationService.getMetrics();
    return res.status(200).json({
      success: true,
      data: metrics
    });
  }

  static async getHeatmapData(req, res) {
    const db = require('../data/database');
    const points = db.reports.map(r => ({
      id: r.id,
      lat: r.latitude,
      lng: r.longitude,
      district: r.district,
      type: r.incidentType,
      severity: r.severity,
      weight: r.severity === 'alta' ? 1.0 : r.severity === 'media' ? 0.7 : 0.4,
      status: r.status,
      address: r.address,
      createdAt: r.createdAt
    }));

    return res.status(200).json({
      success: true,
      totalPoints: points.length,
      points
    });
  }
}

module.exports = StatsController;
