const Sequalizer = require('sequelize');

// Models
const userModel = require('./models/User');

const sequelize = new Sequalizer("koursbd", "postgres", "admin", {
    dialect: "postgres"
});

// Sequlize models
const User = sequelize.define('user', userModel);


sequelize.sync()
    .then(() => console.log('ok'))
    .then(err => console.error(err));

module.exports = sequelize;