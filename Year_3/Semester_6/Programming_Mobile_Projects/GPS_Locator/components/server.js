const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Указваме пътя към родителската директория (там, където са index.html, app.js и т.н.)
const publicDirectoryPath = path.join(__dirname, '..');

// Казваме на Express да обслужва статичните файлове от горната папка
app.use(express.static(publicDirectoryPath));

// При заявка към основния URL (/) връщаме index.html от горната папка
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Сървърът е стартиран успешно от папка components!`);
    console.log(`📍 Отвори: http://localhost:${PORT}`);
    console.log(`Натисни Ctrl + C, за да го спреш.`);
});