const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        // Seleccionar el ID adecuado según el tipo de usuario
        const ID = usuario.ID_Admin || usuario.ID_Profesor || usuario.ID_Centro || usuario.ID_Alumno;
        const Rol = usuario.Rol;

        const payload = { ID, Rol };

        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: '1y'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};


module.exports = { generarJWT }