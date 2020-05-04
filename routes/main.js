const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/landing', ensureAuthenticated, (req, res) => {
    res.send('Hello!');
})

module.exports = router;