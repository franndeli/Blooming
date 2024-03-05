const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');

const Sesion = sequelize.define('Sesion', {
    ID_Sesion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_Alumno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    FechaFin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ValorAmbitoInicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ValorAmbitoFin: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'sesion',
    timestamps: false 
});

module.exports = Sesion;