
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const urlAtlas = "mongodb://<username>:<password>@cluster0-shard-00-00.shlgp.mongodb.net:27017,cluster0-shard-00-01.shlgp.mongodb.net:27017,cluster0-shard-00-02.shlgp.mongodb.net:27017/<database>?ssl=true&replicaSet=atlas-lhm95z-shard-0&authSource=admin&retryWrites=true&w=majority";

const dbName = 'sensors';
const collectionName = "data";
const options = {
	serverSelectionTimeoutMS: 4000,
	connectTimeoutMS: 4000, 
	socketTimeoutMS: 4000,
	useUnifiedTopology: true,
};

const sensorId = 5;
const sensorType = 'temperature';

async function run() {
	
	let client;
	console.time('Connect time ');
	try {
		client = await MongoClient.connect(urlAtlas, options);
	}
	catch(error) {
		console.log(`Няма връзка със сървъра:\n${error.message}`);
		process.exit();
	}
	finally {
		console.timeEnd('Connect time ');
	}
	
	const coll = client.db(dbName).collection(collectionName);
	console.time('Find time: ');
	try {
		await coll
			.aggregate (
			[
				{ 
					"$match" : 
					{ 
						"sensorId": sensorId,
						"type" : sensorType 
					} 
				},
				{
					"$count": "numOfRecs"
				}
			])
			.toArray(function(error, res) {
				if (error) throw error;		
				if (res.length == 1) {
					let stat = res[0];
					console.log(`Брой записи за сензор ${sensorId} (${sensorType}): ${stat.numOfRecs}`);
				}
				else {
					console.log(`Няма данни за сензор номер ${sensorId}.`);
				}
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

run();

	
	

