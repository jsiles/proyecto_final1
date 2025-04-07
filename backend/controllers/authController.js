const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();

exports.registrar = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    const token = usuario.generarToken();
    
    res.status(201).json({ 
      usuario: usuario.toJSON(),
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;
  
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    
    if (!usuario || !usuario.validarContrasena(contrasena)) {
      throw new Error('Credenciales inválidas');
    }
    
    const token = usuario.generarToken();
    
    res.json({ 
      usuario: usuario.toJSON(),
      token 
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
