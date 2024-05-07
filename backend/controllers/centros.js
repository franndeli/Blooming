const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Centro = require('../models/centro');
const Clase = require('../models/clase');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const sequelize = require('../database/configdb');
const hashPassword = require('../middleware/hashHelper');


const getCentros = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const queryParams = req.query;

        const validParams = ['ID_Centro', 'Nombre', 'Email', 'Localidad', 'Provincia', 'Calle', 'CP', 'numFilas', 'desde'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Centros" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde') {
                if (param === 'ID_Centro') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }

        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};

        const centros = await Centro.findAll({
            where: queryOptions,
            ...paginationOptions,
            attributes: { exclude: ['Contraseña'] }
        });

        const total = await Centro.count({ where: queryOptions});

        res.json({
            ok: true,
            msg: 'getCentros',
            centros,
            page: {
                desde,
                tam,
                total
            }
        });
    } catch (error) {
        console.error("Error al obtener los centros:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener los centros" });
    }
}


const createCentro = async (req, res) => {
    try {
        const email = req.body.Email;

        const existCentro = await Centro.findOne({ where: { Email: email } });
        if (existCentro) {
            return res.status(400).json({ statusCode: 400, message: "Ya existe otro centro con el mismo email" });
        }

        const hashedPassword = hashPassword(req.body.Contraseña);
        req.body.Contraseña = hashedPassword;

        const newCentro = await Centro.create(req.body);

        delete newCentro.dataValues.Contraseña;

        res.json({
            ok: true,
            msg: 'createCentro',
            newCentro
        });
    } catch (error) {
        console.error("Error al crear el centro:", error);
        res.status(500).json({ statusCode: 500, message: "Error al crear el centro" });
    }
};


const updateCentro = async (req, res) => {
    try {
        const id = req.params.ID_Centro;

        const existCentro = await Centro.findByPk(id);
        if (!existCentro) {
            return res.status(404).json({ statusCode: 404, message: "Centro no encontrado" });
        }

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        const [updatedRowsCount, updatedCentro] = await Centro.update(req.body, { where: { ID_Centro: id } });

        res.json({
            ok: true,
            msg: 'updateCentro',
            updatedCentro
        });
    } catch (error) {
        console.error("Error al actualizar el centro:", error);
        res.status(500).json({ statusCode: 500, message: "Error al actualizar el centro" });
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

const updateCentroPwd = async (req, res) => {
    try {
        const token = req.header('x-token');
        const id = req.params.ID_Centro;
        const { Contraseña, newPassword, newPassword2 } = req.body;
        
        const decodedToken = verify(token);
        if (!(decodedToken && decodedToken.Rol === 'Centro' && decodedToken.ID === id)) {
            return res.status(400).json({
                ok: false,
                message: 'No tienes permisos para actualizar la contraseña',
            });
        }
        
        const centro = await Centro.findByPk(id);
        if (!centro) {
            return res.status(404).json({
                ok: false,
                message: 'Centro no encontrado',
            });
        }
        
        const pwdOk = await bcrypt.compare(Contraseña, centro.Contraseña);
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
            centro.Contraseña = hashedPassword;
            await centro.save();
        }
        
        return res.json({
            ok: true,
            msg: 'Contraseña actualizada del Centro'
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña del centro:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al cambiar la contraseña" });
    }
};


const deleteCentro = async (req, res) => {
    try {
        const id = req.params.ID_Centro;

        const centro = await Centro.findByPk(id);
        if (!centro) {
            return res.status(404).json({ statusCode: 404, message: "Centro no encontrado" });
        }

        await centro.destroy();

        res.json({
            ok: true,
            msg: 'Centro y sus clases, profesores y alumnos asociados eliminados correctamente'
        });
    } catch (error) {
        console.error("Error al eliminar el centro y sus dependencias:", error);
        res.status(500).json({ statusCode: 500, message: "Error al eliminar el centro y sus dependencias" });
    }
};


module.exports = { getCentros, createCentro, updateCentro, updateCentroPwd, deleteCentro };