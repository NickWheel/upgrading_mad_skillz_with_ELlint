/* eslint-disable func-names */
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  header: String,
  text: String,
  approved: { type: Boolean, default: false },
  author: String,
  likes: Number,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});


const Model = mongoose.model('article', ArticleSchema);
module.exports = Model;
