const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Импортиране на модела
const Post = require('./models/Post'); 

const app = express();

// Middleware
app.use(cors()); // Позволява заявки от фронтенда
app.use(express.json()); // Позволява четене на JSON от тялото на заявката

// Връзка с базата (използвай твоя свързващ стринг)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешна връзка с MongoDB!'))
  .catch((err) => console.error('Грешка:', err));

// РОУТ 1: Взимане на всички публикации
app.get('/api/posts', async (req, res) => {
  try {
    // Взимаме постовете и ги сортираме от най-нови към най-стари
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Грешка при извличане на публикациите' });
  }
});

// РОУТ 2: Създаване на нова публикация
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сървърът слуша на порт ${PORT}`));