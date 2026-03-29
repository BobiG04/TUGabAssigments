
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

const sensorType = 'temperature';

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
	console.time('Aggregate time: ');
	try {
		await collection
			.aggregate(
				[
					{
						$match:
						{
							timestamp: { $lt: new Date('2021-06-20') }
						}
					
					},
					{ 
						$group: 
						{ 
							_id : '$type',
							avg : { $avg : '$value' }
						} 
					}
				]
			).toArray(function(error, results) {
				if (error) throw error;		
				results.forEach(result => {
					let type = result._id;
					let units = result._id === 'temperature' ? '\u00B0C' : '%';
					console.log(`Average ${type}: ${result.avg.toFixed(2)}${units}`);
				});
				client.close();
			});
	}
	catch(error) {
		console.log(error.message);
	}
	finally {
		console.timeEnd('Aggregate time: ');
	}	
}

startQuery();

	
	

