const db = require('../data/database');

class DistrictSanitationService {
  /**
   * Computes comprehensive sanitation metrics across Lima Norte districts
   */
  static getMetrics() {
    const districts = ['Los Olivos', 'Comas', 'San Martín de Porres', 'Independencia'];
    
    const totalReports = db.reports.length;
    const resolvedReports = db.reports.filter(r => r.status === 'atendido' || r.status === 'sancionado').length;
    const totalPets = db.pets.length;
    const totalFines = db.inspections.reduce((sum, i) => sum + (i.fineAmount || 0), 0);

    const districtBreakdown = districts.map(district => {
      const distReports = db.reports.filter(r => r.district === district);
      const distResolved = distReports.filter(r => r.status === 'atendido' || r.status === 'sancionado').length;
      const distPets = db.pets.filter(p => p.district === district).length;
      const distCleanPoints = db.cleanPoints.filter(cp => cp.district === district).length;
      const distInspections = db.inspections.filter(i => i.district === district);
      
      const resolutionRate = distReports.length > 0
        ? Math.round((distResolved / distReports.length) * 100)
        : 100;

      // Sanitation Index (0 to 100 score: higher is cleaner / better managed)
      // Combines high resolution rate, active clean points, and pet registration ratio
      const sanitationIndex = Math.min(100, Math.round(
        (resolutionRate * 0.5) + (distCleanPoints * 10) + (distPets * 5) - (distReports.length * 3) + 30
      ));

      return {
        district,
        totalReports: distReports.length,
        resolvedReports: distResolved,
        pendingReports: distReports.length - distResolved,
        resolutionRate: `${resolutionRate}%`,
        registeredPets: distPets,
        cleanPointsCount: distCleanPoints,
        inspectionsCount: distInspections.length,
        sanitationScore: Math.max(0, sanitationIndex)
      };
    });

    const incidentTypeBreakdown = {
      heces_sin_recoger: db.reports.filter(r => r.incidentType === 'heces_sin_recoger').length,
      orina_fachada: db.reports.filter(r => r.incidentType === 'orina_fachada').length,
      mascota_suelta: db.reports.filter(r => r.incidentType === 'mascota_suelta').length,
      maltrato: db.reports.filter(r => r.incidentType === 'maltrato').length
    };

    return {
      overview: {
        totalRegisteredPets: totalPets,
        totalCitizenReports: totalReports,
        totalResolvedReports: resolvedReports,
        globalResolutionRate: totalReports > 0 ? `${Math.round((resolvedReports / totalReports) * 100)}%` : '100%',
        totalFinesAccumulated: totalFines,
        totalCleanPoints: db.cleanPoints.length
      },
      districtBreakdown,
      incidentTypeBreakdown,
      lastUpdated: new Date().toISOString()
    };
  }
}

module.exports = DistrictSanitationService;
