class Admin {
    ID_Admin;
    Nombre;
    Email;
    Contraseña;
    Rol;

    toJSON() {
        const { Contraseña, ...adminData } = this;
        return adminData;
    }
}

module.exports = Admin;