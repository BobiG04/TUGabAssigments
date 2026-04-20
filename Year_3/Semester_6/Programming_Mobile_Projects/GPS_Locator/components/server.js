const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Обслужване на статичните файлове (index.html) от главната папка
app.use(express.static(path.join(__dirname, '../')));

// Ендпоинт, от който клиентът ще си взима ключа
app.get('/api-config', (req, res) => {
    res.json({
        apiKey: process.env.GOOGLE_MAPS_API_KEY
    });
});

app.listen(PORT, () => {
    console.log(`Сървърът работи на: http://localhost:${PORT}`);
});