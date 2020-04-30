const express = require('express');
const lay = require("express-ejs-layouts");
const app = express();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("koursbd", "postgres", "admin", {
  dialect: "postgres"
});

const User = sequelize.define("user", {
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
  });

  sequelize.sync().then(result=>console.log(result))
  .catch(err=> console.log(err));


app.use(lay);
app.set("view engine", "ejs");

app.get('/', (req, res) => {

res.render ("index");
});

app.listen(3000, () => {
console.log('Started');
})