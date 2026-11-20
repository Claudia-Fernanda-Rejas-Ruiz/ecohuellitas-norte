const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { validateRegister } = require('../middleware/validation');
const { verifyToken } = require('../middleware/auth');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', verifyToken, AuthController.getProfile);

module.exports = router;
