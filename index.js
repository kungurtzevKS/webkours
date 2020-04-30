const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const sequalize = require('./ORM');

const app = express();


app.use(expressLayouts);
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render ("index");
});

app.listen(3000, () => {
  console.log('Started');
})