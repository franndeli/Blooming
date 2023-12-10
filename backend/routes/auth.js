/*
Ruta base: /api/login
*/

const { Router } = require('express');
const { login, token } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.post('/token', [
    check('x-token', 'El argumento x-token es obligatorio').not().isEmpty(),
    validarCampos,
], token);

router.post('/', [
    check('Usuario', 'El argumento Usuario es obligatorio').not().isEmpty(),
    check('Contraseña', 'El argumento Contraeña es obligatorio').not().isEmpty(),
    validarCampos,
], login);

module.exports = router;
