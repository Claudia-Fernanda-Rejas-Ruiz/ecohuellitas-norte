const express = require('express');
const router = express.Router();
const PetController = require('../controllers/petController');
const { verifyToken } = require('../middleware/auth');

// Public verification for QR scanner
router.get('/verify/:code', PetController.verifyPetPublic);

// Authenticated operations
router.get('/', verifyToken, PetController.getAllPets);
router.get('/:id', verifyToken, PetController.getPetById);
router.post('/', verifyToken, PetController.registerPet);

module.exports = router;
