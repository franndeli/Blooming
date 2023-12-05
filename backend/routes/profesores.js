/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getProfesores, createProfesor, updateProfesor, deleteProfesor, getProfesoresPorCriterio } = require('../controllers/profesores');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getProfesores );

router.get('/buscar', (req, res) => {
    getProfesoresPorCriterio(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
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
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Apellidos').optional().not().isEmpty().withMessage('El argumento "Apellidos" no debe estar vacío'),
        check('Email').optional().not().isEmpty().withMessage('El argumento "Email" no debe estar vacío'),
        check('Contraseña').optional().not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('ID_Clase').optional().not().isEmpty().withMessage('El argumento "ID_Clase" es obligatorio'),
        check('ID_Centro').optional().not().isEmpty().withMessage('El argumento "ID_Centro" es obligatorio'),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], updateProfesor);

router.delete('/:ID_Profesor', [
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], deleteProfesor);


module.exports = router;