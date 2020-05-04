const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { forwardAuthenticated, ensureAdmin, ensureAuthenticated } = require('../config/auth');
const passport = require('../config/passport');

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    const {login, password} = req.body;

    if (!login || !password) {
        res.render('login', {errors: [{msg: 'Заполните все поля!'}]});
        return;
    }

    passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Вы вышли из аккаунта!');
    res.redirect('/users/login');
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { login, password, passwordRepeat, isAdmin } = req.body;
    console.log(req.body);

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
        password: bcrypt.hashSync(password, 10),
        isAdmin: isAdmin ? true : false
    };

    try {
        await User.create(newUser);

        req.flash('success_msg', 'Вы успешно зарегестрировались');
        res.status(201).redirect('/users/login');
    } catch(err) {
        console.error(err);
    }
});

router.post('/register-admin', ensureAuthenticated, ensureAdmin,  async (req, res) => {
    const { login, password, passwordRepeat } = req.body;
    console.log(req.body);

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
        res.render('/main');
        return;
    }

    const newUser = {
        login,
        password: bcrypt.hashSync(password, 10),
        isAdmin: true
    };

    try {
        await User.create(newUser);

        req.flash('success_msg', 'Вы успешно зарегестрировали нового админа!');
        res.status(201).redirect('/main/admin');
    } catch(err) {
        console.error(err);
    }
});

module.exports = router;