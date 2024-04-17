import express from 'express';
import isAdmin from '../middleware/admin.middleware.js';
import verificationJWT from '../middleware/jwt.middleware.js';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/config.js';

const router = express.Router();

// Endpoint para generar un token manualmente
router.post('/generate', (req, res) => {
  // Datos del usuario administrador
  const adminUser = {
    id: '123456789',
    username: 'admin',
    role: 'admin'
  };

  // Generar el token
  const token = jwt.sign(adminUser, JWT_SECRET, { expiresIn: '1h' });
  
  res.status(200).json({ token });
});

// Ruta protegida que solo el administrador puede acceder
router.get('/', verificationJWT, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Bienvenido, Administrador' });
});

export default router;


