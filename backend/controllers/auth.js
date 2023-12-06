const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const login = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
        connection.query('SELECT * FROM alumno WHERE Usuario = ?', [Usuario], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error en login',
                    token: ''
                });
            }

            if (results.length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o contraseña incorrectos',
                    token: ''
                });
            }

            const alumnoBD = results[0];
            const validPassword = bcrypt.compareSync(Contraseña, alumnoBD.Contraseña);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario o contraseña incorrectos',
                    token: ''
                });
            } else {
                const token = await generarJWT(alumnoBD.ID_Alumno);

                res.json({
                    ok: true,
                    msg: 'login',
                    token // Asegúrate de generar un token real aquí
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

module.exports = { login }