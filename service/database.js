const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const users = db.collection('users');
const commands = db.collection('commands');

(async () => {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
})();

function getUser(email) {}

function getUserByToken(token) {}

function addUser(user) {}

function updateUser(user) {}

function getCommands() {}

function addCommand() {}

function updateCommand() {}
