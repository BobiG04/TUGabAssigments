'use strict';

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

const jsonFile = "filename.json"; 
const databaseName = 'databaseName';
const collectionName = "collName";

const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true
};

const createDatabase = (file, database, collection) => 

	new Promise((resolve, reject) => {
		
		process.stdout.write("Read data from file: ");
		fs.readFile(file, (error, data) => {
			if (error) return reject(error);
			process.stdout.write('OK\n');
			var jsonData = JSON.parse(data);
			
			process.stdout.write("Connect to server: ");
			MongoClient.connect(url, options, (error, conn) => {
				if (error) return reject(error);
				process.stdout.write('OK\n');
				let db = conn.db(database);
				
				process.stdout.write("Create collection: ");
				db.createCollection(collection, (error, result) => {
					if (error) return reject(error);
					process.stdout.write('OK\n');
					
					process.stdout.write("Insert docs: ");
					result.insertMany(jsonData, (error, result) => {
						if (error) return reject(error);
						conn.close();
						return resolve(result.insertedCount + " documents inserted.");
					});
					
				});				
				
			});

		});
		
	});

createDatabase(jsonFile, databaseName, collectionName)
  .then(result => console.log(result))
  .catch(error => {
	  process.stdout.write(`(ERROR: ${error.message})`);
	  process.exit()
  });

