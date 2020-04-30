const Sequalizer = require('sequelize');

const sequelize = new Sequalizer(process.env.db, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: "postgres"
});

module.exports = sequelize;