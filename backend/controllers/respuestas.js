const sequelize = require('../database/configdb');
const Respuesta = require('../models/respuesta');
const Pregunta = require('../models/pregunta');
const Alumno = require('../models/alumno');
const Opcion = require('../models/opcion');
const Ambito = require('../models/ambito');
const Clase = require('../models/clase');



const getRespuestas = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const queryParams = req.query;

        const validParams = ['ID_Respuesta', 'ID_Pregunta', 'ID_Opcion', 'ID_Alumno', 'FechaRespuesta', 'ID_Sesion', 'Gravedad', 'ID_Clase', 'ID_Centro', 'desde', 'numFilas'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Respuestas" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde' && !(param === 'Gravedad' && queryParams[param] === '0')) {
                if (param === 'ID_Respuesta') {
                    queryOptions[param] = queryParams[param];
                } else if (param === 'Gravedad') {
                    queryOptions['$Opcion.Gravedad$'] = { [sequelize.Op.eq]: queryParams[param] };
                } else if (param === 'ID_Clase') {
                    queryOptions['$Alumno.ID_Clase$'] = { [sequelize.Op.eq]: queryParams[param] };
                }else if (param === 'ID_Centro') {
                    queryOptions['$Alumno.ID_Centro$'] = { [sequelize.Op.eq]: queryParams[param] };
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `${queryParams[param]}` };
                }
            }
        }

        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};

        const respuestas = await Respuesta.findAll({
            where: queryOptions,
            ...paginationOptions,
            subQuery: false,
            include: [
                {
                    model: Pregunta,
                    attributes: ['TextoPregunta'],
                    as: 'Pregunta',
                    include: [
                        {
                            model: Ambito,
                            attributes: ['Nombre'],
                            as: 'Ambito'
                        }
                    ]
                },
                {
                    model: Alumno,
                    attributes: ['Nombre', 'Apellidos'],
                    as: 'Alumno',
                    include: [
                        {
                            model: Clase,
                            attributes: ['Nombre'],
                            as: 'Clase'
                        }
                    ]
                },
                {
                    model: Opcion,
                    attributes: ['TextoOpcion', 'Gravedad'],
                    as: 'Opcion'
                }
            ],
            order: [['FechaRespuesta', 'DESC']]
        });

        let countOptions = { where: queryOptions, include: [] };

        if (queryParams['ID_Centro'] !== undefined) {
            countOptions.include.push({
                model: Alumno,
                attributes: [],
                where: { ID_Centro: queryParams['ID_Centro'] }
            });
        }
        if (queryParams['ID_Clase'] !== undefined) {
            countOptions.include.push({
                model: Alumno,
                attributes: [],
                where: { ID_Clase: queryParams['ID_Clase'] }
            });
        }
        if (queryParams['Gravedad'] !== undefined) {
            countOptions.include.push({
                model: Opcion,
                where: { Gravedad: queryParams['Gravedad'] }
            });
        }

        const total = await Respuesta.count(countOptions);
        // let total;
        // if (tam > 0) {
        //     total = await Respuesta.count(countOptions);
        // }

        res.json({
            ok: true,
            msg: 'getRespuestas',
            respuestas,
            page: {
                desde,
                tam,
                total
            }
        });
    } catch (error) {
        console.error("Error al obtener las respuestas:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener las respuestas" });
    }
}


const createRespuesta = async (req, res) => {
    try {
        req.body.FechaRespuesta = new Date();

        await Respuesta.create(req.body);

        return res.json({
            ok: true,
            msg: 'createRespuesta'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Error al crear la respuesta" });
    }
};


const updateRespuesta = async (req, res) => {
    try {
        const id = req.params.ID_Respuesta;

        const existRespuesta = await Respuesta.findByPk(id);
        if (!existRespuesta) {
            return res.status(404).json({ ok: false, msg: 'Respuesta no encontrada' });
        }

        const [updatedRowsCount, updatedRespuesta] = await Respuesta.update(req.body, { where: { ID_Respuesta: id } });

        res.json({
            ok: true,
            msg: 'updateRespuesta',
            updatedRespuesta
        });
    } catch (error) {
        console.error("Error al actualizar la respuesta:", error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la respuesta' });
    }
};


const deleteRespuesta = async (req, res) => {
    try {
        const id = req.params.ID_Respuesta;

        const respuesta = await Respuesta.findByPk(id);
        if (!respuesta) {
            return res.status(404).json({ ok: false, msg: 'Respuesta no encontrada' });
        }

        await respuesta.destroy();

        res.json({
            ok: true,
            msg: 'deleteRespuesta'
        });
    } catch (error) {
        console.error("Error al eliminar la respuesta:", error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar la respuesta' });
    }
};


module.exports = { getRespuestas, createRespuesta, updateRespuesta, deleteRespuesta };