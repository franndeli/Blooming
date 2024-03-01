const Sequelize = require('sequelize');

const sequelize = new Sequelize('blooming', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports = { sequelize, Op: Sequelize.Op };