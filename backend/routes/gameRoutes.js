const express = require('express');
const Game = require('../models/game');
const gameSchema = require('../schemas/gameSchema');
const shotSchema = require('../schemas/shotSchema');

const { authenticateJWT, authUser, authGame } = require('../middleware/authMiddleware');

const validate = require('../middleware/validate');
const router = express.Router();

/**
 * Game Routes must be utilized by an authenticated user
 */

router.use(authenticateJWT);

/**
 * Routes that will map the game model to our API
 *
 */

//New Game
// Accepts a user_id and numOf_ends
// body must be validated by the gameSchema
// Creates a new game in the database 
router.post('/:user_id/new', authUser, async (req, res, next) => {
    try {
        const { numOf_ends } = req.body;

        const user_id = parseInt(req.params.user_id);

        const game = await Game.newGame(user_id, numOf_ends);

        return res.status(201).json({ game });
    } catch (err) {
        return next(err);
    }
});

//Get Game
// Accepts a game_id
// Returns the game
router.get('/:game_id', authGame, async (req, res, next) => {
    try {
        const { game_id } = req.params;

        const game = await Game.getGame(game_id);

        return res.status(200).json({ game });
    } catch (err) {
        return next(err);
    }
});

//Add Shot
// Accepts a game_id and score
// body must be validated by the gameSchema
// Adds a new shot to the game
router.post('/:game_id/addShot', authGame, async (req, res, next) => {
    try {
        const { score } = req.body;
        const game_id = parseInt(req.params.game_id);

        const game = await Game.addShot(game_id, score);

        return res.status(201).json({ game });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;