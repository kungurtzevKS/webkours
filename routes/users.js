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

    const errors = [];

    if (!login || !password || !passwordRepeat) {
        errors.push({msg: 'Заполните все поля!'});
    };

    if (password !== passwordRepeat) {
        errors.push({msg: 'Пароли не совпадают!'});
    };

    const user = await User.findOne({where:{login}});

    if (user) {
        errors.push({msg: 'Имя занято!'});
    };

    if (errors.length > 0) {
        res.render('register', {errors});
        return;
    }

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