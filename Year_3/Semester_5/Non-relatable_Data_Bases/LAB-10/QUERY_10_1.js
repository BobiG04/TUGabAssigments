
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName = "data-2018";

MongoClient.connect(url,{useUnifiedTopology: true}, (err, conn) => {
	if (err) throw err;
	let db = conn.db(dbName);
	db.collection(collectionName)
		.find(
			{	
				status: "ok",
				points: { $gt: 70 }
			},
			{ 
				projection: {_id: 0, name: 1, points: 1}
			}
		).sort(
			{
				"name": 1	
			}
		).toArray((error, docs) => {
			if (error) throw error;
			docs.forEach((doc) => {
				let name = doc.name;
				console.log(`${name.firstname} ${name.family}: ${doc.points}`);
			});
			conn.close();
		});
});



