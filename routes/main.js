const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('index', {user: req.user});
})

module.exports = router;