const express = require('express');
const router = express.Router();
const InspectionController = require('../controllers/inspectionController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/preview', InspectionController.calculateFinePreview);
router.get('/', verifyToken, requireRole('inspector', 'admin'), InspectionController.getAllInspections);
router.post('/', verifyToken, requireRole('inspector', 'admin'), InspectionController.createInspection);

module.exports = router;
