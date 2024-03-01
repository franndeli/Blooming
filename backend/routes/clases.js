/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getClases, createClase, updateClase, deleteClase } = require('../controllers/clases');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Centro', 'Profesor', 'Admin']), (req, res) => {
    getClases(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        validarJWT, validarRol(['Centro', 'Profesor', 'Admin']),
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
        validarJWT, validarRol(['Centro', 'Profesor', 'Admin']),
        check('Nombre').optional().not().isEmpty().withMessage('Error en el argumento "Nombre"'),
        check('NumAlumnos').optional().not().isEmpty().withMessage('Error en el argumento "NumAlumnos"'),
        check('ID_Centro').optional().not().isEmpty().withMessage('Error en el argumento "ID_Centro"'),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateClase(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Clase', [
        validarJWT, validarRol(['Centro', 'Profesor', 'Admin']),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteClase(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });


module.exports = router;