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
// Returns the user and a token
router.post('/register', validate(userSchema), async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.register(username, password);

        const token = generateToken(user);

        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

//Authenticate
// Accepts a username and password
// body must be validated by the userSchema
// Returns the user if the username and password match and token
router.post('/authenticate', validate(userSchema), async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.authenticate(username, password);

        const token = generateToken(user);

        return res.status(200).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;