const Sequalizer = require('sequelize');

const sequelize = new Sequalizer('webkours', 'postgres', '123', {
    host: process.env.host,
    dialect: "postgres"
});

module.exports = sequelize;