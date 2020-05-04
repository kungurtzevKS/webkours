const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.use(
    new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
        User.findOne({ where: { login } })
            .then(user => {
                if (!user) return done(null, false, { message: 'Нет такого пользователя' });
                const isMatch = bcrypt.compareSync(password, user.password);

                if (isMatch) return done(null, user);
                else return done(null, false, { message: 'Неверный пароль' })
            })
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
        .then(user => done(null, user));
})

module.exports = passport;