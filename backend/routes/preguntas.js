const { getPreguntas, createPregunta, updatePregunta, deletePregunta } = require('../controllers/preguntas');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    validarJWT, validarRol(['Alumno','Admin']),
    getPreguntas(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.get('/porAmbito', (req, res) => {
    getPreguntasPorAmbito(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
    validarJWT, validarRol(['Admin']),
    check('TextoPregunta', 'El argumento "TextoPregunta" es obligatorio').not().isEmpty(),
    check('TipoPregunta', 'El argumento "TipoPregunta" es obligatorio').not().isEmpty(),
    check('AmbitoPregunta', 'El argumento "AmbitoPregunta" es obligatorio').not().isEmpty(),
    check('NivelPregunta', 'El argumento "NivelPregunta" es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    createPregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.put('/:ID_Pregunta', [
    validarJWT, validarRol(['Admin']),
    check('TextoPregunta').optional().not().isEmpty().withMessage('Error en el argumento "TextoPregunta"'),
    check('TipoPregunta').optional().not().isEmpty().withMessage('Error en el argumento "TipoPregunta"'),
    check('AmbitoPregunta').optional().not().isEmpty().withMessage('Error en el argumento "AmbitoPregunta"'),
    check('NivelPregunta').optional().not().isEmpty().withMessage('Error en el argumento "NivelPregunta"'),
    check('ID_Pregunta').isInt().withMessage('El campo "ID_Pregunta" debe ser un número entero'),
    validarCampos
], (req, res) => {
    updatePregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.delete('/:ID_Pregunta', [
    validarJWT, validarRol(['Admin']),
    check('ID_Pregunta').isInt().withMessage('El campo "ID_Pregunta" debe ser un número entero'),
    validarCampos
], (req, res) => {
    deletePregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});


module.exports = router;