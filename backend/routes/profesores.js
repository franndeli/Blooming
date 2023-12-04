/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getProfesores, createProfesor, updateProfesor, deleteProfesor } = require('../controllers/profesores');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getProfesores );

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Especialidad', 'El argumento "Especialidad" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], createProfesor);

router.put('/:ID_Profesor', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Especialidad', 'El argumento "Especialidad" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], updateProfesor);

router.delete('/:ID_Profesor', [
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], deleteProfesor);


module.exports = router;