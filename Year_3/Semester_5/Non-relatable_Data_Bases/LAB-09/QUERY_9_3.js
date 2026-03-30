'use strict';

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017";

const urlAtlas = "mongodb://<username>:<password>@cluster0-shard-00-00.shlgp.mongodb.net:27017,cluster0-shard-00-01.shlgp.mongodb.net:27017,cluster0-shard-00-02.shlgp.mongodb.net:27017/<database>?ssl=true&replicaSet=atlas-lhm95z-shard-0&authSource=admin&retryWrites=true&w=majority";

const databaseName = 'sensors';
const collectionName = "data";

const numberOfRecords = 10000;
const numberOfSensors = 20;
const sensorTypes = ['temperature', 'humidity'];
const numberOfSensorTypes = sensorTypes.length;

const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true
};

// ---------------------------------------------------------------------------
function getRandomNumberInRange(min, max) {
	return Math.floor((Math.random() * (max - min + 1) + min));
}
// ---------------------------------------------------------------------------	
function getRandomNumberInRangeAsString(min, max) {
	let random = getRandomNumberInRange(min, max);
	return String(random).padStart(2,'0');
}
// ---------------------------------------------------------------------------
const createDatabase = (database, collection) => 

	new Promise((resolve, reject) => {
	
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
				// --------------------------------------------------------------
				let records = [];
				for (let i=0; i<numberOfRecords; i++) {
					let sensorTypeId = getRandomNumberInRange(0, numberOfSensorTypes-1);
					let sensorTypeName = sensorTypes[sensorTypeId];
					let temperature = getRandomNumberInRange(-10, 38);
					let humidity = getRandomNumberInRange(20, 99);
					
					let day = getRandomNumberInRangeAsString(1, 31);
					let hour = getRandomNumberInRangeAsString(0, 24);
					let min = getRandomNumberInRangeAsString(0, 59);
					let sec = getRandomNumberInRangeAsString(0, 59);
					
					let sensorId = getRandomNumberInRange(1, numberOfSensors);

					let record = {
						sensorId: sensorId,
						timestamp: new Date(`2021-06-${day}T${hour}:${min}:${sec}Z`),
						type: sensorTypeName,
						value: sensorTypeName === 'temperature' ? temperature : humidity
					}
					records.push(record);
				}	
				result.insertMany(records, (error, result) => {
					if (error) return reject(error);
					conn.close();
					return resolve(result.insertedCount + " documents inserted.");
				});
				// --------------------------------------------------------------
				
			});				
				
		});

	});
// ---------------------------------------------------------------------------		

createDatabase(databaseName, collectionName)
  .then(result => console.log(result))
  .catch(error => {
	  process.stdout.write(`(ERROR: ${error.message})`);
	  process.exit();
  });
// ---------------------------------------------------------------------------

