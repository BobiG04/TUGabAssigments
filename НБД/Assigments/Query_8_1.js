// ...existing code...
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'my-sensors';
const collectionName = "data";
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};
const sensorType = 'humidity';

async function startQuery() {
    
    let client;
    console.time('Connect time ');
    try {
        // create client instance and connect (don't use MongoClient.connect with callback mix)
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
    console.time('Find time: ');
    try {
        const results = await collection
            .find(
                {	
                    type: sensorType,
                    timestamp: { $lt: new Date('2021-06-15') }
                },
                { 
                    projection: {_id: 0, value: 1, sensorId: 1}
                }
            )
            .sort({ sensorId: 1 })
            .toArray(); // await the promise, do NOT pass a callback

        if (!results || results.length === 0) {
            console.log('No matching documents found.');
        } else {
            const units = sensorType === 'temperature' ? '\u00B0C' : '%';	
            results.forEach(result => {
                console.log(`Sensor ${result.sensorId}: ${sensorType} ${result.value}${units}`);
            });
        }
    }
    catch(error) {
        console.log(error.message);
    }
    finally {
        console.timeEnd('Find time: ');
        if (client) await client.close();
    }	
}

startQuery();
// ...existing code...