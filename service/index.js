const express = require('express');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();

app.use(express.static('public'));
app.listen(port, () => console.log(`Listening on port ${port}`));
