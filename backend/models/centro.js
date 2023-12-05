class Centro {
    ID_Centro;
    Nombre;
    Email;
    Contraseña;
    Localidad;
    Provincia;
    Calle;
    CP;

    toJSON() {
        const { Contraseña, ...centroData } = this;
        return centroData;
    }
}

module.exports = Centro;