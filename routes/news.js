const router = require('express').Router();
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');
const Post = require('../models/Post');
const multer = require('multer');
const fs = require('fs');

const upload = multer({dest: __dirname + "/../views/assets"});

router.get('/', ensureAuthenticated, async (req, res) => {
    const posts = await Post.findAll({raw: true});

    res.render('news', {
        user: req.user,
        activeLink: 'news',
        news: posts
    });
})

router.post('/', ensureAuthenticated, ensureAdmin, upload.single('file'), (req, res) => {
    const { title, text } = req.body;

    const filedata = req.file;
    const tmp_path = filedata.path;
    const target_path = __dirname + '/../views/assets/' + filedata.originalname;

    const src = fs.createReadStream(tmp_path);
    const dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    src.on('end', function() {
        Post.create({
            title,
            text,
            img: `/views/assets/${filedata.originalname}`
        });

        fs.unlinkSync(tmp_path);
        req.flash('success_msg', 'Новость успешно добавлена!');
        res.redirect('/main/admin');
    });

    src.on('error', function(err) { 
        req.flash('error_msg', 'Произошла ошибка, новость не добавлена!');
        res.redirect('/main/admin');
    });
})

module.exports = router;