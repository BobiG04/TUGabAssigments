// Получаване на списък на всички студенти, които се участвали и в двете състезания
// GAPCOM 2017 и GAPCOM-2018 и са сортирани по общия брой точки от двете състезания

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const urlAtlas = "mongodb://rs-soft:kYrEE4s@cluster0-shard-00-00.shlgp.mongodb.net:27017,cluster0-shard-00-01.shlgp.mongodb.net:27017,cluster0-shard-00-02.shlgp.mongodb.net:27017/GAPCOM1?ssl=true&replicaSet=atlas-lhm95z-shard-0&authSource=admin&retryWrites=true&w=majority";

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
					total: {$add: [ '$students.points', '$points' ]}
				}
			}

		]).sort(
			{
				"total": -1	
			}
			
		).toArray(function(error, docs) {
			if (error) throw error;
			docs.forEach((doc) => {
				let name = doc.name;
				console.log(`${name.firstname} ${name.family}: ${doc.total}`);
			});
			conn.close();
		});
		
});



