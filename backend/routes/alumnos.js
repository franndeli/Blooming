/* RUTA BASE '/api/usuarios' */

const { Router } = require('express');
const { getAlumnos, createAlumno, updateAlumno, deleteAlumno } = require('../controllers/alumnos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getAlumnos );

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('FechaNacimiento', 'El argumento "FechaNacimiento" es obligatorio').not().isEmpty(),
        check('ID_Clase', 'El argumento "ID_Clase" es obligatorio').not().isEmpty(),
        validarCampos
    ], createAlumno);

router.put('/:ID_Alumno', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('FechaNacimiento', 'El argumento "FechaNacimiento" es obligatorio').not().isEmpty(),
        check('ID_Clase', 'El argumento "ID_Clase" es obligatorio').not().isEmpty(),
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], updateAlumno);

router.delete('/:ID_Alumno', [
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], deleteAlumno);


module.exports = router;