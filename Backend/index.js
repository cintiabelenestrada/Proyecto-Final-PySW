const express = require('express');
const cors = require('cors');
const mongoose = require('./database');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const dotenv = require('dotenv');
const proxy = require('express-http-proxy');

// Dotenv config
dotenv.config();

const bodyParser = require('body-parser');


const app = express();

// Middlewares
app.use(express.json({limit : '50mb'}));
app.use(cors({ origin: 'http://localhost:4200'}));
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

// Proxy Middleware
app.use('/api/replicate', proxy('https://api.replicate.com', {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Authorization'] = `Token ${process.env.TOKEN_REPLICATE}`;
    proxyReqOpts.headers['Content-Type'] = 'application/json';
    return proxyReqOpts;
  },
  proxyReqPathResolver: (req) => {
    console.log("/v1"+req.url);
    return '/v1' + req.url;  // Rewrites /api/replicate to /v1
  }
}));


// Logger
app.use(logger('dev'));

// Routes

app.use('/api/roomGenerator', require('./routes/roomGenerator.routes.js'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/novedades', require('./routes/novedades.route.js'));
//app.use('/api/propietarios', require('./routes/propietario.route.js'));
app.use('/api/alquileres', require('./routes/alquiler.route.js'));
app.use('/api/locales', require('./routes/locales.route.js'));
app.use('/api/pagos', require('./routes/pagos.routes.js'));
app.use('/api/payments', require('./routes/payment.routes.js'));
app.use('/api/cuotas', require('./routes/cuota.routes.js'));

app.use(express.urlencoded({limit: '50mb', extended: true}));

// Settings

app.set('port', process.env.PORT || 3000);

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server iniciado en puerto: ', app.get('port'));
});

