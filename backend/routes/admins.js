/* RUTA BASE '/api/admins' */

const { Router } = require('express');
const { getAdmins, createAdmin, updateAdmin, deleteAdmin, updateAdminPwd } = require('../controllers/admins');
const { check, Result } = require('express-validator');
const { validarCampos } = require('../middleware/validaciones');
const { validarRol } = require('../middleware/validar-rol');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, validarRol(['Admin']), (req, res) => {
    getAdmins(req, res).catch(error => {
        res.status(error.statusCode || 500).json({ error: error.message });
    });
});

router.post('/', [
        check('Nombre', 'El argumento "Nombre" es obligatorio').not().isEmpty(),
        check('Email', 'El argumento "Email" es obligatorio').not().isEmpty(),
        check('Contraseña', 'El argumento "Contraseña" es obligatorio').not().isEmpty(),
        validarCampos
    ], (req, res) => {
        createAdmin(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ message: error.message });
        });
    });

router.put('/:ID_Admin', [
        validarJWT, validarRol(['Admin']),
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('Nombre').optional().not().isEmpty().withMessage('El argumento "Nombre" no debe estar vacío'),
        check('Email').optional().not().isEmpty().withMessage('El argumento "Email" no debe estar vacío'),
        check('Contraseña').optional().not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('ID_Admin').isInt().withMessage('El campo "ID_Admin" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        updateAdmin(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.put('/newp/:ID_Admin', [
        validarJWT, validarRol(['Admin']),
    //Campos opcionales, no es necesario ponerlos todos para hacer una llamada PUT
        check('ID_Admin').isInt().withMessage('El campo "ID_Admin" debe ser un número entero'),
        check('Contraseña').not().isEmpty().withMessage('El argumento "Contraseña" no debe estar vacío'),
        check('newPassword').not().isEmpty().withMessage('El argumento "newPassword" no debe estar vacío'),
        check('newPassword2').not().isEmpty().withMessage('El argumento "newPassword2" no debe estar vacío'),
        validarCampos
    ], (req, res) => {
        updateAdminPwd(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

router.delete('/:ID_Admin', [
        validarJWT, validarRol(['Admin']),
        check('ID_Admin').isInt().withMessage('El campo "ID_Admin" debe ser un número entero'),
        validarCampos
    ], (req, res) => {
        deleteAdmin(req, res).catch(error => {
            res.status(error.statusCode || 500).json({ error: error.message });
        });
    });

module.exports = router;