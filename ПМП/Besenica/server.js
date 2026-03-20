require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Зареждаме CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаваме достъп от всякакви устройства и домейни (задължително за Monaca)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Свързване с MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Успешна връзка с MongoDB Atlas!'))
  .catch(err => console.error('Грешка при свързване с базата:', err));

// Новата схема (включва език и дължина)
const wordSchema = new mongoose.Schema({ 
    text: { type: String, required: true, unique: true },
    lang: { type: String, required: true },
    length: { type: Number, required: true }
});
const Word = mongoose.model('Word', wordSchema);

// Endpoint за първоначално пълнене на базата (решава проблема с празната база)
app.post('/api/seed', async (req, res) => {
    try {
        await Word.deleteMany({}); // Изчистваме стари записи с грешна структура
        const initialWords = [
            { text: 'КОД', lang: 'bg', length: 3 },
            { text: 'БЪГ', lang: 'bg', length: 3 },
            { text: 'УЕБ', lang: 'bg', length: 3 },
            { text: 'МРЕЖА', lang: 'bg', length: 5 },
            { text: 'ЕКРАН', lang: 'bg', length: 5 },
            { text: 'СЪРВЪР', lang: 'bg', length: 6 },
            { text: 'БРАУЗЪР', lang: 'bg', length: 7 },
            { text: 'МОНИТОР', lang: 'bg', length: 7 },
            { text: 'АЛГОРИТЪМ', lang: 'bg', length: 9 },
            { text: 'КОМПЮТЪР', lang: 'bg', length: 8 },
            { text: 'ПРОГРАМИРАНЕ', lang: 'bg', length: 12 },
            { text: 'ПРИЛОЖЕНИЕ', lang: 'bg', length: 10 }
        ];
        await Word.insertMany(initialWords);
        res.send('Успешно добавени начални думи с новата структура!');
    } catch (error) {
        console.error('Грешка при seed:', error);
        res.status(500).send('Грешка при добавяне на думи.');
    }
});

// Основната логика (Външно API -> MongoDB -> Клиент)
app.get('/api/word', async (req, res) => {
    const lang = req.query.lang || 'bg';
    const diff = req.query.diff || 'easy';

    let minLength = 3, maxLength = 5;
    if (diff === 'medium') { minLength = 6; maxLength = 8; }
    else if (diff === 'hard') { minLength = 9; maxLength = 20; }

    try {
        let fetchedWord = "";

        if (lang === 'en') {
            const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
            const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${randomLength}`);
            const data = await response.json();
            fetchedWord = data[0].toUpperCase();
        } else {
            // ВАЖНО: Тук сложи своя RAW линк от GitHub Gist!
            const bgApiUrl = 'ТУК_ПОСТАВИ_ТВОЯ_RAW_GIST_ЛИНК'; 
            
            try {
                const response = await fetch(bgApiUrl);
                if (!response.ok) throw new Error("Грешка при връзката с Gist");
                const allWords = await response.json();
                
                const filteredWords = allWords.filter(w => w.length >= minLength && w.length <= maxLength);
                if (filteredWords.length > 0) {
                    const random = Math.floor(Math.random() * filteredWords.length);
                    fetchedWord = filteredWords[random].toUpperCase();
                } else {
                    throw new Error("Няма думи с тази дължина в API-то");
                }
            } catch (apiErr) {
                console.log("Грешка с външния API, преминаваме към базата данни...", apiErr.message);
                fetchedWord = ""; // Ще го хванем във fallback-а
            }
        }

        // Ако сме взели дума от API-то, я записваме в базата
        if (fetchedWord !== "") {
            const existingWord = await Word.findOne({ text: fetchedWord });
            if (!existingWord) {
                const newWord = new Word({ text: fetchedWord, lang: lang, length: fetchedWord.length });
                await newWord.save();
                console.log(`[DB] Нова дума запазена: ${fetchedWord}`);
            }
            return res.json({ word: fetchedWord });
        } else {
            // FALLBACK: Ако външното API се счупи, теглим директно от запазените в MongoDB
            const fallbackWords = await Word.find({ lang: lang, length: { $gte: minLength, $lte: maxLength } });
            if (fallbackWords.length > 0) {
                const random = Math.floor(Math.random() * fallbackWords.length);
                return res.json({ word: fallbackWords[random].text });
            } else {
                return res.status(404).json({ error: 'Няма подходящи думи нито в API-то, нито в базата данни.' });
            }
        }

    } catch (error) {
        console.error("Генерална грешка:", error);
        res.status(500).json({ error: 'Грешка на сървъра.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});