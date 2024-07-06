const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/Usuario');
const SECRET_KEY = process.env.JWT_SEED || 'secret';

const authController = {};

authController.login = async (req, res) => {
  const { usuario, password } = req.body;

  const usuarioEncontrado = await usuarioModel.findOne({ usuario: usuario });

  if (!usuarioEncontrado) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  if (!bcrypt.compareSync(password, usuarioEncontrado.password)) {
    return res.status(400).json({ message: 'Credenciales incorrectas' });
  }

  const { password: pass, ...usuarioSinPassword } = usuarioEncontrado._doc;
  const token = jwt.sign(
    {
      id: usuarioEncontrado._id,
      usuario: usuarioEncontrado.usuario,
      perfil: usuarioEncontrado.perfil,
      iat: new Date().getTime(),
    },
    SECRET_KEY,
    {
      expiresIn: '1h',
    }
  );

  const sesion = { usuario: usuarioSinPassword, token };

  res.json({ data: sesion });
};

module.exports = authController;
