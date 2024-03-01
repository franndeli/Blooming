const { getOpciones, createOpciones, updateOpcion, deleteOpcion } = require('../controllers/opciones');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');
const { check } = require('express-validator');
const { Router } = require('express');


const router = Router();

router.get('/', (req, res) => {
    validarJWT, validarRol(['Alumno', 'Admin']),
    getOpciones(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Admin']),
        check('TextoOpcion', 'El argumento "TextoOpcion" es obligatorio').not().isEmpty(),
        check('ID_Pregunta', 'El argumento "ID_Pregunta" es obligatorio').not().isEmpty(),
        check('Gravedad', 'El argumento "Gravedad" es obligatorio').not().isEmpty(),
        check('AmbitoOpcion', 'El argumento "AmbitoOpcion" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createOpciones(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});

router.put('/:ID_Opcion', [
        validarJWT, validarRol(['Admin']),
        check('TextoOpcion').optional().not().isEmpty().withMessage('Error en el argumento "TextoOpcion"'),
        check('ID_Pregunta').optional().not().isEmpty().withMessage('Error en el argumento "ID_Pregunta"'),
        check('Gravedad').optional().not().isEmpty().withMessage('Error en el argumento "Gravedad"'),
        check('AmbitoOpcion').optional().not().isEmpty().withMessage('Error en el argumento "AmbitoOpcion"'),
        check('ID_Opcion').isInt().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateOpcion(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


router.delete('/:ID_Opcion', [
        validarJWT, validarRol(['Admin']),
        check('ID_Opcion').isInt().withMessage('El campo "ID_Opcion" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteOpcion(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
});


module.exports = router;