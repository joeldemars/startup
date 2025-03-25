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
      console.log(`Connected to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
})();

function getUser(email) {
    // return users.findOne({ email: email });
}

function getUserByToken(token) {
    // return users.findOne({})
}

function addUser(user) {}

function updateUser(user) {}

async function getCommands() {
    return await commands.find({}).toArray();
}

async function getCommand(id) {
    return await commands.findOne({ id: id });
}

async function addCommand(command) {
    await commands.insertOne(command);
}

async function updateCommand(command) {
    await commands.updateOne({ id: command.id }, { $set: { ...command } });
}

module.exports = {
    getCommands,
    getCommand,
    addCommand,
    updateCommand,
};
