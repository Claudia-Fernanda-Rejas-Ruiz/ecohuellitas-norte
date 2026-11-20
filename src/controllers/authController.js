const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/database');
const { JWT_SECRET } = require('../middleware/auth');

class AuthController {
  static async register(req, res) {
    const { dni, name, email, password, district, address, phone, role } = req.body;

    const existingUser = db.users.find(u => u.email === email || u.dni === dni);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'El DNI o correo electrónico ya se encuentra registrado.'
      });
    }

    const newUser = {
      id: `usr-${uuidv4().substring(0, 8)}`,
      dni,
      name,
      email,
      passwordHash: await bcrypt.hash(password, 8),
      district,
      address: address || '',
      phone: phone || '',
      role: role && ['citizen', 'inspector', 'admin'].includes(role) ? role : 'citizen',
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, district: newUser.district, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente en EcoHuellitas Norte.',
      token,
      user: {
        id: newUser.id,
        dni: newUser.dni,
        name: newUser.name,
        email: newUser.email,
        district: newUser.district,
        role: newUser.role
      }
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Debe ingresar correo y contraseña.'
      });
    }

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, district: user.district, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user.id,
        dni: user.dni,
        name: user.name,
        email: user.email,
        district: user.district,
        role: user.role
      }
    });
  }

  static async getProfile(req, res) {
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        dni: user.dni,
        name: user.name,
        email: user.email,
        district: user.district,
        address: user.address,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  }
}

module.exports = AuthController;
