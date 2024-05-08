const Clase = require('../models/clase');
const nodemailer = require('nodemailer');
const Centro = require('../models/centro');
const Alumno = require('../models/alumno');
const Respuesta = require('../models/respuesta');
const Sesion = require('../models/sesion');
const sequelize = require('../database/configdb');

const hashPassword = require('../middleware/hashHelper');


const getAlumnos = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const textoBusqueda = req.query.textoBusqueda || '';
        const queryParams = req.query;

        const validParams = ['ID_Alumno', 'Nombre', 'Apellidos', 'Usuario', 'FechaNacimiento', 'ID_Clase', 'ID_Centro', 'Estado', 'desde', 'numFilas', 'ordenar', 'textoBusqueda'];
        
        let queryOptions = {};

        /*if (textoBusqueda) {
            queryOptions[sequelize.Op.or] = [
                { Nombre: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
                { Apellidos: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
                { Estado: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
                { '$Clase.Nombre$': { [sequelize.Op.like]: `%${textoBusqueda}%` } }
            ];  
        }*/

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        console.log(isValidQuery);
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Alumnos" });
        }

        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde' && param !== 'ordenar' && param !== 'textoBusqueda') {
                if (param === 'ID_Alumno') {
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }
        
        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};
        let orderOptions;
        if(queryParams.ordenar == 1){
            orderOptions = [['Nombre', 'ASC']];
        }else if(queryParams.ordenar == 2){
            orderOptions = [['Nombre', 'DESC']];
        }else if(queryParams.ordenar == 0){
            orderOptions = [];
        }else if(queryParams.ordenar == 3){
            orderOptions = [['Apellidos', 'ASC']];
        }else if(queryParams.ordenar == 4){
            orderOptions = [['Apellidos', 'DESC']];
        }else if(queryParams.ordenar == 5){
            orderOptions = [[Clase, 'Nombre', 'ASC']];
        }else if(queryParams.ordenar == 6){
            orderOptions = [[Clase, 'Nombre', 'DESC']];
        }else if(queryParams.ordenar == 7){
            orderOptions = [['FechaNacimiento', 'ASC']];
        }else if(queryParams.ordenar == 8){
            orderOptions = [['FechaNacimiento', 'DESC']];
        }else if(queryParams.ordenar == 9){
            orderOptions = [[Centro, 'Calle', 'ASC']];
        }else if(queryParams.ordenar == 10){
            orderOptions = [[Centro, 'Calle', 'DESC']];
        }else if(queryParams.ordenar == 11){
            orderOptions = [[Alumno.sequelize.literal("CASE WHEN Estado = 'Muy Bueno' THEN 5 WHEN Estado = 'Bueno' THEN 4 WHEN Estado = 'Normal' THEN 3 WHEN Estado = 'Malo' THEN 2 ELSE 1 END"), 'DESC']];
        }else if(queryParams.ordenar == 12){
            orderOptions =  [[Alumno.sequelize.literal("CASE WHEN Estado = 'Muy Bueno' THEN 5 WHEN Estado = 'Bueno' THEN 4 WHEN Estado = 'Normal' THEN 3 WHEN Estado = 'Malo' THEN 2 ELSE 1 END"), 'ASC']];
        }

        let whereOptions = [
            { Nombre: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
            { Apellidos: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
            { Estado: { [sequelize.Op.like]: `%${textoBusqueda}%` } },
            
            
        ];

        if (req.Rol === 'Centro') {
            whereOptions.push(
                { '$Clase.Nombre$' : { [sequelize.Op.like]: `%${textoBusqueda}%` } },
            );
        }

        if (req.Rol === 'Admin') {
            whereOptions.push(
                { '$Centro.Nombre$' : { [sequelize.Op.like]: `%${textoBusqueda}%` } },
            );
        }

        const alumnos = await Alumno.findAll({
            where: {
                [sequelize.Op.or]: whereOptions
            }, queryOptions,
            ...paginationOptions,
            attributes: { exclude: ['Contraseña'] },
            order: orderOptions,
            include: [
                {
                    model: Clase,
                    attributes: ['Nombre'],
                    as: 'Clase'
                },
                {
                    model: Centro,
                    attributes: ['Nombre'],
                    as: 'Centro'
                }
            ]
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
        
            const datos = req.body;

            const hashedPassword = hashPassword(req.body.Contraseña);
            const ambitos = {"Clase":50,"Amigos":50,"Familia":50,"Emociones":50,"Fuera de clase":50};
            const frecuencia = {"Clase":0,"Amigos":0,"Familia":0,"Emociones":0,"Fuera de clase":0}
            const estado = "Normal";
            const points = 0;
            const newAlumno = { ...req.body, Contraseña: hashedPassword, Usuario: usuario, Estado: estado, Ambitos: ambitos, AparicionAmbitos: frecuencia, Puntos: points};
        
            const createdAlumno = await Alumno.create(newAlumno);
        
            const idAlumno = createdAlumno.ID_Alumno;
            const nomUsuario = generarUsuario(req.body.Nombre, req.body.Apellidos, idAlumno);

            await sendMail(datos, nomUsuario);
        
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

    const sendMail = async (datos, usuario) => {

        const centro = await Centro.findOne({ where: { ID_Centro: datos.ID_Centro } });
        const clase = await Clase.findOne({ where: { ID_Clase: datos.ID_Clase } });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'blooming.abp@gmail.com',
                pass: 'fkpn mfrg bcal qrpb'
            }
        });

        const mailOptions = {
            from: 'blooming.abp@gmail.com',
            to: datos.EmailTutor,
            subject: 'Bienvenido a Blooming',
            text: 
                `Buenas,
                Desde el ${centro.Nombre} le damos la bienvenida a su hijo a la plataforma Blooming. Se le ha matriculado en la clase ${clase.Nombre}.
                Los datos de acceso son:
                Usuario: ${usuario}
                Contraseña: ${datos.Contraseña}
                            
                Un saludo.
                ${centro.Nombre}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el email:', error);
            } else {
                //console.log('Email enviado: ' + info.response);
            }
        });

    }


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

        await Respuesta.destroy({ where: { ID_Alumno: id } });
        await Sesion.destroy({ where: { ID_Alumno: id } });
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

const resetAparicionAmbitos = async () => {
    try {
        const nuevoValorAparicionAmbitos = { "Clase": 0, "Amigos": 0, "Familia": 0, "Emociones": 0, "Fuera de clase": 0 };
        await Alumno.update({ AparicionAmbitos: nuevoValorAparicionAmbitos }, { where: {} }); // Actualiza todos los registros

        //console.log("AparicionAmbitos restablecido exitosamente para todos los alumnos.");
    } catch (error) {
        console.error("Error al restablecer AparicionAmbitos:", error);
    }
};


module.exports = { getAlumnos, createAlumno, updateAlumno, deleteAlumno, resetAparicionAmbitos };