const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  })
}

const usuariosPut = async (req, res) => {

  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  console.log(usuario)

  res.status(500).json({
    usuario
  })
}

const usuariosPost = async (req, res) => {

  const { name, email, password, rol } = req.body;

  const usuario = new Usuario({
    name,
    email,
    password,
    rol
  });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en base de datos 
  await usuario.save();

  res.status(201).json({
    msg: "post API - controlador",
    usuario
  })
}

const usuariosDelete = async(req, res) => {

  const {id} = req.params;

  //Borrado físico
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, {state: false});

  res.json({
    usuario
  })
}

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador"
  })
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
}