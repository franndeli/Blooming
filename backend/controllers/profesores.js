const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Clase = require('../models/clase');
const nodemailer = require('nodemailer');
const Centro = require('../models/centro');
const Profesor = require('../models/profesor');
const sequelize = require('../database/configdb');
const hashPassword = require('../middleware/hashHelper');



const getProfesores = async (req, res) => {
    try {
        const tam = Number(req.query.numFilas) || 0;
        const desde = Number(req.query.desde) || 0;
        const pwd = req.query.pwd || false;
        const queryParams = req.query;

        const validParams = ['ID_Profesor', 'Nombre', 'Apellidos', 'Email', 'Contraseña', 'ID_Clase', 'ID_Centro', 'desde', 'numFilas', 'pwd'];

        const isValidQuery = Object.keys(queryParams).every(param => validParams.includes(param));
        if (!isValidQuery) {
            return res.status(400).json({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Profesores" });
        }
        
        const queryOptions = {};
        for (const param in queryParams) {
            if (validParams.includes(param) && param !== 'numFilas' && param !== 'desde' && param !== 'pwd') {
                if (param === 'ID_Profesor') {
                    queryOptions[param] = queryParams[param];
                } else if(param === 'ID_Centro'){
                    queryOptions[param] = queryParams[param];
                } else {
                    queryOptions[param] = { [sequelize.Op.like]: `%${queryParams[param]}%` };
                }
            }
        }

        const paginationOptions = tam > 0 ? { limit: tam, offset: desde } : {};

        const profesores = await Profesor.findAll({
            where: queryOptions,
            ...paginationOptions,
            attributes: { exclude: pwd ? [] : ['Contraseña'] },
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

        const total = await Profesor.count({ where: queryOptions});

        res.json({
            ok: true,
            msg: 'getProfesores',
            profesores,
            page: {
                desde,
                tam,
                total
            }
        });
    } catch (error) {
        console.error("Error al obtener los profesores:", error);
        res.status(500).json({ statusCode: 500, message: "Error al obtener los profesores" });
    }
}


const createProfesor = async (req, res) => {
    try {
        const { Email, ID_Centro } = req.body;
        const existProfesor = await Profesor.findOne({ where: { Email, ID_Centro } });
        if (existProfesor) {
            return res.status(400).json({ ok: false, msg: 'Ya existe esta profesor en el centro' });
        }

        const datos = req.body;
        await sendMail(datos);

        const hashedPassword = hashPassword(req.body.Contraseña);
        req.body.Contraseña = hashedPassword;

        const nuevoProfesor = await Profesor.create(req.body);

        delete nuevoProfesor.dataValues.Contraseña;

        res.json({
            ok: true, 
            msg: 'createProfesor',
            nuevoProfesor
        });
    } catch (error) {
        console.error("Error al crear el profesor:", error);
        res.status(500).json({ ok: false, msg: 'Error al crear el profesor' });
    }
};

    const sendMail = async (datos) => {

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
            to: datos.Email,
            subject: 'Bienvenido a Blooming',
            text: 
`Buenas ${datos.Nombre} ${datos.Apellidos},
Desde el ${centro.Nombre} le damos la bienvenida a la plataforma Blooming. Le informamos además que se ha creado su cuenta en la misma y se le ha asignado como tutor de la clase ${clase.Nombre}.
Sus datos de acceso son:
Email: ${datos.Email}
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


const updateProfesor = async (req, res) => {
    try {
        const id = req.params.ID_Profesor;

        const existProfesor = await Profesor.findByPk(id);
        if (!existProfesor) {
            return res.status(404).json({ statusCode: 404, message: "Profesor no encontrado" });
        }

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        const [updatedRowsCount, updatedProfesor] = await Profesor.update(req.body, { where: { ID_Profesor: id } });

        res.json({
            ok: true,
            msg: 'updateProfesor',
            updatedProfesor
        });
    } catch (error) {
        console.error("Error al actualizar el profesor:", error);
        res.status(500).json({ statusCode: 500, message: "Error al actualizar el profesor" });
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

const updateProfesorPwd = async (req, res) => {
    try {
        const token = req.header('x-token');
        const id = parseInt(req.params.ID_Profesor, 10);
        const { Contraseña, newPassword, newPassword2 } = req.body;
            
        const decodedToken = verify(token);
        if (!(verify(token).Rol == 'Profesor' && verify(token).ID == id)) {
            return res.status(400).json({
                ok: false,
                message: 'No tienes permisos para actualizar la contraseña',
            });
        }
            
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({
                ok: false,
                message: 'Profesor no encontrado',
            });
        }
        
        const pwdOk = await bcrypt.compare(Contraseña, profesor.Contraseña);
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
            profesor.Contraseña = hashedPassword;
            await profesor.save();
        }
            
        return res.json({
            ok: true,
            msg: 'Contraseña actualizada del Profesor'
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña del profesor:", error);
        return res.status(500).json({ statusCode: 500, message: "Error al cambiar la contraseña" });
    }
};


const deleteProfesor = async (req, res) => {
    try {
        const id = req.params.ID_Profesor;
        
        const profesor = await Profesor.findByPk(id);

        if (!profesor) {
            return res.status(404).json({ ok: false, message: "Profesor no encontrado" });
        }

        await profesor.destroy();

        return res.json({ ok: true, msg: 'deleteProfesor' });
    } catch (error) {
        console.error("Error al eliminar el profesor:", error);
        return res.status(500).json({ ok: false, message: "Error al eliminar el profesor" });
    }
};


module.exports = { getProfesores, createProfesor, updateProfesor, deleteProfesor, updateProfesorPwd };