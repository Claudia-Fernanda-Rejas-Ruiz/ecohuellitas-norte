const db = require('../data/database');

class CleanPointController {
  static async getAll(req, res) {
    const { district, type } = req.query;
    let points = [...db.cleanPoints];

    if (district) {
      points = points.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }

    if (type) {
      points = points.filter(p => p.type.toLowerCase() === type.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      count: points.length,
      cleanPoints: points
    });
  }
}

module.exports = CleanPointController;
