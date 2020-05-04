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
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

const User = sequelize.define('user', UserModel);
sequelize.sync();

// Hard code of admin...

const bcrypt = require('bcryptjs');

User.findOne({ where: { login: 'admin' } })
  .then(user => {
    if (!user) {
      User.create({
        login: 'admin',
        password: bcrypt.hashSync('admin'),
        isAdmin: true
      });
    }
  });


module.exports = User;

