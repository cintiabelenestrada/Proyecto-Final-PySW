const express = require('express');
const cors = require('cors');
const mongoose = require('./database');
const jwt = require('jsonwebtoken');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No hay token de autorización' });
  }

  try {
    const tokenSinBearer = token.split(' ')[1];
    const payload = jwt.verify(
      tokenSinBearer,
      process.env.JWT_SEED || 'secret'
    );
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado' });
  }
};

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/novedades', require('./routes/novedades.route.js'));
app.use('/api/propietarios', require('./routes/propietarios.route.js'));
app.use('/api/alquileres', require('./routes/alquiler.route.js'));
app.use('api/locales', require('./routes/locales.route.js'));
//app.use('api/pagos', require('./routes/pagos.route.js'));

// Settings

app.set('port', process.env.PORT || 3000);

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server iniciado en puerto: ', app.get('port'));
});
