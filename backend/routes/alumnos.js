/* RUTA BASE '/api/usuarios' */

const { Router } = require('express');
const { getAlumnos, createAlumno, updateAlumno, deleteAlumno } = require('../controllers/alumnos');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getAlumnos );

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Apellido', 'El argumento "Apellido" es obligatorio').not().isEmpty(),
        check('FechaNacimiento', 'El argumento "FechaNacimiento" es obligatorio').not().isEmpty(),
        check('ID_Clase', 'El argumento "ID_Clase" es obligatorio').not().isEmpty(),
        validarCampos
    ], createAlumno);

router.put('/:ID_Alumno', [
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Apellido').optional().not().isEmpty().withMessage('El argumento "Apellido" no debe estar vacío'),
        check('FechaNacimiento').optional().not().isEmpty().withMessage('El argumento "FechaNacimiento" no debe estar vacío'),
        check('ID_Clase').optional().isInt().withMessage('El argumento "ID_Clase" debe ser un número entero'),
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], updateAlumno);

router.delete('/:ID_Alumno', [
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], deleteAlumno);


module.exports = router;