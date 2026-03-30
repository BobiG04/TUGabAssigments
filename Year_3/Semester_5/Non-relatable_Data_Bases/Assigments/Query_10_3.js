const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName1 = "data-2017";
const collectionName2 = "data-2018";

const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};

MongoClient.connect(url, options)
    .then(conn => {
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
                    total: { $add: [ "$students.points", "$points" ]}
				}
			},
			{
				$sort: { "total": -1 }
			}	
		]).toArray()
        .then(docs => {
			docs.forEach((doc) => {
				let name = doc.name;
				console.log(`${name.firstname} ${name.family}: ${doc.total}`);
			});
			conn.close();
		});
		
});