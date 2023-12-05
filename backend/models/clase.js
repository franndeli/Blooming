class Clase {
    ID_Clase;
    Nombre;
    NumAlumnos;
    ID_Centro;

    toJSON() {
        return { ...this };
    }
}

module.exports = Clase;