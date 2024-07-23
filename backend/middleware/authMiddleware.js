const { verifyToken } = require('../jwt');
const Game = require('../models/game');

function authenticateJWT(req, res, next) {
    const token = req.cookies.token;

    if (token) {

        try {
            const decoded = verifyToken(token);
            //Add the user to the request to show validation
            req.user = decoded;

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Missing token' });
    }
}

function authUser(req, res, next) {
    console.log(req.params.user_id);
    console.log(req.user.id);
    if (parseInt(req.params.user_id) !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized' });
    }
    next();
}

async function authGame(req, res, next) {
    const gameID = parseInt(req.params.game_id);
    const userID = parseInt(req.user.id);

    //Get all the gameIDs for the user
    const gameIDs = await Game.getGameIDs(userID);

    //Check if the gameID is in the list of gameIDs
    if (gameIDs.includes(gameID)) {
        next();
    }
    else {
        return res.status(403).json({ message: 'Game not authorized' });
    }
}

module.exports = {
    authenticateJWT,
    authUser,
    authGame
};