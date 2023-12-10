/* RUTA BASE '/api/centros' */

const { Router } = require('express');
const { getCentros, createCentro, updateCentro, deleteCentro } = require('../controllers/centros');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Admin']), (req, res) => {
    getCentros(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Email', 'El argumento "Email" es obligatorio').not().isEmpty(),
        check('Contraseña', 'El argumento "Contraseña" es obligatorio').not().isEmpty(),
        check('Localidad', 'El argumento "Localidad" es obligatorio').not().isEmpty(),
        check('Provincia', 'El argumento "Provincia" es obligatorio').not().isEmpty(),
        check('Calle', 'El argumento "Calle" es obligatorio').not().isEmpty(),
        check('CP', 'El argumento "CP" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res, next) => {
        createCentro(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ message: error.message });
        });
    });

router.put('/:ID_Centro', [
        validarJWT, validarRol(['Admin']),
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Email').optional().not().isEmpty().withMessage('El argumento "Email" no debe estar vacío'),
        check('Contraseña').optional().not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('Localidad').optional().not().isEmpty().withMessage('El argumento "Localidad" no debe estar vacío'),
        check('Provincia').optional().not().isEmpty().withMessage('El argumento "Provincia" no debe estar vacío'),
        check('Calle').optional().not().isEmpty().withMessage('El argumento "Calle" no debe estar vacío'),
        check('CP').optional().not().isEmpty().withMessage('El argumento "CP" no debe estar vacío'),
        check('ID_Centro').isInt().withMessage('El campo "ID_Centro" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateCentro(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Centro', [
        validarJWT, validarRol(['Admin']),
        check('ID_Centro').isInt().withMessage('El campo "ID_Centro" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteCentro(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });


module.exports = router;