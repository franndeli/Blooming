/* RUTA BASE '/api/alumnos' */

const { Router } = require('express');
const { getAlumnos, createAlumno, updateAlumno, deleteAlumno, getAlumnosPorCriterio } = require('../controllers/alumnos');
const { check, Result } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getAlumnos );

router.get('/buscar', (req, res) => {
    getAlumnosPorCriterio(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Apellidos', 'El argumento "Apellidos" es obligatorio').not().isEmpty(),
        check('Usuario', 'El argumento "Usuario" es obligatorio').not().isEmpty(),
        check('Contraseña', 'El argumento "Contraseña" es obligatorio').not().isEmpty(),
        check('FechaNacimiento', 'El argumento "FechaNacimiento" es obligatorio').not().isEmpty(),
        check('ID_Clase', 'El argumento "ID_Clase" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res, next) => {
        createAlumno(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ message: error.message });
        });
    });

router.put('/:ID_Alumno', [
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Apellidos').optional().not().isEmpty().withMessage('El argumento "Apellidos" no debe estar vacío'),
        check('Usuario').optional().not().isEmpty().withMessage('El argumento "Usuario" no debe estar vacío'),
        check('Contraseña').optional().not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
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