const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'Data-2017';
const collectionName = 'data';

const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};

function query10_1() {

    console.log("START");

    MongoClient.connect(url, options)
        .then(conn => {

            console.log("Connected.");

            let db = conn.db(dbName);
            let collection = db.collection(collectionName);

            console.log("Running query...");

            collection.find(
                { status: "ok", points: {$gt: 70} },
                { projection: { _id: 0, name: 1, points: 1 } }
            )
            .sort({ name: 1 })
            .toArray()
            .then(docs => {

                console.log("Query callback reached.");
                console.log("Docs:", docs);

                docs.forEach(doc => {
                    let name = doc.name;
                    console.log(
                        `Name: ${name.firstname}, Surname: ${name.family}, Points: ${doc.points}`
                    );
                });

                conn.close();
            })
            .catch(err => {
                console.error("Query error:", err);
                conn.close();
            });

        })
        .catch(err => console.error("Connection error:", err));
}

query10_1();
