/* RUTA BASE '/api/alumnos' */

const { Router } = require('express');
const { getAlumnos, createAlumno, updateAlumno, deleteAlumno } = require('../controllers/alumnos');
const { check, Result } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Profesor', 'Centro']), (req, res) => {
    getAlumnos(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Centro']),
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
        validarJWT, validarRol(['Centro']),
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Apellidos').optional().not().isEmpty().withMessage('El argumento "Apellidos" no debe estar vacío'),
        check('Usuario').optional().not().isEmpty().withMessage('El argumento "Usuario" no debe estar vacío'),
        check('Contraseña').optional().not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('FechaNacimiento').optional().not().isEmpty().withMessage('El argumento "FechaNacimiento" no debe estar vacío'),
        check('ID_Clase').optional().isInt().withMessage('El argumento "ID_Clase" debe ser un número entero'),
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateAlumno(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Alumno', [
        validarJWT, validarRol(['Centro']),
        check('ID_Alumno').isInt().withMessage('El campo "ID_Alumno" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteAlumno(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

module.exports = router;