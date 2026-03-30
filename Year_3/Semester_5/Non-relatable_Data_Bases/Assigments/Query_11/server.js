const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();



app.listen(8080, () => {
    console.log('Start listening on port 8080...')
});

const url = 'mongodb://localhost:27017';
const dbName = 'students';
const collectionName = "data1";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
};


/*app.post('/query', (req, res) => {
    let subject = req.body.subject;
    let grade = req.body.grade;
    res.send(`${subject}: ${grade}`); 
});*/

mongodb.MongoClient.connect(url, options)
    .then(client => {
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static('public'));

        app.get('/', (request, response) => {
            response.sendFile(__dirname + '/index.html');
        });
        app.post('/query', (req, res) => {
            let qSubject = req.body.subject;
            let qGrade = req.body.grade;
            const filter = {
                grade: {
                    subject: `${qSubject}`,
                    value: parseInt(`${qGrade}`)
                }
            };
            const projection = { _id: 0, name: 1 };
            const sort = { name: 1 };

            collection
                .find(filter, { projection: projection }, { sort: sort })
                .toArray()
                .then(docs => {
                    let title = `Студенти с оценка ${qGrade} по дисциплината  ${qSubject}:`;
                    let results = { title: title, docs: docs, status: "ok" }; 
                    res.render('./index.ejs', { results: results });
                })
                .catch(err => {
                    let results = {info:`Грешка:${err.message}`, status: "fail" };
                    res.render('index.ejs', { results: results });
                });
        });
        app.listen(8080, () => {
            console.log('Start listening on port 8080...')
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    }
    );