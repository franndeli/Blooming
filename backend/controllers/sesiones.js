// const {sequelize} = require('../database/configdb');
const sequelize = require('../database/configdb');
const { QueryTypes } = require('sequelize');
const Sesion = require('../models/sesion');

const getSesiones = async (req, res) => {
    try {
        const limite = Number(req.query.dias) || 7;
        const queryParams = req.query;

        const validParams = ['ID_Sesion', 'ID_Alumno', 'FechaInicio', 'FechaFin', 'dias'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Sesiones" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) &&  param !== 'dias') {
                if (param === 'ID_Sesion') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `${queryParams[param]}` };
                }
            }
        }

        let sesiones = await Sesion.findAll({ where: queryOptions, order: [['FechaFin', 'DESC']], limit: limite });

        sesiones = sesiones.sort((a, b) => a.FechaFin.fecha > b.FechaFin.fecha ? 1 : -1);

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

const getSesionesAlumnosCentro = async (req, res) => {
    try {
        const limite = Number(req.query.dias) || 7;
        const queryParams = req.query;

        const validParams = ['ID_Sesion', 'ID_Alumno', 'FechaInicio', 'FechaFin', 'dias'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Sesiones" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) &&  param !== 'dias') {
                if (param === 'ID_Sesion') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `${queryParams[param]}` };
                }
            }
        }

        let sesiones = await Sesion.findAll({ where: queryOptions, order: [['FechaFin', 'DESC']], limit: limite });

        sesiones = sesiones.sort((a, b) => a.FechaFin.fecha > b.FechaFin.fecha ? 1 : -1);

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
        const sesion = await Sesion.create(req.body);

        return res.json({
            ok: true,
            msg: 'createSesion',
            ID_Sesion: sesion.ID_Sesion
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

        const [updatedSesion] = await Sesion.update(req.body, { where: { ID_Sesion: id } });

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

const getSesionesCount = async (req, res) => {
    try {
        // Asumiendo que ID_Alumno se pasa como parámetro de query
        const idAlumno = req.query.ID_Alumno;
        if (!idAlumno) {
            return res.status(400).json({ message: "Se requiere el ID_Alumno" });
        }

        // Calcula la fecha de 3 semanas atrás desde la fecha actual
        const tresSemanasAtras = new Date();
        tresSemanasAtras.setDate(tresSemanasAtras.getDate() - 21);

        // Usa Sequelize para contar las sesiones
        const numeroSesiones = await Sesion.count({
            where: {
                ID_Alumno: idAlumno,
                // Asegúrate de ajustar 'FechaInicio' al nombre correcto de tu columna de fecha
                FechaInicio: {
                    [sequelize.Op.gte]: tresSemanasAtras, // gte significa 'mayor o igual que'
                },
            },
        });

        res.json({
            ok: true,
            msg: 'getSesionesCount',
            count: numeroSesiones
        });
    } catch (error) {
        console.error("Error al obtener el conteo de sesiones:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener el conteo de sesiones" });
    }
};

module.exports = { getSesiones, createSesion, updateSesion, deleteSesion, getSesionesCount, getSesionesAlumnosCentro};