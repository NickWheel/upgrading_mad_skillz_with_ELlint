const express = require('express');
const Ajv = require('ajv');
const UsersModel = require('../models/userModel');
const userSchema = require('../schemas/userSchema');
const { userController, userRegistration } = require('../controllers/userController');

const router = express.Router();
const ajv = new Ajv();

// GET Home page
router.get('/', userController);

// router.get('/', (req, res) => {
//   UsersModel.find()
//     .then((data) => {
//       res.render('index', { users: data });
//     })
//     .catch((err) => { if (err) throw err; });
// });
// GET registration page
router.get('/reg', (req, res) => {
  res.render('sign_in');
});
// POST registration page
router.post('/reg', async (req, res) => {
  // validation
  const {
    mail, name, surname, phone, dob, login, pwd,
  } = await req.body;
  const validate = await ajv.compile(userSchema);
  const valid = await validate(req.body);
  console.log(`VALIDATION: ${valid}`);
  if (!valid) {
    const { errors } = validate;
    const result = {
      status: 'you are invalid',
    };
    console.log(errors);
    res.json(result);
  } else {
    await userRegistration(mail, name, surname, phone, dob, login, pwd);
    res.redirect('/');
  }
});
// GET login page
router.get('/login', (req, res) => {
  res.render('log_in');
});
// POST login page
router.post('/login', (req, res) => {
  const { login, pwd } = req.body;
  const loginingUser = {
    login,
  };
  UsersModel.findOne(loginingUser)
    .then((data) => {
      const isItOk = data.comparePwd(pwd);
      if (isItOk) {
        res.cookie('hash', `${data.pwd.match(/.{1,5}/)}`).cookie('login', `${data.login}`)
          .end('You are logged in!\nGo on /secret to discover something unusual...');
      } else {
        res.send('Login or password is not ok');
      }
    })
    .catch((err) => { if (err) throw err; });
});

module.exports = router;
