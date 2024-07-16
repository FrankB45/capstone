const db = require('../database/dbClient');
const { BCRYPT_WORK_FACTOR } = require('../config/config');
const bcrypt = require('bcryptjs');

const testGameIDs = [];
const testUserIDs = [];

async function commonBeforeAll() {
    //This code was referenced from Express-Jobly's testing 
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM games");
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM users");


    //Creates fake users for testing
    let u1PW = await bcrypt.hash('JohnJakeChambers', BCRYPT_WORK_FACTOR);
    let u1 = await db.query(
        `INSERT INTO users (username, password) VALUES ('Roland', $1) RETURNING id`,
        [u1PW]
    );
    testUserIDs.push(u1.rows[0].id);
    let u2PW = await bcrypt.hash('EddieDean', BCRYPT_WORK_FACTOR);
    let u2 = await db.query(
        `INSERT INTO users (username, password) VALUES ('Susannah', $1) RETURNING id`,
        [u2PW]
    );
    testUserIDs.push(u2.rows[0].id);

    /**
     * Creates fake games for testing
     * -----------------------------------------
     */
    //This game will contain a full end to use for testing
    let g1 = await db.query(
        `INSERT INTO games (user_id, numOf_ends) VALUES ($1, 24) RETURNING id`,
        [testUserIDs[0]]
    );
    testGameIDs.push(g1.rows[0].id);
    //This game will contain no ends to use for testing
    let g2 = await db.query(
        `INSERT INTO games (user_id, numOf_ends) VALUES ($1, 24) RETURNING id`,
        [testUserIDs[1]]
    );
    testGameIDs.push(g2.rows[0].id);
    //This game will be a full/complete game
    let g3 = await db.query(
        `INSERT INTO games (user_id, numOf_ends) VALUES ($1, 24) RETURNING id`,
        [testUserIDs[0]]
    );
    testGameIDs.push(g3.rows[0].id);
    //This game will have a partial end to fill
    let g4 = await db.query(
        `INSERT INTO games (user_id, numOf_ends) VALUES ($1, 24) RETURNING id`,
        [testUserIDs[0]]
    );
    testGameIDs.push(g4.rows[0].id);

    //Creates fake ends for testing
    let e1 = await db.query(
        `INSERT INTO ends (game_id, archer_char, end_num, numOf_shots) VALUES ($1, 'A', 1, 3) RETURNING id`,
        [testGameIDs[0]]
    );
    //For use in partial end test
    let e2 = await db.query(
        `INSERT INTO ends (game_id, archer_char, end_num, numOf_shots) VALUES ($1, 'A', 2, 3) RETURNING id`,
        [testGameIDs[3]]
    );

    //Creates fake shots for testing
    //For use in full end test
    let s1 = await db.query(
        `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, 1, -1) RETURNING shot_id`,
        [e1.rows[0].id]
    );
    let s2 = await db.query(
        `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, 2, -1) RETURNING shot_id`,
        [e1.rows[0].id]
    );
    let s3 = await db.query(
        `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, 3, -1) RETURNING shot_id`,
        [e1.rows[0].id]
    );
    //For use in partial end test
    let s4 = await db.query(
        `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, 4, -1) RETURNING shot_id`,
        [e2.rows[0].id]
    );
    let s5 = await db.query(
        `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, 5, -1) RETURNING shot_id`,
        [e2.rows[0].id]
    );


    /**
     * This is going to fil g3 with a full game of ends and shots
     * -------------------
     */

    for (let endNum = 1; endNum <= 24; endNum++) {
        let e = await db.query(
            `INSERT INTO ends (game_id, archer_char, end_num, numOf_shots) VALUES ($1, 'A', $2, 3) RETURNING id`,
            [g3.rows[0].id, endNum]
        );
        for (let shotNum = 1; shotNum <= 3; shotNum++) {
            await db.query(
                `INSERT INTO shot (end_id, shot_number, score) VALUES ($1, $2, 10)`,
                [e.rows[0].id, shotNum]
            );
        }
    }

}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterAll() {
    await db.end();
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
    testGameIDs,
    testUserIDs
};