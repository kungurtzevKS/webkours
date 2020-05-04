const router = require('express').Router();
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index', {
        user: req.user,
        activeLink: 'index'
    });
})

router.get('/admin', ensureAuthenticated, ensureAdmin, (req, res) => {
    res.render('admin', {
        user: req.user,
        activeLink: 'admin'
    });
});

router.get('/news', ensureAuthenticated, (req, res) => {
    res.render('news', {
        user: req.user,
        activeLink: 'news'
    });
})

module.exports = router;