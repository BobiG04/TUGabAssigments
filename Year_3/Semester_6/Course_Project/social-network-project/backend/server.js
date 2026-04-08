const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Свързване с MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешна връзка с MongoDB Atlas!'))
  .catch((err) => console.error('Грешка при свързване с базата:', err));

// Тестов роут
app.get('/', (req, res) => {
  res.send('API-то работи!');
});

app.listen(PORT, () => {
  console.log(`Сървърът е стартиран на порт ${PORT}`);
});