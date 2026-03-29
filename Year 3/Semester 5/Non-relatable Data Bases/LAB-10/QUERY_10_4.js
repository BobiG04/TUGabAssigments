
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
							year: { $in: [2017, 2018] },
							points: { $gt: 85 }
						} 
					}
				}	
			},
			{ 
				$project: { 
					_id: 0,
					name: 1,
					'results': {
						'$map': { 
							'input': '$results', 
							'in': { 
								'year': '$$this.year', 
								'points': '$$this.points'
							}
						}
					}	
				} 
			}			
		]
		).sort(
			{
				"name": 1	
			}
		).toArray(function(error, docs) {
			if (error) throw error;
			docs.forEach((doc) => {
				let name = doc.name;
				let results = doc.results;
				console.log(`\n${name.firstname} ${name.family}:`);
				results.forEach(result => {
					console.log(`Година: ${result.year}, точки: ${result.points}`)
				});
			});
			
			conn.close();
		});
});


	
	

