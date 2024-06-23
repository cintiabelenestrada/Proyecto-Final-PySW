const express = require('express');
const cors = require('cors');
const mongoose = require('./database');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes

//app.use('/api/usuarios', require('./routes/usuarios.route.js'));
//app.use('/api/novedades', require('./routes/novedades.route.js'));
app.use('/api/propietarios', require('./routes/propietario.route.js'));
//app.use('api/alquileres', require('./routes/alquileres.route.js'));
//app.use('api/locales', require('./routes/locales.route.js'));
//app.use('api/pagos', require('./routes/pagos.route.js'));

// Settings

app.set('port', process.env.PORT || 3000);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server iniciado en puerto: ', app.get('port'));
});