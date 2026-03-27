require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаваме достъп от всякакви устройства (важно за мобилното приложение на Monaca)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Свързване с MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Успешна връзка с MongoDB Atlas!'))
    .catch(err => console.error('Грешка при свързване с базата:', err));

// Схема на базата данни (вече включва и категория)
const wordSchema = new mongoose.Schema({
    text: { type: String, required: true, unique: true },
    lang: { type: String, required: true },
    length: { type: Number, required: true },
    category: { type: String, required: true }
});
const Word = mongoose.model('Word', wordSchema);

// Endpoint за първоначално пълнене на базата (Seed)
app.get('/api/seed', async (req, res) => {
    try {
        await Word.deleteMany({});
        const initialWords = [
            // ИТ и Технологии
            { text: 'КОД', lang: 'bg', length: 3, category: 'it' },
            { text: 'БЪГ', lang: 'bg', length: 3, category: 'it' },
            { text: 'МРЕЖА', lang: 'bg', length: 5, category: 'it' },
            { text: 'СЪРВЪР', lang: 'bg', length: 6, category: 'it' },
            { text: 'ЛАПТОП', lang: 'bg', length: 6, category: 'it' },
            { text: 'ЕКРАН', lang: 'bg', length: 5, category: 'it' },
            { text: 'БРАУЗЪР', lang: 'bg', length: 7, category: 'it' },
            { text: 'АЛГОРИТЪМ', lang: 'bg', length: 9, category: 'it' },
            { text: 'ИНЖЕНЕР', lang: 'bg', length: 7, category: 'it' },
            { text: 'СТУДЕНТ', lang: 'bg', length: 7, category: 'it' },
            { text: 'ПРИЛОЖЕНИЕ', lang: 'bg', length: 10, category: 'it' },
            
            // География
            { text: 'ЯНТРА', lang: 'bg', length: 5, category: 'geography' },
            { text: 'ВРАЦА', lang: 'bg', length: 5, category: 'geography' },
            { text: 'СОФИЯ', lang: 'bg', length: 5, category: 'geography' },
            { text: 'ГАБРОВО', lang: 'bg', length: 7, category: 'geography' },
            { text: 'ШИПКА', lang: 'bg', length: 5, category: 'geography' },
            { text: 'БАЛКАН', lang: 'bg', length: 6, category: 'geography' },
            { text: 'АПРИЛОВ', lang: 'bg', length: 7, category: 'geography' },
            { text: 'ПЛАНИНА', lang: 'bg', length: 7, category: 'geography' },
            
            // Животни
            { text: 'КУЧЕ', lang: 'bg', length: 4, category: 'animals' },
            { text: 'КОТКА', lang: 'bg', length: 5, category: 'animals' },
            { text: 'ЖИРАФ', lang: 'bg', length: 5, category: 'animals' },
            { text: 'ДЕЛФИН', lang: 'bg', length: 6, category: 'animals' },
            { text: 'ПЕЛЕКАН', lang: 'bg', length: 7, category: 'animals' },
            { text: 'ПИНГВИН', lang: 'bg', length: 7, category: 'animals' },
            { text: 'КРОКОДИЛ', lang: 'bg', length: 8, category: 'animals' }
        ];
        await Word.insertMany(initialWords);
        res.send('Успешно добавени начални думи с категории!');
    } catch (error) {
        console.error('Грешка при seed:', error);
        res.status(500).send(`Грешка при добавяне: ${error.message}`);
    }
});

// Основната логика (Външно API -> MongoDB -> Клиент)
app.get('/api/word', async (req, res) => {
    const lang = req.query.lang || 'bg';
    const diff = req.query.diff || 'easy';
    const category = req.query.category || 'all';

    // Определяме търсената дължина
    let minLength = 3, maxLength = 5;
    if (diff === 'medium') { minLength = 6; maxLength = 8; }
    else if (diff === 'hard') { minLength = 9; maxLength = 20; }

    // Подготвяме филтъра за базата данни
    let dbQuery = { lang: lang, length: { $gte: minLength, $lte: maxLength } };
    if (category !== 'all') {
        dbQuery.category = category;
    }

    try {
        let fetchedWord = "";
        let fetchedCategory = category === 'all' ? 'general' : category;

        // 1. Опит за взимане на дума от външни API-та
        try {
            if (lang === 'en') {
                // Английски API (връща само случайни думи по дължина)
                const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
                const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${randomLength}`);
                if (response.ok) {
                    const data = await response.json();
                    fetchedWord = data[0].toUpperCase();
                }
            } else {
                // Български API (от твоя GitHub Gist обект)
                // ВАЖНО: Замести линка долу с твоя RAW Gist URL!
                const bgApiUrl = 'ТУК_ПОСТАВИ_ТВОЯ_RAW_GIST_ЛИНК';

                if (bgApiUrl.includes('ТУК_ПОСТАВИ')) {
                    throw new Error("Външният линк за речник все още не е настроен.");
                }

                const response = await fetch(bgApiUrl);

                if (response.ok) {
                    const allData = await response.json();
                    let wordsToChooseFrom = [];

                    if (category === 'all') {
                        for (let cat in allData) {
                            wordsToChooseFrom = wordsToChooseFrom.concat(allData[cat]);
                        }
                    } else if (allData[category]) {
                        wordsToChooseFrom = allData[category];
                    }

                    const filteredWords = wordsToChooseFrom.filter(w => w.length >= minLength && w.length <= maxLength);
                    if (filteredWords.length > 0) {
                        const random = Math.floor(Math.random() * filteredWords.length);
                        fetchedWord = filteredWords[random].toUpperCase();
                    }
                }
            }
        } catch (apiErr) {
            console.log("Външният API е недостъпен, преминаваме директно към базата...", apiErr.message);
        }

        // 2. Ако сме изтеглили дума от API, запазваме я в MongoDB (кеширане)
        if (fetchedWord !== "") {
            const existingWord = await Word.findOne({ text: fetchedWord });
            if (!existingWord) {
                const newWord = new Word({
                    text: fetchedWord,
                    lang: lang,
                    length: fetchedWord.length,
                    category: fetchedCategory
                });
                await newWord.save();
                console.log(`[DB] Нова дума запазена: ${fetchedWord}`);
            }
            return res.json({ word: fetchedWord });
        }

        // 3. FALLBACK: Търсим в MongoDB, ако API-то не е върнало нищо
        const fallbackWords = await Word.find(dbQuery);
        if (fallbackWords.length > 0) {
            const random = Math.floor(Math.random() * fallbackWords.length);
            return res.json({ word: fallbackWords[random].text });
        } else {
            return res.status(404).json({ error: 'Няма подходящи думи за тази комбинация от трудност и тема.' });
        }

    } catch (error) {
        console.error("Генерална грешка:", error);
        res.status(500).json({ error: 'Грешка на сървъра.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сървърът работи на http://localhost:${PORT}`);
});