const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');

const Opcion = sequelize.define('Opcion', {
    ID_Opcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TextoOpcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_Pregunta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gravedad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Imagen: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'opcion',
    timestamps: false
});

module.exports = Opcion;
