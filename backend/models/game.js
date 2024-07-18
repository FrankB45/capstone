const db = require('../database/dbClient');

/** 
 * Functions related to Games
 */

class Game {

    /**
     * Creates a new game for a user
     * 
     * Returns { id, numOf_ends }
     * 
     * Parameters { user_id, numOf_ends(optional) }
     * 
     * TODO: Implement game creation for A B C D shooting
     * Currently only A shooting
     */
    static async newGame(user_id, numOf_ends = 24) {

        //Insert game first into the DB
        const gameResult = await db.query(
            `INSERT INTO games (user_id, numOf_ends) VALUES ($1, $2) RETURNING *`,
            [user_id, numOf_ends]
        );
        const game = gameResult.rows[0];
        //This would be if I wanted to pre-create all the ends and shots for the game at the time of creation
        // let ends = [];
        // //Insert ends into the DB
        // for (let i = 0; i < numOf_ends; i++) {
        //     let endResult = await db.query(
        //         `INSERT INTO ends (game_id, archer_char, end_num, num_of_shots) VALUES ($1, $2, $3, $4) RETURNING *`,
        //         [game.id, "A", i + 1, 3]
        //     );
        //     ends.push(endResult.rows[0]);
        // }

        // //Insert shots into the ends
        // for (let end of ends) {
        //     for (let i = 0; i < end.num_of_shots; i++) {
        //         let shotResult = await db.query(
        //             `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, $2, $3) RETURNING *`,
        //             [end.id, i + 1, -1]
        //         );
        //         end.shots.push(shotResult.rows[0]);
        //     }
        // }

        // game.ends = ends;

        return game;

    }

    /**
     * Gets a game by ID
     * 
     * Returns { id,  }
     * 
     * Parameters { game_id }
     */
    static async getGame(game_id) {
        //Main Game object to return 
        let game = {};

        //Get Game from DB
        let gameResult = await db.query(
            `SELECT * FROM games WHERE id = $1`,
            [game_id]
        );
        game = gameResult.rows[0];
        //Error handling
        if (gameResult.rowCount === 0) {
            //TODO: Implement error handling
            throw new Error("Game not found");
        }


        //Using the game ID, get all ends with that game ID
        let endResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1 ORDER BY end_num`,
            [game_id]
        );
        const ends = endResult.rows.map(end => {
            return {
                id: end.id,
                archer_char: end.archer_char,
                end_num: end.end_num,
                num_of_shots: end.num_of_shots
            }
        });

        //Iterate through all the ends and get all the shots associated with that end
        for (let end of ends) {
            let shotResult = await db.query(
                `SELECT * FROM shot WHERE end_id = $1 ORDER BY shot_number`,
                [end.id]
            );
            end.shots = shotResult.rows.map(shot => {
                return {
                    id: shot.id,
                    shot_number: shot.shot_number,
                    score: shot.score
                }
            });
        }

        game.ends = ends;
        return game;

    }


    /**
     * Add a shot to the game
     * 
     * 
     */
    static async addShot(game_id, score) {
        //Get the latest end for the game
        let endResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1 ORDER BY end_num DESC LIMIT 1`,
            [game_id]
        );

        let end = endResult.rows[0];

        //If there are no ends, create the first end
        if (!end) {
            endResult = await db.query(
                `INSERT INTO ends (game_id, archer_char, end_num, numOf_shots) VALUES ($1, $2, $3, $4) RETURNING *`,
                [game_id, "A", 1, 3]
            );
            end = endResult.rows[0];
        }

        //Check if the end is full and if so, create a new end
        let endShots = await db.query(
            `SELECT * FROM shot WHERE end_id = $1`,
            [end.id]
        );
        //Add a new end if the end is full
        console.log("---------------------");
        console.log(endShots.rowCount);
        console.log(end.numof_shots);
        console.log("---------------------");
        console.log(end);
        console.log("---------------------");
        if (endShots.rowCount >= end.numof_shots) {
            //If the game is full, do not add another end 
            //TODO: NEED TO CHANGE 24 from static to dynamic variable
            if (end.end_num === 24) {
                //TODO: Implement error handling
                throw new Error("Game is full");
            }
            endResult = await db.query(
                `INSERT INTO ends (game_id, archer_char, end_num, numOf_shots) VALUES ($1, $2, $3, $4) RETURNING *`,
                [game_id, "A", end.end_num + 1, 3]
            );
            end = endResult.rows[0];
        }

        //Add a new shot to the end and give it a shot number that is based on the number of shots already in the end
        endShots = await db.query(
            `SELECT * FROM shot WHERE end_id = $1`,
            [end.id]
        );
        //Insert a new shot into the correct shot number
        let shotResult = await db.query(
            `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, $2, $3) RETURNING *`,
            [end.id, endShots.rowCount + 1, score]
        );

        return { end };
    }

    /** 
     * Gets all the gameIDs for a user
    */
    static async getGameIDs(user_id) {
        //Get all the games for the user
        let gameResult = await db.query(
            `SELECT * FROM games WHERE user_id = $1`,
            [user_id]
        );
        const gameIDs = gameResult.rows.map(game => {
            return game.id;
        });
        return gameIDs;
    }

};

module.exports = Game;