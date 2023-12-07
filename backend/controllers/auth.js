const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
        // Verifica primero en la tabla de alumnos
        connection.query('SELECT *, "Alumno" as Rol FROM alumno WHERE Usuario = ?', [Usuario], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error en login',
                    token: ''
                });
            }

            if (results.length > 0) {
                // Usuario encontrado en la tabla de alumnos
                return procesarLogin(results[0], Contraseña, res);
            } else {
                // Si no es alumno, verificar si es profesor
                connection.query('SELECT *, "Profesor" as Rol FROM profesor WHERE Email = ?', [Usuario], async (error, results) => {
                    if (results.length > 0) {
                        // Usuario encontrado en la tabla de profesores
                        return procesarLogin(results[0], Contraseña, res);
                    } else {
                        // Si no es profesor, verificar si es centro escolar
                        connection.query('SELECT *, "Centro" as Rol FROM centro_escolar WHERE Email = ?', [Usuario], async (error, results) => {
                            if (results.length > 0) {
                                // Usuario encontrado en la tabla de centros escolares
                                return procesarLogin(results[0], Contraseña, res);
                            } else {
                                // Usuario no encontrado
                                return res.status(400).json({
                                    ok: false,
                                    msg: 'No existe en ninguna tabla',
                                    token: ''
                                });
                            }
                        });
                    }
                });
            }
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

const procesarLogin = async (usuario, contraseña, res) => {
    const validPassword = bcrypt.compareSync(contraseña, usuario.Contraseña);
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario o contraseña incorrectos una vez validado',
            token: '',
        });
    } else {
        const token = await generarJWT(usuario.ID_Alumno || usuario.ID_Profesor || usuario.ID_Centro, usuario.Rol);
        res.json({
            ok: true,
            msg: `login ${usuario.Rol}`,
            token
        });
    }
};

module.exports = { login }