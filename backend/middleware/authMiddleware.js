const jwt = require('jsonwebtoken');

exports.autenticar = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Puedes agregar el usuario al request para usarlo en rutas protegidas
    console.log(JSON.stringify(decoded));
    req.payload = { id : decoded.id,
      nombre : decoded.nombre, 
      correo : decoded.correo,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
