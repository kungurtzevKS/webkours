const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const flash = require('flash');
const passport = require('./config/passport');

const app = express();

//Sesion
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
})

// Layout
app.use(expressLayouts);
app.set("view engine", "ejs");


// Middleares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/users', require('./routes/users'));
app.use('/main', require('./routes/main'));
app.get('/', (req, res) => res.render('index'));


app.listen(3000, () => {
  console.log("Started");
});
