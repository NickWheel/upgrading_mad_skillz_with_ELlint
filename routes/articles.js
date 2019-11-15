const express = require('express');
const mongoose = require('mongoose');
const UsersModel = require('../models/userModel');
const ArticleModel = require('../models/articleModel');
const CommentModel = require('../models/commentModel');

const router = express.Router();

router.get('/', (req, res) => {
  ArticleModel.find({ approved: true })
    .then((data) => {
      res.render('articles', { articles: data });
    })
    .catch((err) => { if (err) throw err; });
});
router.get('/:id', (req, res) => {
  // cheking if user is logged
  if (req.cookies.hash && req.cookies.login) {
    UsersModel.findOne({ login: req.cookies.login })
      .then((data) => {
        const firstFiveSymbolsOfPwd = data.pwd.slice(0, 5);
        if (req.cookies.hash === firstFiveSymbolsOfPwd) {
          ArticleModel.find({ approved: true })
            .then((articles) => {
              CommentModel.find()
                .then((comments) => {
                  res.render('certainArticle', {
                    article: articles[req.params.id - 1],
                    logged: true,
                    id: req.params.id,
                    comments,
                  });
                })
                .catch((err) => { if (err) throw err; });
            })
            .catch((err) => { if (err) throw err; });
        } else {
          ArticleModel.find({ approved: true })
            .then((articles) => {
              CommentModel.find()
                .then((comments) => {
                  res.render('certainArticle', {
                    article: articles[req.params.id - 1],
                    logged: false,
                    id: req.params.id,
                    comments,
                  });
                })
                .catch((err) => { if (err) throw err; });
            })
            .catch((err) => { if (err) throw err; });
        }
      })
      .catch((err) => { if (err) throw err; });
  } else {
    res.send('<h1>404</h1> \n\n You are lox without a cookies.');
  }
});
router.post('/comment', (req, res) => {
  const new_comment = new CommentModel({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
  });
  UsersModel.findOne({ login: req.cookies.login })
    .then((user) => {
      new_comment.author = user._id;
      new_comment.save()
        .populate('authors')
        .catch((err) => { if (err) throw err; });
    })
    .catch((err) => { if (err) throw err; });
  // zaebalso, there should be a populate for articles
  // ArticleModel.findOne()
});


module.exports = router;
