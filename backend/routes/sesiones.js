const { getSesiones, createSesion, updateSesion, deleteSesion, getSesionesCount } = require('../controllers/sesiones');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { Router } = require('express');

const router = Router();

router.get('/', [
    validarJWT, validarRol(['Alumno', 'Profesor', 'Centro', 'Admin'])
], (req, res) => {
    getSesiones(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.get('/:ID_Alumno', [
    validarJWT, validarRol(['Alumno', 'Admin'])
], (req, res) => {
    getSesionesCount(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
    validarJWT, validarRol(['Admin', 'Alumno']),
    check('ID_Alumno', 'El argumento "ID_Alumno" es obligatorio').not().isEmpty(),
    check('FechaInicio', 'El argumento "FechaInicio" es obligatorio').not().isEmpty(),
    //check('FechaFin', 'El argumento "FechaFin" es obligatorio').not().isEmpty(),
    check('ValorAmbitoInicio', 'El argumento "ValorAmbitoInicio" es obligatorio').not().isEmpty(),
    //check('ValorAmbitoFin', 'El argumento "ValorAmbitoFin" es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    createSesion(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.put('/:ID_Sesion', [
    validarJWT, validarRol(['Admin', 'Alumno']),
    check('ID_Alumno').optional().not().isEmpty().withMessage('Error en el argumento "ID_Alumno"'),
    check('FechaInicio').optional().not().isEmpty().withMessage('Error en el argumento "FechaInicio"'),
    check('FechaFin').optional().not().isEmpty().withMessage('Error en el argumento "FechaFin"'),
    check('ValorAmbitoInicio').optional().not().isEmpty().withMessage('Error en el argumento "ValorAmbitoInicio"'),
    check('ValorAmbitoFin').optional().not().isEmpty().withMessage('Error en el argumento "ValorAmbitoFin"'),
    validarCampos
], (req, res) => {
    updateSesion(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.delete('/:ID_Sesion', [
    validarJWT, validarRol(['Admin']),
    check('ID_Sesion').isInt().withMessage('El campo "ID_Sesion" debe ser un número entero'),
    validarCampos
], (req, res) => {
    deleteSesion(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

module.exports = router;