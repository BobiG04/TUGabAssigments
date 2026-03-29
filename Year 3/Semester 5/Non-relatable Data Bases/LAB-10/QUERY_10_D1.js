const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'students';
const collectionName = "data2";
const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true,
};
const filter = {
  '$and': [
    {
      'grade.НБД.value': { '$gt': 2 }
    }, 
	{
      'grade.КМС.value': { '$in': [4, 6] }
    }
  ]
};
const projection = {
  '_id': 0, 'name': 1
};
const sort = {
  'name': 1
};

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
			.find(filter, { projection: projection, sort: sort}
			).toArray(function(error, results) {
				if (error) throw error;	
				results.forEach(result => {
					let firstName = result.name.firstName;
					let lastName = result.name.lastName;
					console.log(`${firstName} ${lastName}`);
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

	
	

