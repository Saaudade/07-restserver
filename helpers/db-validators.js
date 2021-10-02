const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
  const existeRol = await Role.findOne({rol});
  if(!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
}

const verifyEmail = async(email = '') => {
  // Verificar si el correo existe
  const existeEmail = await usuario.findOne({email});
  
  if(existeEmail) {
    throw new Error(`El correo: ${email}, ya esta registrado`);
  }
}

const existUserById = async(id) => {
  // Verificar si el id de usuario existe
  const existUser = await usuario.findById(id);
  
  if(!existUser) {
    throw new Error(`El id no existe: ${id}`);
  }
}

module.exports = {
  esRoleValido,
  verifyEmail,
  existUserById
}