const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'students';
const collectionName = "data1";
const options = {
    serverSelectionTimeoutMS: 4000,
    connectTimeoutMS: 4000,
    socketTimeoutMS: 4000,
};

async function run() {

    let client;
    console.time('Connect time: ');
    try {
        client = new MongoClient(url, options);
        await client.connect();
    }
    catch (error) {
        console.log('ERROR: Няма връзка със сървъра!');
        return;
    }
    finally {
        console.timeEnd('Connect time: ');
    }

    const coll = client.db(dbName).collection(collectionName);
    console.time('Find time: ');
    try {
        const results = await coll
            .aggregate(
                [
                    {
                        '$project': {
                            '_id': '$id',
                            'name': '$name.firstName',
                            'AvgGrade': {
                                '$avg': '$grade.value'
                            }
                        }
                    }, {
                        '$group': {
                            '_id': 0,
                            'Avarage': {
                                '$avg': '$AvgGrade'
                            }
                        }
                    }
                ])
            .toArray();

        if (!results || results.length === 0) {
            console.log('No matching documents found.');
        } else {
            console.log(`Avarage: ${results[0].Avarage.toFixed(2)}`);
        }

    }
    catch (error) {
        console.log(error.message);
    }
    finally {
        console.timeEnd('Find time: ');
    }
}

run();