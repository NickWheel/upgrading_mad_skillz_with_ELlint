const express = require('express');
const UsersModel = require('../models/userModel');
const ArticleModel = require('../models/articleModel');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.hash && req.cookies.login) {
    UsersModel.findOne({ login: req.cookies.login })
      .then((data) => {
        if (req.cookies.hash === data.pwd.slice(0, 5)) {
          if (data.admin === true) {
            ArticleModel.find({ approved: false })
              .then((notApprovedArticles) => {
                res.render('adminPanel', { notApprovedArticles });
              })
              .catch((err) => { if (err) throw err; });
          } else {
            res.send('<h2>404</h2> you are not admin bro!');
          }
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
  ArticleModel.findOne({ _id: req.body.id })
    .then((data) => {
      data.approved = true;
      data.save();
    })
    .catch((err) => { if (err) throw err; });
  res.redirect('adminPanel');
});

module.exports = router;
