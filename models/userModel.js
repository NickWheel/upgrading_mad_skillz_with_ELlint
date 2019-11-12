/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  mail: String,
  name: String,
  surname: String,
  login: String,
  pwd: String,
  dob: Date,
  phone: String,
  admin: Boolean,
});

// DB method takes a pwd from req.body and then hashes it.
UserSchema.methods.hashingPwd = async (pwdToHash) => {
  const hashedPwd = await bcrypt.hash(pwdToHash, saltRounds);
  return hashedPwd;
};
// DB method compares a registered user's hashed pwd(.this) with
// loginning user's entered pwd.
UserSchema.methods.comparePwd = async function (loginningUserPwd) {
  const isPwdOk = await bcrypt.compare(loginningUserPwd, this.pwd);
  return isPwdOk;
};

const Model = mongoose.model('User', UserSchema);
module.exports = Model;
