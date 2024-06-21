const usuarioModel = require('../models/Usuario');
const usuarioController = {};

const bcrypt = require('bcrypt');

usuarioController.find = async (req, res) => {
  const usuarios = await usuarioModel.find();

  const usuariosSinPassword = usuarios.map((usuario) => {
    const { password, ...usuarioSinPassword } = usuario._doc;
    return usuarioSinPassword;
  });

  res.json({ data: usuariosSinPassword });
};

usuarioController.findOne = async (req, res) => {
  const id = req.params.id;

  const usuarioEncontrado = await usuarioModel.findById(id);

  if (!usuarioEncontrado) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const { password, ...usuarioSinPassword } = usuarioEncontrado._doc;
  res.json({ data: usuarioSinPassword });
};

usuarioController.create = async (req, res) => {
  const usuario = req.body;

  if (await usuarioModel.findOne({ email: usuario.email })) {
    return res.status(400).json({ message: 'El email ya está en uso' });
  }

  if (await usuarioModel.findOne({ usuario: usuario.usuario })) {
    return res.status(400).json({ message: 'El usuario ya está en uso' });
  }

  try {
    const usuarioGuardado = await usuarioModel.create({
      ...usuario,
      password: bcrypt.hashSync(usuario.password, 10),
    });

    const { password, ...usuarioSinPassword } = usuarioGuardado._doc;
    res.status(201).json({ data: usuarioSinPassword });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

usuarioController.update = async (req, res) => {
  const id = req.params.id;
  const usuario = req.body;

  if (!id || !usuario) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  const usuarioEncontrado = await usuarioModel.findOne({ _id: id });
  if (!usuarioEncontrado) {
    return res.status(404).json({ message: 'El id no existe' });
  }

  try {
    const usuarioActualizado = await usuarioModel.findByIdAndUpdate(
      id,
      usuario,
      { new: true }
    );
    res.json({ data: usuarioActualizado });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

usuarioController.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await usuarioModel.findByIdAndDelete(id);

    res.json({ data: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

usuarioController.login = async (req, res) => {
  const { usuario, password } = req.body;

  const usuarioEncontrado = await usuarioModel.findOne({ usuario: usuario });

  if (!usuarioEncontrado) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (!bcrypt.compareSync(password, usuarioEncontrado.password)) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  const { password: pass, ...usuarioSinPassword } = usuarioEncontrado._doc;
  res.json({ data: usuarioSinPassword });
};

module.exports = usuarioController;
