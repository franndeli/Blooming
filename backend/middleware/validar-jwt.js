const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(400).json({
            ok: false,
            message: 'Falta token de autorización'
        });
    }

    try {
        const { ID, Rol } = jwt.verify(token, process.env.JWTSECRET);
        console.log(ID);
        console.log(jwt.verify(token, process.env.JWTSECRET));
        req.ID = ID;
        req.Rol = Rol;
        next();
    } catch (err) {
        return res.status(400).json({
            ok: false,
            message: 'Token no válido'
        })
    }
};


module.exports = { validarJWT }