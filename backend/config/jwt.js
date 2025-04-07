const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, nombre : usuario.nombre, correo: usuario.correo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
