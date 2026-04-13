const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  // Референция към автора на публикацията
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Създаване на нова публикация
app.post('/api/posts', async (req, res) => {
  try {
    const { content, userId } = req.body;
    
    const newPost = new Post({
      content,
      author: userId
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при създаване на публикация' });
  }
});

// В PostSchema (за бързо сортиране на фийда по време)
PostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', PostSchema);