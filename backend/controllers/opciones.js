const sequelize = require('../database/configdb');
const Pregunta = require('../models/pregunta');
const Opcion = require('../models/opcion');
const Ambito = require('../models/ambito');

const getOpciones = async (req, res) => {
    try {
        const queryParams = req.query;

        const validParams = ['ID_Opcion', 'TextoOpcion', 'ID_Pregunta', 'Gravedad'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Opciones" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param)) {
                if (param === 'ID_Opcion') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `${queryParams[param]}` };
                }
            }
        }

        const opciones = await Opcion.findAll({
            where: queryOptions,
            include: [
                {
                    model: Pregunta,
                    attributes: ['TextoPregunta']
                },
            ]
        });

        res.json({
            ok: true,
            msg: 'getOpciones',
            opciones
        });
    } catch (error) {
        console.error("Error al obtener las opciones:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener las opciones" });
    }
}


const createOpciones = async (req, res) => {
    try {
        const { TextoOpcion, ID_Pregunta } = req.body;

        const existOpcion = await Opcion.findOne({
            where: { TextoOpcion: TextoOpcion, ID_Pregunta: ID_Pregunta }
        });

        if (existOpcion) {
            return res.status(400).json({ ok: false, message: "Ya existe esta opcón para la misma pregunta" });
        }

        await Opcion.create(req.body);

        return res.json({
            ok: true,
            msg: 'createOpciones'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Error al crear la opción de respuesta" });
    }
};


const updateOpcion = async (req, res) => {
    try {
        const id = req.params.ID_Opcion;

        const existOpcion = await Opcion.findByPk(id);
        if (!existOpcion) {
            return res.status(404).json({ ok: false, msg: 'Opción no encontrada' });
        }

        const [updatedRowsCount, updatedOpcion] = await Opcion.update(req.body, { where: { ID_Opcion: id } });

        res.json({
            ok: true,
            msg: 'updateOpcion',
            updatedOpcion
        });
    } catch (error) {
        console.error("Error al actualizar la opción:", error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la opción' });
    }
};


const deleteOpcion = async (req, res) => {
    try {
        const id = req.params.ID_Opcion;

        const opcion = await Opcion.findByPk(id);
        if (!opcion) {
            return res.status(404).json({ ok: false, msg: 'Opción no encontrada' });
        }

        await opcion.destroy();

        res.json({
            ok: true,
            msg: 'deleteOpcion'
        });
    } catch (error) {
        console.error("Error al eliminar la opción:", error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar la opción' });
    }
};


module.exports = { getOpciones, createOpciones, updateOpcion, deleteOpcion };