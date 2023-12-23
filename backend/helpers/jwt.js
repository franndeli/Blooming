const jwt = require('jsonwebtoken');

const generarJWT = (usuario) => {
    return new Promise((resolve, reject) => {
        // Seleccionar el ID adecuado según el tipo de usuario
        const ID = usuario.ID_Admin || usuario.ID_Profesor || usuario.ID_Centro || usuario.ID_Alumno;
        const Rol = usuario.Rol;

        if (!ID) {
            console.error("Error: El ID no está definido en el usuario", usuario);
            reject('ID no definido en el usuario');
            return;
        }

        const payload = { ID, Rol };

        console.log("Generando JWT con ID:", ID, "y Rol:", Rol);

        jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: '1y'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                console.log("Token generado:", token);
                resolve(token);
            }
        });
    });
};


module.exports = { generarJWT }