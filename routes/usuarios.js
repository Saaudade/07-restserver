const {Router} = require('express');
const { check } = require('express-validator');

const { esRoleValido, verifyEmail, existUserById } = require('../helpers/db-validators');

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRol
} = require('../middlewares');

const { 
  usuariosGet, 
  usuariosPut, 
  usuariosPost, 
  usuariosDelete, 
  usuariosPatch } = require('../controllers/usuarios');

const router = new Router();

//Rutas

router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existUserById),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom(verifyEmail),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRol('ADMIN_ROLE', 'VENTAS_ROL'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existUserById),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;