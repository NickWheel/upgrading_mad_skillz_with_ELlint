const express = require('express');
const UsersModel = require('../models/userModel');
const ArticleModel = require('../models/articleModel');

const router = express.Router();

router.get('/', (req, res) => {
  ArticleModel.find({ approved: true })
    .then((data) => {
      res.render('articles', { articles: data });
    })
    .catch((err) => { if (err) throw err; });
});

module.exports = router;
