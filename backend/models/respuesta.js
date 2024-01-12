class Respuesta {
    ID_Respuesta;
    Respuesta;
    ID_Alumno;
    ID_Pregunta;
    FechaRespuesta;
    ID_Sesion;

    toJSON() {
        return { ...this };
    }
}

module.exports = Respuesta;