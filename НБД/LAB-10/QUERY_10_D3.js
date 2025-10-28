
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

const sensorId = 15;
const sensorType = 'temperature';
const startDate = new Date("2021-06-01");
const endDate = new Date("2021-06-3");
const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};
const filter = {
	"sensorId": sensorId,
	"type" : sensorType, 
	"timestamp": {
		"$gte": startDate,
		"$lte": endDate
	}
};
const sort = {
  'timestamp': 1
};
async function makeQuery() {
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
			.find(filter,{ sort: sort})
			.toArray(function(error, records) {
				if (error) throw error;
				let index = 1;
				let ts1 = startDate.toLocaleString('bg-bg', dateOptions);
				let ts2 = endDate.toLocaleString('bg-bg', dateOptions);
				console.log(`Записи за сензор ${sensorId} за периода [${ts1} - ${ts2}]:`);
				if (records.length != 0) {
					records.forEach((record) => {
						let unit = record.type === 'temperature' ? '\u00B0C' : '%';
						let ts = record.timestamp.toLocaleString('bg-bg', dateOptions);
						let id = String(index++).padStart(3,' ');
						console.log(`${id}. Дата ${ts}: ${record.value}${unit}`);
					});
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

makeQuery();

	
	

