const jwt = require('jsonwebtoken');

const generarJWT = (ID, Rol) => {
    return new Promise((resolve, reject) => {
        const payload = { ID, Rol }

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
}

module.exports = { generarJWT }