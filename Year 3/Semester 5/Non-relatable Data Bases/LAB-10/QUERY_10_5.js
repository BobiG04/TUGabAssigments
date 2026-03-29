
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName = "data-2017+2018";

MongoClient.connect(url,{useUnifiedTopology: true}, (err, conn) => {
	if (err) throw err;
	let db = conn.db(dbName);
	db.collection(collectionName)
		.aggregate(
		[
			{
				$match: { 
					results: { 
						$elemMatch: { 
							status: { $eq: "ok" }
						} 
					}
				}	
			},
			{ 
				$project: { 
					_id: 0,
					name: 1,
					'total': {
						$sum: "$results.points"
					}	
				} 
			},
			{
				$limit: 10
			},
			{
				$sort: { "total": -1 }
			}	
		]

		).toArray(function(error, docs) {
			if (error) throw error;
			let index = 1;
			docs.forEach((doc) => {
				let name = doc.name;
				let result = doc.result;
				console.log(`${index++}. ${name.firstname} ${name.family}: ${doc.total}`);
			});
			conn.close();
		});
});


	
	

