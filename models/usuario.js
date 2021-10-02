// {
//   name: '',
//   email: 'giby098@hotmail.com',
//   contraseña: '23239239239293i',
//   image: '',
//   rol: '',
//   state: false,
//   google: false
// }

const { Schema, model } = require('mongoose'); 

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  image: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}


module.exports = model( 'Usuario', UsuarioSchema);