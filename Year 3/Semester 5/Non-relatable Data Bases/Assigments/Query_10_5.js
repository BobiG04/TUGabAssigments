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

    MongoClient.connect(url, options)
        .then(conn => {
            const db = conn.db(dbName);
            const collection = db.collection(collectionName);

            collection.aggregate([
                {
                    '$match': {
                        'results.status': 'ok'
                    }
                }, {
                    '$project': {
                        'total': {
                            '$sum': '$results.points'
                        },
                        'name' : 1
                    }
                }, {
                    '$limit': 10
                }
            ])
                .sort({ "total": -1 })
                .toArray()
                .then(docs => {
                    if (docs.length === 0) {
                        console.log("No matching documents found.");
                    }

                    let numb = 1;
                    docs.forEach(doc => {
                        console.log(`${numb}. ${doc.name.firstname} ${doc.name.family}: ${doc.total}`)
                        numb++;
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
