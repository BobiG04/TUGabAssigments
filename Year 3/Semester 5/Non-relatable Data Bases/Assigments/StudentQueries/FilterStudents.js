const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';

const dbName = 'competitive-programming'
const collectionName = 'students';
const options = {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000, 
    socketTimeoutMS: 3000,
};

const participantsQuery = [
  {
    '$match': {
      'participation': {
        '$exists': true, 
        '$ne': ''
      }
    }
  }, {
    '$group': {
      '_id': null, 
      'count': {
        '$sum': 1
      }
    }
  }
];

const bachelorQuery = [
  {
    '$match': {
      'degree': 'Bachelor'
    }
  }
];

const masterQuery = [
  {
    '$match': {
      'degree': 'Master'
    }
  }
];

const maleFemaleQuery = [
  {
    '$group': {
      '_id': '$gender', 
      'count': {
        '$sum': 1
      }
    }
  }
];

async function filterStudents() {
  let client = new MongoClient(url, options);
  console.time('Connect time ');
  try {
    await client.connect();
  }
  catch(error) {
    console.log(`Error connecting to MongoDB:\n${error.message}`);
    console.timeEnd('Connect time ');
    return; 
  }
  finally {
    console.timeEnd('Connect time ');
  }

  const collection = client.db(dbName).collection(collectionName);

    try {
        console.time('Participants Query time: ');
        const participantsResult = await collection.aggregate(participantsQuery).toArray();
        const participantsCount = participantsResult[0]?.count ?? participantsResult.length;
        console.log(`Participants Count: ${participantsCount}`);
        console.timeEnd('Participants Query time: ');
        console.time('Bachelor Query time: ');
        const bachelorResult = await collection.aggregate(bachelorQuery).toArray();
        console.log(`Bachelor Count: ${bachelorResult.length}`);
        console.timeEnd('Bachelor Query time: ');
        console.time('Master Query time: ');
        const masterResult = await collection.aggregate(masterQuery).toArray();
        console.log(`Master Count: ${masterResult.length}`);
        console.timeEnd('Master Query time: ');
        console.time('Male/Female Query time: ');
        const maleFemaleResult = await collection.aggregate(maleFemaleQuery).toArray();
        if (!maleFemaleResult || maleFemaleResult.length === 0) {
          console.log('Gender Counts: none');
        } else {
          console.log('Gender Counts:');
          maleFemaleResult.forEach(g => console.log(`  ${g._id}: ${g.count}`));
        }
        console.timeEnd('Male/Female Query time: ');
    } catch (error) {
      console.log(`Error:\n${error.message}`);
    } finally {
      if (client) {
        try {
          await client.close();
        } catch (closeErr) {
          console.log(`Error closing MongoDB client:\n${closeErr.message}`);
        }
      }
    }
}

filterStudents();