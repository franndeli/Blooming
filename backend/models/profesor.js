const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');

const Profesor = sequelize.define('Profesor', {
    ID_Profesor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ID_Clase: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ID_Centro: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'profesor',
    timestamps: false
});

module.exports = Profesor;