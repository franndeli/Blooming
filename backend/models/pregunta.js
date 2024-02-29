const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');

const Pregunta = sequelize.define('Pregunta', {
    ID_Pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TextoPregunta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TipoPregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AmbitoPregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NivelPregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'pregunta',
    timestamps: false
});

module.exports = Pregunta;
