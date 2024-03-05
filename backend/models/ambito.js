const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/configdb');

const Ambito = sequelize.define('Ambito', {
    ID_Ambito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        tableName: 'ambito',
        timestamps: false
});

module.exports = Ambito;