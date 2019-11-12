/* eslint-disable func-names */
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  header: String,
  text: String,
  approved: Boolean,
  author: String,
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});


const Model = mongoose.model('article', ArticleSchema);
module.exports = Model;
