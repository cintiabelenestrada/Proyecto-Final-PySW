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

  if (usuarioEncontrado.activo !== true) {
    return res.status(400).json({ message: 'Usuario inactivo' });
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

authController.checkAuthStatus = async (req, res) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .json({ message: 'Necesita un token de autorización' });
  }
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const usuarioEncontrado = await usuarioModel.findOne({ _id: decoded.id });
    if (!usuarioEncontrado) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const { password: pass, ...usuarioSinPassword } = usuarioEncontrado._doc;
    const newToken = jwt.sign(
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
    const sesion = { usuario: usuarioSinPassword, token: newToken };

    res.json({ data: sesion });
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authController;
