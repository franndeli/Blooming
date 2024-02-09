const { Router } = require('express');
const { getOpciones, createOpciones, updateOpcion, deleteOpcion } = require('../controllers/opciones');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', (req, res) => {
    getOpciones(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('TextoOpcion', 'El argumento "TextoOpcion" es obligatorio').not().isEmpty(),
        check('ID_Pregunta', 'El argumento "ID_Pregunta" es obligatorio').not().isEmpty(),
        check('ID_PreguntaSiguiente', 'El argumento "ID_PreguntaSiguiente" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createOpciones(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

router.put('/:ID_Opcion', [
        //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('TextoOpcion').optional().not().isEmpty().withMessage('El argumento "TextoOpcion" es obligatorio'),
        check('ID_Pregunta').optional().not().isEmpty().withMessage('El argumento "ID_Pregunta" es obligatorio'),
        check('ID_PreguntaSiguiente').optional().not().isEmpty().withMessage('El argumento "ID_PreguntaSiguiente" es obligatorio'),
        check('ID_Opcion').isInt().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateOpcion(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


router.delete('/:ID_Opcion', [
        check('ID_Opcion').isInt().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteOpcion(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


module.exports = router;