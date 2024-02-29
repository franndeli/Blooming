const {sequelize} = require('../database/configdb');
const { QueryTypes } = require('sequelize');
const Sesion = require('../models/sesion');

// const getSesiones = async (req, res) => {
//     try {
//         const queryParams = req.query;

//         const validParams = ['ID_Sesion', 'ID_Alumno', 'FechaInicio', 'FechaFin'];

//         const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
//         if (!isValidQuery) {
//             return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Sesiones" });
//         }
        
//         const queryOptions = {};
//         for (const param in queryParams) {
//             if (validParams.includes(param)) {
//                 if (param === 'ID_Sesion') {
//                     queryOptions[param] = queryParams[param];
//                 } else {
//                     queryOptions[param] = { [sequelize.Op.like]: `${queryParams[param]}` };
//                 }
//             }
//         }

//         const sesiones = await Sesion.findAll({ where: queryOptions });

//         res.json({
//             ok: true,
//             msg: 'getSesiones',
//             sesiones
//         });
//     } catch (error) {
//         console.error("Error al obtener las sesiones:", error);
//         res.status(500).json({ statusCode: 500, message: "Error al obtener las sesiones" });
//     }
// }

const getSesiones = async (req, res) => {
    try {
        const queryParams = req.query;

        const validParams = ['ID_Sesion', 'ID_Alumno', 'FechaInicio', 'FechaFin'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Sesiones" });
        }
        
        let whereClause = '';
        for (const param in queryParams) {
            if (validParams.includes(param)) {
                if (param === 'ID_Sesion') {
                    whereClause += ` AND ${param} = ${queryParams[param]}`;
                } else {
                    whereClause += ` AND ${param} LIKE '%${queryParams[param]}%'`;
                }
            }
        }

        const sesiones = await sequelize.query(
            `SELECT ID_Sesion, ID_Alumno, 
            DATE(FechaInicio) as FechaInicio, 
            TIME(FechaInicio) as HoraInicio, 
            FechaFin, ValorAmbitoInicio, ValorAmbitoFin 
            FROM sesion WHERE 1=1 ${whereClause}`,
            { 
                type: QueryTypes.SELECT 
            }
        );

        res.json({
            ok: true,
            msg: 'getSesiones',
            sesiones
        });
    } catch (error) {
        console.error("Error al obtener las sesiones:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener las sesiones" });
    }
}

const createSesion = async (req, res) => {
    try {
        req.body.FechaInicio = new Date();

        await Sesion.create(req.body);

        return res.json({
            ok: true,
            msg: 'createSesion'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Error al crear la sesión" });
    }
};

const updateSesion = async (req, res) => {
    try {
        const id = req.params.ID_Sesion;

        const existSesion = await Sesion.findByPk(id);
        if (!existSesion) {
            return res.status(404).json({ ok: false, msg: 'Sesión no encontrada' });
        }

        const [updatedRowsCount, updatedSesion] = await Sesion.update(req.body, { where: { ID_Sesion: id } });

        res.json({
            ok: true,
            msg: 'updateSesion',
            updatedSesion
        });
    } catch (error) {
        console.error("Error al actualizar la sesión:", error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la sesión' });
    }
};

const deleteSesion = async (req, res) => {
    try {
        const id = req.params.ID_Sesion;

        const sesion = await Sesion.findByPk(id);
        if (!sesion) {
            return res.status(404).json({ ok: false, msg: 'Sesión no encontrada' });
        }

        await sesion.destroy();

        res.json({
            ok: true,
            msg: 'deleteSesion'
        });
    } catch (error) {
        console.error("Error al eliminar la sesión:", error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar la sesión' });
    }
};

module.exports = { getSesiones, createSesion, updateSesion, deleteSesion };