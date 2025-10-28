const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'my-sensors';
const collectionName = "data";
const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true,
};
const sensorType = 'humidity';

async function startQuery() {
	
	let client;
	console.time('Connect time ');
	try {
		client = await MongoClient.connect(url, options);
	}
	catch(error) {
		console.log(`Error:\n${error.message}`);
		process.exit();
	}
	finally {
		console.timeEnd('Connect time ');
	}
	
	const collection = client.db(dbName).collection(collectionName);
	console.time('Find time: ');
	try {
		await collection
			.find(
				{	
					type: sensorType,
					timestamp: { $lt: new Date('2021-06-15') }
				},
				{ 
					projection: {_id: 0, value: 1, sensorId: 1}
				}
			).sort(
				{
					sensorId: 1	
				}
			).toArray(function(error, results) {
				if (error) throw error;	
				let units = sensorType === 'temperature' ? '\u00B0C' : '%';	
				results.forEach(result => {
					let id = result.sensorId;
					let value = result.value;
					console.log(`Sensor ${id}: ${sensorType} ${value}${units}`);
				});
				client.close();
			});
	}
	catch(error) {
		console.log(error.message);
	}
	finally {
		console.timeEnd('Find time: ');
	}	
}

startQuery();

	
	

