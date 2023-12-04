/* RUTA BASE '/api/centros' */

const { Router } = require('express');
const { getCentros, createCentro, updateCentro, deleteCentro } = require('../controllers/centros');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getCentros );

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Direccion', 'El argumento "Direccion" es obligatorio').not().isEmpty(),
        validarCampos
    ], createCentro);

router.put('/:ID_Centro', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Direccion', 'El argumento "Direccion" es obligatorio').not().isEmpty(),
        check('ID_Centro').isInt().withMessage('El campo "ID_Centro" debe ser un número entero'),
        validarCampos
    ], updateCentro);

router.delete('/:ID_Centro', [
        check('ID_Centro').isInt().withMessage('El campo "ID_Centro" debe ser un número entero'),
        validarCampos
    ], deleteCentro);


module.exports = router;