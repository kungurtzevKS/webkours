const router = require('express').Router();
const User = require('../models/User');

router.get('/',  async (req, res) => {
    try {
        const users =  await User.findAll({raw: true});

        res.send(JSON.stringify(users, null, 2));
    } catch(err) {
        console.error(err);

        res.sendStatus(501);
    }
});

router.post('/', (req, res) => {
    try {
        User.create({
            login: "Egor",
            password: "123456"
        });

        res.sendStatus(201);
    } catch(err) {
        res.sendStatus(501);
    }
})

module.exports = router;