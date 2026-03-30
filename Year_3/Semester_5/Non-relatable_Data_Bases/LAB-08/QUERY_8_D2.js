
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'students';
const collectionName = "data1";
const options = {
	serverSelectionTimeoutMS: 4000,
	connectTimeoutMS: 4000, 
	socketTimeoutMS: 4000,
	useUnifiedTopology: true,
};

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
			.aggregate (
			[
				{ 
					"$project": { 
						"_id": 0,
						"name": 1,
						"grade2": {
							"$filter": {
								input: "$grade",
								as: "grade2",
								cond: {
									$eq:["$$grade2.value",2]
								},
								
							}
						},
						
					},
				},
				{
					$sort: {"name": 1}
				}	
				
				//{
				//	"$project": { 
				//		"name":1,
				//		"numOf2": {$size: "$grade2"}
				//	}
				//}
				

			])
			.toArray(function(error, res) {
				
				if (error) throw error;
				
				if (res.length != 0) {
					res.forEach((record) => {
						let name = record.name;
						let firstName = name.firstName;
						let lastName = name.lastName;

						let results = record.grade2;
						let numOf2 = results.length;
						let numOf2Info = (numOf2 !=0) ? `има ${numOf2} слаби оценки: ` : "няма слаби оценки.";
						process.stdout.write(`\n${firstName} ${lastName} ${numOf2Info}`);
						
						if (results.length != 0) {
							results.forEach((result) => {
								let subject = result.subject;
								process.stdout.write(`${subject} `);
							});
						}

					});
				}
				else {
					console.log(`Няма студенти със слаби оценки.`);
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

	
	

