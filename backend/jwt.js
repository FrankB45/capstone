const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('./config/config');

function generateToken(user) {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET_KEY, {
        expiresIn: '12h'
    });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {
    generateToken,
    verifyToken
};