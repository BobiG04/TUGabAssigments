const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = 'mongodb://localhost:27017';
const SERVER_PORT = 8080;

const dbName = 'students';
const collectionName = "data1";
const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true,
};

MongoClient.connect(url, options)
	.then(client => {
		console.log('Connect to Database...')
		const db = client.db(dbName);
		const collection = db.collection(collectionName);
	
		app.set('view engine', 'ejs'); 
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(bodyParser.json());
		app.use(express.static('public'));
	
		app.get('/', (request, response) => {
		  response.sendFile(__dirname + '/index.html')
		});
		app.post('/query', (request, response) => {
			let qSubject = request.body.subject;
			let qGrade = request.body.grade;
			console.log(`${qSubject}: ${qGrade}`);
			const filter = {
			  grade: {
				subject: `${qSubject}`, 
				value: parseInt(`${qGrade}`)
			  }
			};
			const projection = { _id: 0, name: 1 };
			const sort = { name: 1 };
			collection
				.find(filter, { projection: projection, sort: sort } )
				.toArray()
				.then(docs => {
					let title = 
					`Студенти с оценка ${qGrade} по дисциплината ${qSubject}:`;
					let results = {title: title, docs: docs, status: "ok"};
					response.render('index.ejs', { results: results });
			})
			.catch(error => {
				let results = {info: `Грешка: ${error.message}`, status: "fail" };
				response.render('index.ejs', { results: results });
			});

		});
		// Listening on server port
		app.listen(SERVER_PORT, () => {
			console.log(`Start listening on port ${SERVER_PORT}...`)
		});
	})
	.catch(error => {
		console.log(error.message);
	});


