class Profesor {
    ID_Profesor;
    Nombre;
    Apellidos;
    Email;
    Contraseña;
    ID_Clase;
    ID_Centro;
    
    toJSON() {
        const { Contraseña, ...profesorData } = this;
        return profesorData;
    }
}



module.exports = Profesor;