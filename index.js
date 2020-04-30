const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();


// Layout
app.use(expressLayouts);
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users', require('./routes/users'));

app.listen(3000, () => {
  console.log("Started");
});
