const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');
const db = require('./database.js');
const { WebSocketServer } = require('ws');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const socketServer = new WebSocketServer({ server });


app.post('/api/login', async (req, res) => {
    let user = await db.getUser(req.body.email);
    let status;
    if (user == null) {
        status = 400;
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            status = 200;
            setAuthCookie(res, user);
        } else {
            status = 403;
        }
    }
    res.sendStatus(status);
});

app.post('/api/register', async (req, res) => {
    let status;
    if (await db.getUser(req.body.email) != null) {
        status = 409;
    } else {
        let user = {
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        };
        db.addUser(user);
        status = 200;
        setAuthCookie(res, user);
    }
    res.sendStatus(status);
});

app.delete('/api/logout', (req, res) => {
    let token = req.cookies['token'];
    let user = db.getUserByToken(token);
    if (user != null) {
        user.token = null;
        db.updateUser(user);
    }
    res.clearCookie('token');
    res.sendStatus(200);
});

app.get('/api/commands', async (req, res) => {
    res.send(await db.getCommands());
});

app.post('/api/commands', (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        db.addCommand(req.body);
        notifyClients('add', req.body);
        res.sendStatus(200);    
    }
});

app.put('/api/commands', (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        db.updateCommand(req.body);
        notifyClients('update', req.body);
        res.sendStatus(200);
    }
});

app.put('/api/save-command', async (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        let command = await db.getCommand(req.body.id);
        command.saves++;
        db.updateCommand(command);
        notifyClients('update', command);
        res.sendStatus(200);
    }
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

function setAuthCookie(res, user) {
    user.token = uuid.v4();
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

function validateToken(token) {
    return db.getUserByToken(token) != null;
}

socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    socket.on('pong', () => socket.isAlive = true);

    setInterval(() => {
        for (const client of socketServer.clients) {
            if (!client.isAlive) {
                client.terminate();
            } else {
                client.isAlive = false;
                client.ping();
            }
        }
    }, 10000);
});

function notifyClients(messageType, command) {
    for (const client of socketServer.clients) {
        client.send(JSON.stringify({
            type: messageType,
            command: command,
        }));
    }
}
