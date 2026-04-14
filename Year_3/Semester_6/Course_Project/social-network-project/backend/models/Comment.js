const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // Референция към публикацията, под която е коментарът
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  // Референция към автора на коментара
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);