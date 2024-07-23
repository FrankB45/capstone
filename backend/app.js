const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Create express app
const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({ 'msg': 'Hello World' });
});

app.use('/users', userRoutes);
app.use('/games', gameRoutes);

//export app for use in server or testing
module.exports = app;

