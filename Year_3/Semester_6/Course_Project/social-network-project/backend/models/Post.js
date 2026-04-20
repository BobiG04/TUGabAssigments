const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

PostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', PostSchema);