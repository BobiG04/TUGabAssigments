
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName = "data-2017+2018";
const options = {
	serverSelectionTimeoutMS: 2000,
	connectTimeoutMS: 2000, 
	socketTimeoutMS: 2000,
	useUnifiedTopology: true,
};
const language = 'C#';

async function run() {
	
	let client;
	console.time('Connect time: ');
	try {
		client = await MongoClient.connect(url, options);
	}
	catch(error) {
		console.log('ERROR: Няма връзка със сървъра!');
		return;
	}
	finally {
		console.timeEnd('Connect time: ');
	}
	
	const coll = client.db(dbName).collection(collectionName);
	console.time('Find time: ');
	try {
		await coll
				.aggregate(
				[
					{
						$match: { 
							results: { 
								$elemMatch: { 
									status: { $eq: "ok" },
									language: { $eq: language }
								} 
							}
						}	
					},
					{ 
						$project: { 
							_id: 0,
							name: 1,	
						} 
					},
					{
						$sort: { "name": 1 }
						
					}
					
				]
				)
				.toArray(function(error, docs) {
					if (error) throw error;
					console.log(`\nСписък на участниците, избрали език за програмиране ${language}:`);
					let index = 1;
					docs.forEach((doc) => {
						let name = doc.name;
						let result = doc.result;
						console.log(`${index++}. ${name.firstname} ${name.family}`);
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

run();

	
	

