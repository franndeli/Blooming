class opciones {
    ID_Opcion;
    TextoOpcion;
    ID_Pregunta;
    ID_PreguntaSiguiente;

    toJSON() {
        return { ...this };
    }
}

module.exports = opciones;