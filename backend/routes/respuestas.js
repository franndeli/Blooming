const { Router } = require('express');
const { getRespuestas, createRespuesta, updateRespuesta, deleteRespuesta } = require('../controllers/respuestas');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', (req, res) => {
    getRespuestas(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('Respuesta', 'El argumento "Respuesta" es obligatorio').not().isEmpty(),
        check('ID_Alumno', 'El argumento "ID_Alumno" es obligatorio').not().isEmpty(),
        check('ID_Pregunta', 'El argumento "ID_Pregunta" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

router.put('/:ID_Respuesta', [
        //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Pregunta').optional().not().isEmpty().withMessage('El argumento "TextoOpcion" es obligatorio'),
        check('ID_Alumno').optional().not().isEmpty().withMessage('El argumento "ID_Pregunta" es obligatorio'),
        check('ID_Pregunta').optional().not().isEmpty().withMessage('El argumento "ID_PreguntaSiguiente" es obligatorio'),
        check('ID_Sesion').optional().not().isEmpty().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        check('FechaRespuesta').optional().not().isEmpty().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        check('ID_Respuesta').isInt().withMessage('El campo "ID_Respuesta" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


router.delete('/:ID_Respuesta', [
        check('ID_Respuesta').isInt().withMessage('El campo "ID_Respuesta" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteRespuesta(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

module.exports = router;