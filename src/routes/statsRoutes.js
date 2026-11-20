const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/statsController');

router.get('/overview', StatsController.getOverviewMetrics);
router.get('/heatmap', StatsController.getHeatmapData);

module.exports = router;
