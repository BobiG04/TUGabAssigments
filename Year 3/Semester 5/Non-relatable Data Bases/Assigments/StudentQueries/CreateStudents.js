const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'competitive-programming'
const collectionName = 'students';
const jsonFilePath = 'studentsdata.json';
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};

async function createStudents() {
    let client;
    console.time('Connect time ');
    try {
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

    console.time('Insert time: ');
    try {
        const data = require(`./${jsonFilePath}`);
        const result = await collection.insertMany(data);
        console.log(`Inserted ${result.insertedCount} documents into collection ${collectionName} in database ${dbName}.`);
    } catch (error) {
        console.log(`Error:\n${error.message}`);
    }
    finally {
        console.timeEnd('Insert time: ');
        await client.close();
    }
}

createStudents();