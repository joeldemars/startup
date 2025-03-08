const express = require('express');
const bcrypt = require('bcryptjs');

let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/api/login', async (req, res) => {
    res.sendStatus(200);
});

app.post('/api/register', async (req, res) => {
    res.sendStatus(addUser(req.body.email, req.body.password));
})

function addUser(email, password) {
    if (users.some((user) => user.email == email)) {
        return 409;
    } else {
        users.push({
            email: email,
            password: bcrypt.hash(password, 10),
        });
        return 200;
    }
}