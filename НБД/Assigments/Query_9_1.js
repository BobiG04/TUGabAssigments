const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'students';
const collectionName = "data1";
const options = {
	serverSelectionTimeoutMS: 3000,
	connectTimeoutMS: 3000, 
	socketTimeoutMS: 3000,
	useUnifiedTopology: true,
};
const filter = { };
const updateDocument = {
	$set: { "grade.$[arrayItem].value": 4 }
};
const updateOptions = {
	arrayFilters: [{
		"arrayItem.subject": "НБД"
	}]
};

async function startReplace() {
	
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
	console.time('Update time: ');
	try {

		const result = await collection.updateMany(filter, updateDocument, updateOptions);
		console.log(`Брой заместени документи: ${result.modifiedCount}`);

		client.close();
	}
	catch(error) {
		console.log(error.message);
	}
	finally {
		console.timeEnd('Update time: ');
	}	
}

startReplace();