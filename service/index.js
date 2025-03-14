const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const cookieParser = require('cookie-parser');

let users = [];
let commands = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api/login', async (req, res) => {
    let user = users.find((user) => user.email == req.body.email);
    let status;
    if (user == undefined) {
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
    if (users.some((user) => user.email == req.body.email)) {
        status = 409;
    } else {
        users.push({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        });
        status = 200;
        setAuthCookie(res, users[users.length - 1]);
    }
    res.sendStatus(status);
});

app.delete('/api/logout', (req, res) => {
    let token = req.cookies['token'];
    let user = users.find((user) => user.token == token);
    if (user != undefined) {
        user.token = undefined;
    }
    res.clearCookie('token');
    res.sendStatus(200);
});

app.get('/api/commands', (req, res) => {
    res.send(commands);
});

app.post('/api/commands', (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        commands.push(req.body);
        res.sendStatus(200);    
    }
});

app.put('/api/commands', (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        let index = commands.findIndex((command) => command.id == req.body.id);
        if (index != -1) {
            commands[index] = req.body;
        }
        res.sendStatus(200);
    }
});

app.put('/api/save-command', (req, res) => {
    if (!validateToken(req.cookies['token'])) {
        res.sendStatus(401);
    } else {
        let command = commands.find((command) => command.id == req.body.id);
        command.saves++;
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
    return users.some((user) => user.token == token);
}