const { Router } = require('express');
const { getPreguntas, createPregunta, updatePregunta, deletePregunta } = require('../controllers/preguntas');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', (req, res) => {
    getPreguntas(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
    check('TextoPregunta', 'El argumento "TextoPregunta" es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    createPregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.put('/:ID_Pregunta', [
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
    check('TextoPregunta').optional().not().isEmpty().withMessage('El argumento "TextoPregunta" es obligatorio'),
    check('ID_Pregunta').isInt().withMessage('El campo "ID_Pregunta" debe ser un número entero'),
    validarCampos
], (req, res) => {
    updatePregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.delete('/:ID_Pregunta', [
    check('ID_Pregunta').isInt().withMessage('El campo "ID_Pregunta" debe ser un número entero'),
    validarCampos
], (req, res) => {
    deletePregunta(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});


module.exports = router;