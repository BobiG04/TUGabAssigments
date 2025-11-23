// app.js
 
const { MongoClient } = require('mongodb');
const fs = require('fs/promises'); // Използваме вградения модул за Promises-базирано четене на файлове
 
// Конфигурация за MongoDB
const uri = 'mongodb://localhost:27017'; // Променете, ако използвате различен адрес/порт
const dbName = 'Data-2017'; // Името на новата база данни
const collectionName = 'data'; // Името на новата колекция
const jsonFilePath = 'data-2017.json';
 
// --- Функции, базирани на JavaScript Promises / Async/Await ---
 
/**
 * Чете и парсва JSON файл
 * @returns {Promise<Array<Object>>} Обещание, което връща масив от обекти.
 */
async function readJsonFile() {
    console.log(`\n1. Четене на данни от файл: ${jsonFilePath}...`);
    try {
        // fs.readFile връща Promise, който се разрешава до съдържанието на файла (Buffer)
        const data = await fs.readFile(jsonFilePath, 'utf8');
        // JSON.parse преобразува JSON стринга в JavaScript обекти
        const documents = JSON.parse(data);
        console.log(`Успешно прочетени ${documents.length} документа.`);
        return documents;
    } catch (error) {
        console.error(`Грешка при четене или парсване на JSON файла: ${error.message}`);
        // Хвърляме грешката, за да бъде прихваната от основната функция
        throw error;
    }
}
 
/**
 * Свързва се с MongoDB, вмъква документите и затваря връзката.
 * @param {Array<Object>} documents Масив от документи за вмъкване.
 * @returns {Promise<void>} Обещание, което се разрешава след края на операцията.
 */
async function insertDocuments(documents) {
    let client;
    console.log(`\n2. Свързване с MongoDB и вмъкване на документи...`);
 
    try {
        // Създаване на нов MongoDB клиент
        client = new MongoClient(uri);
 
        // Свързване към MongoDB (този метод връща Promise)
        await client.connect();
        console.log("Успешна връзка с MongoDB.");
 
        // Избиране на база данни и колекция
        const db = client.db(dbName); // Създава базата данни, ако не съществува
        const collection = db.collection(collectionName); // Създава колекцията, ако не съществува
 
        // Изтриване на съществуващите документи (почистване)
        const deleteResult = await collection.deleteMany({});
        console.log(`Изтрити ${deleteResult.deletedCount} съществуващи документа от колекцията.`);
 
        // Вмъкване на документите (този метод връща Promise)
        const insertResult = await collection.insertMany(documents);
 
        console.log(`\nУспешно вмъкнати ${insertResult.insertedCount} документа в колекция '${collectionName}' (база данни: ${dbName}).`);
 
    } catch (error) {
        console.error(`Грешка при работа с MongoDB: ${error.message}`);
        throw error;
    } finally {
        // Задължително затваряне на връзката
        if (client) {
            await client.close(); // Този метод връща Promise
            console.log("\nВръзката с MongoDB е затворена.");
        }
    }
}
 
/**
 * Основна функция, която управлява потока на изпълнение, използвайки Promises.
 */
async function main() {
    console.log("--- Старт на Node.js приложението ---");
    try {
        // 1. Асинхронно четене на JSON файла
        const documents = await readJsonFile(); 
 
        // 2. Асинхронно вмъкване на документите в MongoDB
        if (documents && documents.length > 0) {
            await insertDocuments(documents);
        } else {
            console.log("Няма документи за вмъкване.");
        }
 
        console.log("\n--- Задачата е изпълнена успешно! ---");
 
    } catch (error) {
        // Прихващане на всяка грешка от веригата от Promises
        console.error("\n*** ФИНАЛНА ГРЕШКА: Изпълнението приключи с грешка. ***");
        // console.error(error); // Може да разкоментирате за пълен стек на грешката
    }
}
 
// Извикване на основната функция
main();