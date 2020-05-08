const Sequalizer = require('sequelize');

const sequelize = new Sequalizer({
    dialect: 'sqlite',
    storage: __dirname + '/webkourse.db'
});

module.exports = sequelize;