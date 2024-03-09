const { sequelize } = require('../database/configdb');
const { DataTypes } = require('sequelize');
const moment = require('moment');

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
        allowNull: false,
        validate: {
            isDate: true
        },
        get() {
            const fechaInicio = this.getDataValue('FechaInicio');
            return {
                Fecha: moment.utc(fechaInicio).format('YYYY-MM-DD'),
                Hora: moment.utc(fechaInicio).format('HH:mm:ss')
            };
        }
    },
    FechaFin: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        },
        get() {
            const fechaFin = this.getDataValue('FechaFin');
            return {
                Fecha: moment.utc(fechaFin).format('DD-MM-YYYY'),
                Hora: moment.utc(fechaFin).format('HH:mm:ss')
            };
        }
    },
    ValorAmbitoInicio: {
        type: DataTypes.JSON,
        allowNull: false
    },
    ValorAmbitoFin: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'sesion',
    timestamps: false 
});

module.exports = Sesion;