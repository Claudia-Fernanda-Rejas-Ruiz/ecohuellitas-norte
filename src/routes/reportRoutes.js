const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController');
const { validateReport } = require('../middleware/validation');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', ReportController.getAllReports);
router.get('/:id', ReportController.getReportById);
router.post('/', validateReport, ReportController.createReport);
router.patch('/:id/status', verifyToken, requireRole('inspector', 'admin'), ReportController.updateReportStatus);

module.exports = router;
