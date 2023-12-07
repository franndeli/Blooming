class Centro {
    ID_Centro;
    Nombre;
    Email;
    Contraseña;
    Localidad;
    Provincia;
    Calle;
    CP;
    Rol;

    toJSON() {
        const { Contraseña, ...centroData } = this;
        return centroData;
    }
}

module.exports = Centro;