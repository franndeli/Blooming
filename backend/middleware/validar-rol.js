const validarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        const usuarioRol = req.Rol;
        if (rolesPermitidos.includes(usuarioRol)) {
            next();
        } else {
            return res.status(403).json({ msg: 'Acceso denegado: rol no autorizado para esta operación' });
        }
    };
};

module.exports = { validarRol }