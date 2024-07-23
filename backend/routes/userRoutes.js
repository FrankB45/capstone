const express = require('express');
const User = require('../models/user');
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

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

        return res.status(200).json({ user });
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

module.exports = router;