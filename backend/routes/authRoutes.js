const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const { generateToken } = require('../config/jwt');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const user = await Usuario.create(req.body);
    res.status(201).json({ "mensaje":"Usuario creado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;
  
  try {
    const user = await Usuario.findOne({ where: { correo } });
    
    if (!user || !(await user.validarContrasena(contrasena))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = generateToken(user);
    res.json({ token });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me', authMiddleware.autenticar, async (req, res) => {
   
    
    try {
      
      res.json({ usuario: req.payload });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
module.exports = router;
