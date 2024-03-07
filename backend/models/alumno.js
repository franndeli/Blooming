const { sequelize } = require('../database/configdb');
const { DataTypes } = require('sequelize');
const moment = require('moment');

const Alumno = sequelize.define('Alumno', {
    ID_Alumno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        },
        get() {
            return moment.utc(this.getDataValue('FechaNacimiento')).format('DD-MM-YYYY');
        }
    },
    ID_Centro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_Clase: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Estado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Ambitos: {
        type: DataTypes.JSON,
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'alumno',
    timestamps: false
});


module.exports = Alumno;