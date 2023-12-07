const moment = require('moment');

class Alumno {
    ID_Alumno;
    Nombre;
    Apellidos;
    Usuario;
    Contraseña;
    FechaNacimiento;
    ID_Clase;
    Rol;

    toJSON() {
        const { Contraseña, ...alumnoData } = this;
        return alumnoData;
    }

    ajustarFechas() {
        this.FechaNacimiento = moment(this.FechaNacimiento).format('DD-MM-YYYY');
    }
}

module.exports = Alumno;