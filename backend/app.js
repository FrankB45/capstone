const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cookieParser = require('cookie-parser');

//Create express app
const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ 'msg': 'Hello World' });
});

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

//export app for use in server or testing
module.exports = app;

