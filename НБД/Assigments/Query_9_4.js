import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  'affiliation.type': 'school'
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Data-2017').collection('data');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();

console.log(`Намерени документи: ${result.length}`);