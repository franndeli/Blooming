const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/configdb');

const Admin = sequelize.define('Admin', {
    ID_Admin: {
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
    Rol: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'admin',
    timestamps: false
  });

module.exports = Admin;