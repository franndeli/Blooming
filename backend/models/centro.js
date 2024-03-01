const { sequelize } = require('../database/configdb');
const { DataTypes } = require('sequelize');

const Centro = sequelize.define('Centro', {
    ID_Centro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
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
    Localidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Provincia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Calle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CP: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Rol: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'centro',
    timestamps: false
});

module.exports = Centro;