const Alumno = require('../models/alumno');
const sequelize = require('../database/configdb');
const hashPassword = require('../middleware/hashHelper');


const getAlumnos = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const queryParams = req.query;

        const validParams = ['ID_Alumno', 'Nombre', 'Apellidos', 'Usuario', 'FechaNacimiento', 'ID_Clase', 'ID_Centro', 'Estado', 'desde', 'numFilas'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Alumnos" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde') {
                if (param === 'ID_Alumno') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }

        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};

        const alumnos = await Alumno.findAll({
            where: queryOptions,
            ...paginationOptions,
            attributes: { exclude: ['Contraseña'] }
        });

        const total = await Alumno.count({ where: queryOptions});

        res.json({
            ok: true,
            msg: 'getAlumnos',
            alumnos,
            page: {
                desde,
                tam,
                total
            }
        });
    } catch (error) {
        console.error("Error al obtener los alumnos:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener los alumnos" });
    }
}


    function obtenerApellidos(apellidos) {
        const partes = apellidos.split(' ');

        const apellido1 = partes[0] || '';
        const apellido2 = partes.length > 1 ? partes[1] : '';

        return { apellido1, apellido2 };
    }

    function generarUsuario(nombre, apellidos, id) {
        const { apellido1, apellido2 } = obtenerApellidos(apellidos);

        const nombres = nombre.split(' ');
        const nombre1 = nombres.length > 0 ? nombres[0] : '';

        const inicialN2 = nombres.length > 1 ? nombres[1].charAt(0).toLowerCase() : '';

        const inicialApellido1 = apellido1.charAt(0).toLowerCase();
        const inicialApellido2 = apellido2.charAt(0).toLowerCase();

        const username = `${nombre1.toLowerCase()}${inicialN2}${inicialApellido1}${inicialApellido2}${id}`;

        return username;
    }


const createAlumno = async (req, res) => {
    try {
        const usuario = "";

        const existAlumno = await Alumno.findOne({ where: { Usuario: usuario } });
        if (existAlumno) {
            return res.status(400).json({ ok: false, message: "El usuario del alumno ya existe" });
        }
    
        const hashedPassword = hashPassword(req.body.Contraseña);
        const newAlumno = { ...req.body, Contraseña: hashedPassword, Usuario: usuario };
    
        const createdAlumno = await Alumno.create(newAlumno);
    
        const idAlumno = createdAlumno.ID_Alumno;
        const nomUsuario = generarUsuario(req.body.Nombre, req.body.Apellidos, idAlumno);
    
        await Alumno.update({ Usuario: nomUsuario }, { where: { ID_Alumno: idAlumno } });
    
        return res.json({
            ok: true,
            msg: 'createAlumno'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Error al crear el alumno" });
    }
};


const updateAlumno = async (req, res) => {
    try {
        const id = req.params.ID_Alumno;

        const existAlumno = await Alumno.findByPk(id);
        if (!existAlumno) {
            return res.status(404).json({ statusCode: 404, message: "Alumno no encontrado" });
        }

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        const [updatedRowsCount, updatedAlumno] = await Alumno.update(req.body, { where: { ID_Alumno: id } });

        res.json({
            ok: true,
            msg: 'updateAlumno',
            updatedAlumno
        });
    } catch (error) {
        console.error("Error al actualizar el alumno:", error);
        res.status(500).json({ statusCode: 500, message: "Error al actualizar el alumno" });
    }
};

const deleteAlumno = async (req, res) => {
    try {
        const id = req.params.ID_Alumno;

        const alumno = await Alumno.findByPk(id);
        if (!alumno) {
            return res.status(404).json({ ok: false, message: "Alumno no encontrado" });
        }

        await alumno.destroy();

        return res.json({
            ok: true,
            msg: 'deleteAlumno'
        });
    } catch (error) {
        console.error("Error al eliminar el alumno:",error);
        return res.status(500).json({ ok: false, message: "Error al eliminar el alumno" });
    }
};


module.exports = { getAlumnos, createAlumno, updateAlumno, deleteAlumno };