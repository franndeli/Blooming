/* RUTA BASE '/api/clases' */

const { Router } = require('express');
const { getClases, createClase, updateClase, deleteClase, getClasesPorCriterio } = require('../controllers/clases');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');

const router = Router();

router.get('/', getClases );
router.get('/buscar', (req, res) => {
    getClasesPorCriterio(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('NumAlumnos', 'El argumento "NumAlumnos" es obligatorio').not().isEmpty(),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        validarCampos
    ], createClase);

router.put('/:ID_Clase', [
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" es obligatorio'),
        check('NumAlumnos').optional().not().isEmpty().withMessage('El argumento "NumAlumnos" es obligatorio'),
        check('ID_Centro', 'El argumento "ID_Centro" es obligatorio').not().isEmpty(),
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], updateClase);

router.delete('/:ID_Clase', [
        check('ID_Clase').isInt().withMessage('El campo "ID_Clase" debe ser un número entero'),
        validarCampos
    ], deleteClase);


module.exports = router;