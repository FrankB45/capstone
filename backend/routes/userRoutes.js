const express = require('express');
const User = require('../models/user');
const Game = require('../models/game');
const userSchema = require('../schemas/userSchema');

const { generateToken } = require('../jwt');
const validate = require('../middleware/validate');
const router = express.Router();

/**
 * Routes that will map the user model to our API
 *
 */

//Register
// Accepts a username and password
// body must be validated by the userSchema
// Creates a new user in the database 
// Returns the user and sets the token in an HTTP-only cookie
router.post('/register', validate(userSchema), async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.register(username, password);

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        return res.status(201).json({ user });
    } catch (err) {
        return next(err);
    }
});

//Authenticate
// Accepts a username and password
// body must be validated by the userSchema
// Returns the user if the username and password match and sets the token in an HTTP-only cookie
router.post('/authenticate', validate(userSchema), async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.authenticate(username, password);

        const gameIDs = await Game.getGameIDs(user.id);

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

        return res.status(200).json({ user, gameIDs });
    } catch (err) {
        return next(err);
    }
});

//Logout
// Clears the token cookie
// returns a message of success
router.post('/logout', async (req, res, next) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })
    return res.status(200).json({ message: 'Logout successful' });
});

//Gets games for a user by user_id
// Accepts a user_id
// Returns an array of games
router.get('/:user_id/games', async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const games = await Game.getGameIDs(user_id);

        return res.status(200).json({ games });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;