const { sequelize } = require('../database/configdb');
const { DataTypes } = require('sequelize');

const Clase = sequelize.define('Clase', {
    ID_Clase: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NumAlumnos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_Centro: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'clase',
    timestamps: false
});

module.exports = Clase;