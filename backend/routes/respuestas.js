const { getRespuestas, createRespuesta, updateRespuesta, deleteRespuesta } = require('../controllers/respuestas');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    validarJWT, validarRol(['Alumno', 'Profesor', 'Centro', 'Admin']),
    getRespuestas(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Admin', 'Alumno']),
        check('ID_Pregunta', 'El argumento "ID_Pregunta" es obligatorio').not().isEmpty(),
        check('ID_Opcion', 'El argumento "ID_Opcion" es obligatorio').not().isEmpty(),
        check('FechaRespuesta', 'El argumento "FechaRespuesta" es obligatorio').not().isEmpty(),
        check('ID_Alumno', 'El argumento "ID_Alumno" es obligatorio').not().isEmpty(),
        check('ID_Sesion', 'El argumento "ID_Sesion" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

router.put('/:ID_Respuesta', [
        validarJWT, validarRol(['Admin']),
        check('TextoPregunta').optional().not().isEmpty().withMessage('Error en el argumento "TextoPregunta"'),
        check('TextoRespuesta').optional().not().isEmpty().withMessage('Error en el argumento "TextoRespuesta"'),
        check('FechaRespuesta').optional().not().isEmpty().withMessage('Error en el argumento "FechaRespuesta"'),
        check('ID_Alumno').optional().not().isEmpty().withMessage('Error en el argumento "ID_Alumno"'),
        check('ID_Sesion').optional().not().isEmpty().withMessage('Error en el argumento "ID_Sesion"'),
        check('ID_Respuesta').isInt().withMessage('El campo "ID_Respuesta" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


router.delete('/:ID_Respuesta', [
        validarJWT, validarRol(['Admin']),
        check('ID_Respuesta').isInt().withMessage('El campo "ID_Respuesta" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

module.exports = router;