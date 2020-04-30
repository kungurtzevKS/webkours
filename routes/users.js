const router = require('express').Router();
const User = require('../models/User');

router.get('/',  (req, res) => {
    try {
        const users =  User.findAll({raw: true});

        res.send(users);
    } catch(err) {
        console.error(err);

        res.sendStatus(501);
    }
});

module.exports = router;