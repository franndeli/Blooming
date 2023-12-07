/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getClases, createClase, updateClase, deleteClase } = require('../controllers/clases');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Centro', 'Profesor']), (req, res) => {
    getClases(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Centro', 'Profesor']),
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('NumAlumnos', 'El argumento "NumAlumnos" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createClase(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.put('/:ID_Clase', [
        validarJWT, validarRol(['Centro', 'Profesor']),
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" es obligatorio'),
        check('NumAlumnos').optional().not().isEmpty().withMessage('El argumento "NumAlumnos" es obligatorio'),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateClase(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Clase', [
        validarJWT, validarRol(['Centro', 'Profesor']),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteClase(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });


module.exports = router;