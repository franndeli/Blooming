const sequelize = require('../database/configdb');
const Profesor = require('../models/profesor');
const Alumno = require('../models/alumno');
const Centro = require('../models/centro');
const Clase = require('../models/clase');



const getClases = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const queryParams = req.query;

        const validParams = ['ID_Clase', 'Nombre', 'NumAlumnos', 'ID_Centro', 'desde', 'numFilas', 'estado'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Clases" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde') {
                if (param === 'ID_Clase') {
                    queryOptions[param] = queryParams[param];
                } else if(param === 'ID_Centro'){
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }

        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};

        const clases = await Clase.findAll({
            where: queryOptions,
            ...paginationOptions,
            include: [{
                model: Centro,
                attributes: ['Nombre']
            }]
        });

        const total = await Clase.count({ where: queryOptions});

        res.json({
            ok: true,
            msg: 'getClases',
            clases,
            page: {
                desde,
                tam,
                total
            }
        });
    } catch (error) {
        console.error("Error al obtener las clases:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener las clases" });
    }
}


const createClase = async (req, res) => {
    try {
        const { Nombre, ID_Centro } = req.body;

        const existClase = await Clase.findOne({ where: { Nombre, ID_Centro } });
        if (existClase) {
            return res.status(400).json({ ok: false, msg: 'Ya existe esta clase en el centro' });
        }

        const nuevaClase = await Clase.create(req.body);

        res.json({
            ok: true, 
            msg: 'createClase',
            nuevaClase
        });
    } catch (error) {
        console.error("Error al crear la clase:", error);
        res.status(500).json({ ok: false, msg: 'Error al crear la clase' });
    }
};


const updateClase = async (req, res) => {
    try {
        const id = req.params.ID_Clase;

        const existClase = await Clase.findByPk(id);
        if (!existClase) {
            return res.status(404).json({ ok: false, msg: 'Clase no encontrada' });
        }

        const [updatedRowsCount, updatedClase] = await Clase.update(req.body, { where: { ID_Clase: id } });

        res.json({
            ok: true,
            msg: 'updateClase',
            updatedClase
        });
    } catch (error) {
        console.error("Error al actualizar la clase:", error);
        res.status(500).json({ ok: false, msg: 'Error al actualizar la clase' });
    }
};


const deleteClase = async (req, res) => {
    try {
        const id = req.params.ID_Clase;

        const existClase = await Clase.findByPk(id);
        if (!existClase) {
            return res.status(404).json({ ok: false, msg: 'Clase no encontrada' });
        }

        await Profesor.update({ ID_Clase: null }, { where: { ID_Clase: id } });
        await Alumno.destroy({ where: { ID_Clase: id } });
        await Clase.destroy({ where: { ID_Clase: id } });

        res.json({
            ok: true,
            msg: 'Profesores actualizados y alumnos y clase eliminados correctamente'
        });
    } catch (error) {
        console.error("Error al eliminar la clase y sus dependencias:", error);
        res.status(500).json({ok: false, msg: 'Error al eliminar la clase' });
    }
};


module.exports = { getClases, createClase, updateClase, deleteClase };