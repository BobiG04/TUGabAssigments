const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешна връзка с MongoDB!'))
  .catch((err) => console.error('Грешка при свързване:', err));

// --- РОУТОВЕ ЗА ПОТРЕБИТЕЛИ ---

app.post('/api/users/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Потребител с този имейл вече съществува!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: `${firstName} ${lastName}`,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'Успешна регистрация!', userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: 'Грешка при регистрация' });
  }
});

// Вход (Login)
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Грешен имейл или парола!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Грешен имейл или парола!' });
    }

    res.status(200).json({ message: 'Успешен вход!', userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Грешка при вход' });
  }
});

// --- РОУТОВЕ ЗА ПУБЛИКАЦИИ ---
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username') 
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при извличане' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { content, author } = req.body;
    const newPost = new Post({ content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при създаване' });
  }
});

app.get('/', (req, res) => {
  res.send('Бекенд API-то за социалната мрежа работи успешно!');
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Потребителят не е намерен' });
  }
});

app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при зареждане на коментарите' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { text, postId, userId } = req.body;
    const newComment = new Comment({ text, post: postId, author: userId });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при добавяне на коментар' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сървърът слуша на порт ${PORT}`));