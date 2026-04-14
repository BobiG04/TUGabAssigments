const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  // Референция към автора на публикацията
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// В PostSchema (за бързо сортиране на фийда по време)
PostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', PostSchema);