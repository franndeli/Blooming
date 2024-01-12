class Pregunta {
    ID_Pregunta;
    TextoPregunta;

    toJSON() {
        return { ...this };
    }
}

module.exports = Pregunta;