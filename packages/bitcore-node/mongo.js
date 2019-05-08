const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'bitcore';
 
// Use connect method to connect to the server
(async function() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const block_collection = db.collection("blocks");
  let data = await block_collection.find({}).toArray();
  console.log(data);
  client.close();
})();