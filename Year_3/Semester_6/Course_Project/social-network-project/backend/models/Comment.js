const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // Референция към публикацията, под която е коментарът
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  // Референция към автора на коментара
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Добавяне на коментар към публикация
app.post('/api/comments', async (req, res) => {
  try {
    const { text, postId, userId } = req.body;

    const newComment = new Comment({
      text,
      post: postId,
      author: userId
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при добавяне на коментар' });
  }
});

module.exports = mongoose.model('Comment', CommentSchema);