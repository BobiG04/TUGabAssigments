const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'GAPCOM';
const collectionName = "data-2017+2018";

const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
};

function queryHighPoints() {
    console.log("Starting query...");

    MongoClient.connect(url, options)
        .then(conn => {
            const db = conn.db(dbName);
            const collection = db.collection(collectionName);

            collection.aggregate([
                {
                    $match: {
                        results: {
                            $elemMatch: {
                                $or: [
                                    { year: 2017, points: { $gt: 85 } },
                                    { year: 2018, points: { $gt: 85 } }
                                ]
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: 1,
                        results: {
                            $filter: {
                                input: '$results',
                                as: 'r',
                                cond: {
                                    $or: [
                                        { $and: [ { $eq: ['$$r.year', 2017] }, { $gt: ['$$r.points', 85] } ] },
                                        { $and: [ { $eq: ['$$r.year', 2018] }, { $gt: ['$$r.points', 85] } ] }
                                    ]
                                }
                            }
                        }
                    }
                }
            ])
            .sort({ "name.firstname": 1 })
            .toArray()
            .then(docs => {
                if (docs.length === 0) {
                    console.log("No matching documents found.");
                }

                docs.forEach(doc => {
                    const { firstname, family } = doc.name || { firstname: "Unknown", family: "Unknown" };
                    console.log(`Name: ${firstname} ${family}`);
                    doc.results.forEach(result => {
                        console.log(`Година: ${result.year}, Точки: ${result.points}`);
                    });
                    console.log('---');
                });

                conn.close();
            })
            .catch(err => {
                console.error("Aggregation error:", err);
                conn.close();
            });

        })
        .catch(err => console.error("Connection error:", err));
}

queryHighPoints();
