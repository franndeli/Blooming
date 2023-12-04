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
        check('Apellido', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Especialidad', 'El argumento "Especialidad" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], createProfesor);

router.put('/:ID_Profesor', [
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Apellido').optional().not().isEmpty().withMessage('El argumento "Apellido" no debe estar vacío'),
        check('Especialidad').optional().not().isEmpty().withMessage('El argumento "Especialidad" no debe estar vacío'),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], updateProfesor);

router.delete('/:ID_Profesor', [
        check('ID_Profesor').isInt().withMessage('El campo "ID_Profesor" debe ser un número entero'),
        validarCampos
    ], deleteProfesor);


module.exports = router;