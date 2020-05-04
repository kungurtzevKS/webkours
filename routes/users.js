const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { forwardAuthenticated } = require('../config/auth');
const passport = require('../config/passport');

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/main/landing',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { login, password, passwordRepeat } = req.body;

    if (!login || !password || !passwordRepeat) {
        req.flash('error_msg', 'Заполните все поля!');
        res.render('register');
        return;
    };

    if (password !== passwordRepeat) {
        req.flash('error_msg', 'Пароли не совпадают!');
        res.render('register');
        return;
    };

    const user = await User.findOne({where:{login}});

    if (user) {
        req.flash('error_msg', 'Имя занято!');
        res.render('register');
        return;
    };

    const newUser = {
        login,
        password: bcrypt.hashSync(password, 10)
    };

    try {
        await User.create(newUser);

        res.status(201).redirect('/users/login');
    } catch(err) {
        console.error(err);
    }
});



module.exports = router;