const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const sequelize = require('../database/configdb');
const hashPassword = require('../middleware/hashHelper');

const getAdmins = async (req, res) => {
    try {
        const validParams = ['ID_Admin', 'Nombre', 'Email'];
        const queryParams = req.query;

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Admins" });
        }

        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param)) {
                queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
            }
        }

        const admins = await Admin.findAll({ 
            where: queryOptions,
            attributes: { exclude: ['Contraseña'] }
        });

        res.json({
            ok: true,
            msg: 'getAdmin',
            admins
        });
    } catch (error) {
        console.error("Error al obtener el admin:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener el admin" });
    }
}


const createAdmin = async (req, res) => {
    try {
        const email = req.body.Email;

        const existAdmin = await Admin.findOne({ where: { Email: email } });
        if (existAdmin) {
            return res.status(400).json({ statusCode: 400, message: "El email ya existe en otro Admin" });
        }

        const hashedPassword = hashPassword(req.body.Contraseña);
        req.body.Contraseña = hashedPassword;

        const newAdmin = await Admin.create(req.body);

        delete newAdmin.dataValues.Contraseña;

        return res.json({
            ok: true,
            msg: 'createAdmin',
            newAdmin
        });
    } catch (error) {
        console.error("Error al crear el admin:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al crear el Admin" });
    }
};


const updateAdmin = async (req, res) => {
    try {
        const id = req.params.ID_Admin;

        const existAdmin = await Admin.findByPk(id);
        if (!existAdmin) {
            return res.status(404).json({ statusCode: 404, message: "Admin no encontrado" });
        }

        const [updatedRowsCount, updatedAdmin] = await Admin.update(req.body, { where: { ID_Admin: id } });

        return res.json({
            ok: true,
            msg: 'updateAdmin',
            updatedAdmin
        });
    } catch (error) {
        console.error("Error al actualizar el admin:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al actualizar el Admin" });
    }
};


    function verify(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWTSECRET);
            return decodedToken;
        } catch (error) {
            return false;
        }
    }

const updateAdminPwd = async (req, res) => {
    try {
        const token = req.header('x-token');
        const id = req.params.ID_Admin;
        const { Contraseña, newPassword, newPassword2 } = req.body;
    
        const decodedToken = verify(token);
        if (!(decodedToken && decodedToken.Rol === 'Admin' && decodedToken.ID === id)) {
            return res.status(400).json({
                ok: false,
                message: 'No tienes permisos para actualizar la contraseña',
            });
        }
    
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({
                ok: false,
                message: 'Admin no encontrado',
            });
        }
    
        const pwdOk = await bcrypt.compare(Contraseña, admin.Contraseña);
        if (!pwdOk) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta',
            });
        }
    
        if (decodedToken.ID === id) {
            if (newPassword !== newPassword2) {
                return res.status(400).json({
                    ok: false,
                    message: 'Las contraseñas no coinciden',
                });
            }
            const hashedPassword = hashPassword(newPassword);
            admin.Contraseña = hashedPassword;
            await admin.save();
        }
    
        return res.json({
            ok: true,
            msg: 'Contraseña actualizada de Admin'
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña del admin:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al cambiar la contraseña" });
    }
};


const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.ID_Admin;

        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ statusCode: 404, message: "Admin no encontrado" });
        }

        await admin.destroy();

        return res.json({
            ok: true,
            msg: 'deleteAdmin'
        });
    } catch (error) {
        console.error("Error al eliminar el admin:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al eliminar el Admin" });
    }
};


module.exports = { getAdmins, createAdmin, updateAdmin, updateAdminPwd, deleteAdmin };