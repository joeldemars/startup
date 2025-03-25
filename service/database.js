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

async function getUser(email) {
    return await users.findOne({ email: email });
}

async function getUserByToken(token) {
    return await users.findOne({ token: token });
}

async function addUser(user) {
    await users.insertOne(user);
}

async function updateUser(user) {
    await users.updateOne({ email: user.email }, { $set: { ...user } });
}

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
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getCommands,
    getCommand,
    addCommand,
    updateCommand,
};
