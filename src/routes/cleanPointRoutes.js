const express = require('express');
const router = express.Router();
const CleanPointController = require('../controllers/cleanPointController');

router.get('/', CleanPointController.getAll);

module.exports = router;
