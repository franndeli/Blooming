const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');
const moment = require('moment');

const Respuesta = sequelize.define('Respuesta', {
    ID_Respuesta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TextoPregunta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TextoRespuesta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_Alumno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FechaRespuesta: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        },
        get() {
            return moment.utc(this.getDataValue('FechaRespuesta')).format('DD-MM-YYYY');
        }
    },
    ID_Sesion: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'respuesta',
    timestamps: false
});

module.exports = Respuesta;
