// ...existing code...
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'my-sensors';
const collectionName = "data";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};

const sensorType = 'temperature';

async function startQuery() {
    
    let client;
    console.time('Connect time ');
    try {
        // create client and connect using the modern API
        client = new MongoClient(url, options);
        await client.connect();
    }
    catch(error) {
        console.log(`Error:\n${error.message}`);
        process.exit(1);
    }
    finally {
        console.timeEnd('Connect time ');
    }
    
    const collection = client.db(dbName).collection(collectionName);
    console.time('Aggregate time: ');
    try {
        const results = await collection
            .aggregate(
                [
                    {
                        $match:
                        {
                            timestamp: { $lt: new Date('2021-06-20') }
                        }
                    
                    },
                    { 
                        $group: 
                        { 
                            _id : '$type',
                            avg : { $avg : '$value' }
                        } 
                    }
                ]
            )
            .toArray(); // await results instead of passing a callback

        if (!results || results.length === 0) {
            console.log('No matching documents found.');
        } else {
            results.forEach(result => {
                let type = result._id;
                let units = result._id === 'temperature' ? '\u00B0C' : '%';
                console.log(`Average ${type}: ${result.avg.toFixed(2)}${units}`);
            });
        }
    }
    catch(error) {
        console.log(error.message);
    }
    finally {
        console.timeEnd('Aggregate time: ');
        if (client) await client.close();
    }	
}

startQuery();
// ...existing code...