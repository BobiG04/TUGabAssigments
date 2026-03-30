
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName1 = "data-2017";
const collectionName2 = "data-2018";

MongoClient.connect(url,{useUnifiedTopology: true}, function(err, conn) {
	if (err) throw err;
	let db = conn.db(dbName);
	db.collection(collectionName1)
		.aggregate(
		[
			{
				$lookup: {
					from: collectionName2,
					localField: 'name',
					foreignField: 'name',
					as: 'students'
				}
			},
			{
				$unwind: '$students'
			},
			{
				$project: {
					_id: 0,
					name: '$students.name',
				}
			},
			{
				$sort: { name: 1 }
			}	
		]).toArray(function(error, docs) {
			if (error) throw error;
			docs.forEach((doc) => {
				let name = doc.name;
				console.log(`${name.firstname} ${name.family}`);
			});
			conn.close();
		});
		
});



