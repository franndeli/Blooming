/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getClases, createClase, updateClase, deleteClase } = require('../controllers/clases');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getClases );

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], createClase);

router.put('/:ID_Clase', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], updateClase);

router.delete('/:ID_Clase', [
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], deleteClase);


module.exports = router;