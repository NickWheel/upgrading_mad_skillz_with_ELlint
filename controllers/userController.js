
const UsersModel = require('../models/userModel');

module.exports.userController = (req, res) => {
  UsersModel.find()
    .then((data) => {
      res.render('index', { users: data });
    })
    .catch((err) => { if (err) throw err; });
};
module.exports.userRegistration = async (mail, name, surname, phone, dob, login, pwd) => {
  try {
    const newUser = await new UsersModel({
      mail,
      name,
      surname,
      phone,
      dob,
      login,
    });
    // hashing a pwd
    const hashedPwd = await newUser.hashingPwd(pwd);
    newUser.pwd = hashedPwd;
    const data = await newUser.save();
    return data;
  } catch (err) {
    if (err) throw err;
  }
};
// module.exports.userLogin = async (login, pwd) => {
//   try {
    
//   } catch (err) {
//     if (err) throw err;
//   }
// };
