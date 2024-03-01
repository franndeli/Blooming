const sequelize = require('../database/configdb');
const Pregunta = require('../models/pregunta');
const Ambito = require('../models/ambito');


const getPreguntas = async (req, res) => {
    try {
        const queryParams = req.query;

        const validParams = ['ID_Pregunta', 'TextoPregunta', 'TipoPregunta', 'AmbitoPregunta', 'NivelPregunta'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Preguntas" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param)) {
                if (param === 'ID_Pregunta') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }

        const preguntas = await Pregunta.findAll({
            where: queryOptions,
            include: [{
                model: Ambito,
                attributes: ['Nombre']
            }]
        });

        res.json({
            ok: true,
            msg: 'getPreguntas',
            preguntas
        });
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener las preguntas" });
    }
}


const createPregunta = async (req, res) => {
    try {
        const { TextoPregunta } = req.body;

        const existPregunta = await Pregunta.findOne({ where: {TextoPregunta } });
        if (existPregunta) {
            return res.status(400).json({ ok: false, msg: 'Ya existe esta pregunta' });
        }

        const nuevaPregunta = await Pregunta.create(req.body);

        res.json({
            ok: true, 
            msg: 'createPregunta',
            nuevaPregunta
        });
    } catch (error) {
        console.error("Error al crear la pregunta:", error);
        res.status(500).json({ ok: false, msg: 'Error al crear la pregunta' });
    }
};

const updatePregunta = async (req, res) => {
    try {
        const id = req.params.ID_Pregunta;

        const existPregunta = await Pregunta.findByPk(id);
        if (!existPregunta) {
            return res.status(404).json({ ok: false, msg: 'Pregunta no encontrada' });
        }

        const [updatedRowsCount, updatedPregunta] = await Pregunta.update(req.body, { where: { ID_Pregunta: id } });

        res.json({
            ok: true,
            msg: 'updatePregunta',
            updatedPregunta
        });
    } catch (error) {
        console.error("Error al actualizar la pregunta:", error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la pregunta' });
    }
};


const deletePregunta = async (req, res) => {
    try {
        const id = req.params.ID_Pregunta;

        const pregunta = await Pregunta.findByPk(id);
        if (!pregunta) {
            return res.status(404).json({ ok: false, msg: 'Pregunta no encontrada' });
        }

        await pregunta.destroy();

        res.json({
            ok: true,
            msg: 'deletePregunta'
        });
    } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        res.status(500).json({ ok: false, msg: 'Error al eliminar la pregunta' });
    }
};


module.exports = { getPreguntas, createPregunta, updatePregunta, deletePregunta };