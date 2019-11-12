const express = require('express');
const UsersModel = require('../models/userModel');
const ArticleModel = require('../models/articleModel');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.hash && req.cookies.login) {
    UsersModel.findOne({ login: req.cookies.login })
      .then((data) => {
        if (req.cookies.hash === data.pwd.slice(0, 5)) {
          res.render('/userPanel', { author: data.login });
        } else {
          res.send('you are not logged in, dude!');
        }
      })
      .catch((err) => { if (err) throw err; });
  } else {
    res.send('you are not logged in, dude!');
  }
});
router.post('/', (req, res) => {
  const article = new ArticleModel({
    header: req.body.header,
    text: req.body.text,
    approved: false,
    author: req.body.author,
  });
  article.save();
  res.redirect('/userPanel');
});

module.exports = router;
