/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getProfesores, createProfesor, updateProfesor, deleteProfesor, updateProfesorPwd } = require('../controllers/profesores');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Centro', 'Admin', 'Profesor']), (req, res) => {
    getProfesores(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Centro', 'Admin']),
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Apellidos', 'El argumento "Apellidos" es obligatorio').not().isEmpty(),
        check('Email', 'El argumento "Email" es obligatorio').not().isEmpty(),
        check('Contraseña', 'El argumento "Contraseña" es obligatorio').not().isEmpty(),
        check('ID_Clase', 'El argumento "ID_Clase" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res, next) => {
        createProfesor(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ message: error.message });
        });
    });

router.put('/:ID_Profesor', [
        validarJWT, validarRol(['Centro', 'Admin']),
        check('Nombre').optional().not().isEmpty().withMessage('Error en el argumento "Nombre"'),
        check('Apellidos').optional().not().isEmpty().withMessage('Error en el argumento "Apellidos"'),
        check('Email').optional().not().isEmpty().withMessage('Error en el argumento "Email"'),
        //check('Contraseña').optional().not().isEmpty().withMessage('Error en el argumento "Contraseña"'),
        check('ID_Clase').optional().not().isEmpty().withMessage('Error en el argumento "ID_Clase"'),
        check('ID_Centro').optional().not().isEmpty().withMessage('Error en el argumento "ID_Centro"'),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateProfesor(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

    router.put('/newp/:ID_Profesor', [
        validarJWT, validarRol(['Profesor']),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        check('Contraseña').not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('newPassword').not().isEmpty().withMessage('El argumento "newPassword" no debe estar vacío'),
        check('newPassword2').not().isEmpty().withMessage('El argumento "newPassword2" no debe estar vacío'),
        validarCampos
    ], (req, res) => {
        updateProfesorPwd(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Profesor', [
        validarJWT, validarRol(['Centro', 'Admin']),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteProfesor(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

module.exports = router;