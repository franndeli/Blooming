const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
        const usuario = await buscarUsuario(Usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos',
                token: ''
            });
        }

        // Comprobar si el rol almacenado coincide con el esperado
        if (usuario.Rol !== usuario.RolEsperado) {
            return res.status(400).json({
                ok: false,
                msg: `Rol no autorizado: se esperaba ${usuario.RolEsperado}`,
                token: ''
            });
        }

        const validPassword = bcrypt.compareSync(Contraseña, usuario.Contraseña);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos',
                token: ''
            });
        }

        const token = await generarJWT(usuario.ID_Alumno || usuario.ID_Profesor || usuario.ID_Centro, usuario.Rol);
        res.json({
            ok: true,
            msg: `login ${usuario.Rol}`,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en login',
            token: ''
        });
    }
};

async function buscarUsuario(usuario) {
    const tablas = [
        { nombre: 'alumno', campoUsuario: 'Usuario', rolEsperado: 'Alumno' },
        { nombre: 'profesor', campoUsuario: 'Email', rolEsperado: 'Profesor' },
        { nombre: 'centro_escolar', campoUsuario: 'Email', rolEsperado: 'Centro' },
        { nombre: 'admin', campoUsuario: 'Email', rolEsperado: 'Admin' }
    ];

    for (const tabla of tablas) {
        const query = `SELECT *, ? as RolEsperado FROM ${tabla.nombre} WHERE ${tabla.campoUsuario} = ?`;
        try {
            const results = await consultaAsync(query, [tabla.rolEsperado, usuario]);
            if (results && results.length > 0) {
                return results[0];
            }
        } catch (error) {
            console.error(`Error en la consulta a la tabla ${tabla.nombre}:`, error);
        }
    }
    return null;
}

function consultaAsync(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports = { login };
