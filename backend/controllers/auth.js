const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/jwt');
const Admin = require('../models/admin');
const Centro = require('../models/centro');
const Profesor = require('../models/profesor');
const Alumno = require('../models/alumno');


const token = async (req, res) => {
    const token = req.headers['x-token'];

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { ID, Rol } = jwt.verify(token, process.env.JWTSECRET);

        const usuario = await buscarUsuarioPorIDyRol(ID, Rol);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - usuario no encontrado o rol cambiado'
            });
        }
        const nrol = usuario.Rol;
        const nuevotoken = await generarJWT(usuario);

        return res.json({
            ok: true,
            msg: 'Token válido',
            rol: nrol,
            id: usuario.ID,
            token: nuevotoken
        });

    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
            error: err.message
        });
    }
}


const login = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
        const usuario = await buscarUsuario(Usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos',
                token: ''
            });
        }

        if (usuario.Rol !== usuario.RolEsperado) {
            return res.status(400).json({
                ok: false,
                message: `Rol no autorizado: se esperaba ${usuario.RolEsperado}`,
                token: ''
            });
        }

        const validPassword = bcrypt.compareSync(Contraseña, usuario.Contraseña);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos',
                token: ''
            });
        }

        const { token, userID } = await generarJWT(usuario);
        res.json({
            ok: true,
            message: `login ${usuario.Rol}`,
            rol: usuario.Rol,
            id: userID,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error en login',
            token: ''
        });
    }
};


async function buscarUsuario(usuario) {
    const tablas = [
        { modelo: Alumno, campoUsuario: 'Usuario', rolEsperado: 'Alumno' },
        { modelo: Profesor, campoUsuario: 'Email', rolEsperado: 'Profesor' },
        { modelo: Centro, campoUsuario: 'Email', rolEsperado: 'Centro' },
        { modelo: Admin, campoUsuario: 'Email', rolEsperado: 'Admin' }
    ];

    for (const tabla of tablas) {
        try {
            const usuarioEncontrado = await tabla.modelo.findOne({ where: { [tabla.campoUsuario]: usuario } });
            if (usuarioEncontrado) {
                usuarioEncontrado.RolEsperado = tabla.rolEsperado;
                return usuarioEncontrado;
            }
        } catch (error) {
            console.error(`Error al buscar en el modelo ${tabla.modelo}:`, error);
        }
    }
    return null;
}


async function buscarUsuarioPorIDyRol(id, rolEsperado) {
    try {
        switch (rolEsperado) {
            case 'Alumno':
                return await Alumno.findOne({ where: { ID_Alumno: id, Rol: rolEsperado } });
            case 'Profesor':
                return await Profesor.findOne({ where: { ID_Profesor: id, Rol: rolEsperado } });
            case 'Centro':
                return await Centro.findOne({ where: { ID_Centro: id, Rol: rolEsperado } });
            case 'Admin':
                return await Admin.findOne({ where: { ID_Admin: id, Rol: rolEsperado } });
            default:
                return null;
        }
    } catch (error) {
        console.error(`Error al buscar usuario por ID y rol ${rolEsperado}:`, error);
        return null;
    }
}


module.exports = { token, login };