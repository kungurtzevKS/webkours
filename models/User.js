const Sequelize = require('sequelize');
const sequelize = require('../ORM');

const UserModel = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    login: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    }
};

const User = sequelize.define('user', UserModel);

module.exports = User;

