/*
Ruta base: /api/login
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.post('/', [
    check('Usuario', 'El argumento Usuario es obligatorio').not().isEmpty(),
    check('Contraseña', 'El argumento Contraeña es obligatorio').not().isEmpty(),
    validarCampos,
], login);

module.exports = router;
