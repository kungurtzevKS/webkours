module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        };

        req.flash('error_msg', 'Необходима авторизация!');
        res.redirect('/users/login');
    },
    
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        };

        res.redirect('/main/');
    },

    ensureAdmin: (req, res, next) => {
        if(req.user.isAdmin) {
            return next();
        };

        return res.redirect('/main');
    }
};