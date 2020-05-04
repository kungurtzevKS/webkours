const Sequalizer = require('sequelize');

const sequelize = new Sequalizer('webkours', 'egor', '123', {
    host: process.env.host,
    dialect: "postgres"
});

module.exports = sequelize;