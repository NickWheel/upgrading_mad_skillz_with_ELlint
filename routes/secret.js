const express = require('express');
const UsersModel = require('../models/userModel');

const router = express.Router();

// GET secret page. Only logged users cat get access to this page
router.get('/', (req, res) => {
  if (req.cookies.hash && req.cookies.login) {
    UsersModel.findOne({ login: req.cookies.login })
      .then((data) => {
        const firstFiveSymbolsOfPwd = data.pwd.slice(0, 5);
        if (req.cookies.hash === firstFiveSymbolsOfPwd) {
          res.send('YOUR MOM GAY');
        } else {
          res.send('you are lox without a cookies bliat!');
        }
      })
      .catch((err) => { if (err) throw err; });
  } else {
    res.send('<h1>404</h1> \n\n You are lox without a cookies.');
  }
});
// GET unlogin page. Unlogs user if he was logged in
router.get('/eat', (req, res) => {
  if (req.cookies.login && req.cookies.hash) {
    res.clearCookie('login').clearCookie('hash');
    res.send('OMMM-NOM-NOM-NOM-NOM');
  } else {
    res.send('<h1>404</h1> \n\n go for a cookie donbass');
  }
});

module.exports = router;
