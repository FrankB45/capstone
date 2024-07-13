const express = require('express');

//Create express app
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ 'msg': 'Hello World' });
});

//export app for use in server or testing
module.exports = app;

