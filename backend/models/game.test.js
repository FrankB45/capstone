const { commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, testGameIDs, testUserIDs } = require('./_testCommon');

const User = require('./user');
const Game = require('./game');

const db = require('../database/dbClient');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterAll(commonAfterAll);
afterEach(commonAfterEach);

/**
 * Tests for the 
 * 
 *     GAME MODEL
 * 
 *  testGameIDs[0] is a full end game 
 *  testGameIDs[1] is an empty game
 *  testGameIDs[2] is a full game
 * 
 *-----------------------
 */

describe("newGame", () => {

    it("returns the id of the new game and uses the default numOf_ends", async () => {
        const game = await Game.newGame(testUserIDs[0]);
        expect(game).toEqual({
            id: expect.any(Number),
            user_id: testUserIDs[0],
            numof_ends: 24,
            created_at: expect.any(Date),
            game_date: expect.any(Date)
        });
        const gameResult = await db.query(
            `SELECT * FROM games WHERE id = $1`,
            [game.id]
        );
        expect(gameResult.rowCount).toBe(1);
        expect(gameResult.rows[0].numof_ends).toBe(24);
    });

    it("sets the numOf_ends to the number provided", async () => {
        const game = await Game.newGame(testUserIDs[0], 5);
        expect(game).toEqual({
            id: expect.any(Number),
            user_id: testUserIDs[0],
            numof_ends: 5,
            created_at: expect.any(Date),
            game_date: expect.any(Date)

        });
        const gameResult = await db.query(
            `SELECT * FROM games WHERE id = $1`,
            [game.id]
        );
        expect(gameResult.rowCount).toBe(1);
        expect(gameResult.rows[0].numof_ends).toBe(5);
    });

});

describe("getGame", () => {
    it("returns the expected game for the given id", async () => {
        const game = await Game.getGame(testGameIDs[0]);
        expect(game).toEqual({
            id: testGameIDs[0],
            user_id: testUserIDs[0],
            numof_ends: 24,
            created_at: expect.any(Date),
            game_date: expect.any(Date),
            ends: expect.any(Array)
        });
    });
    it("throws an error if the game does not exist", async () => {
        try {
            await Game.getGame(1990);
            fail("Expected an error to be thrown for a game that does not exist");
        } catch (err) {
            expect(err.message).toEqual("Game not found");
        }
    });
});

describe("addShot", () => {
    it("should add a new end if the game has no ends", async () => {
        const gameWithNoEnds = testGameIDs[1];//Game ID that has no ends created

        //Check that the game has no ends before adding a shot
        const initialGameRes = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [gameWithNoEnds]
        );

        expect(initialGameRes.rowCount).toBe(0);

        const result = await Game.addShot(gameWithNoEnds, 10);

        expect(result.end).toEqual({
            id: expect.any(Number),
            game_id: gameWithNoEnds,
            archer_char: "A",
            end_num: 1,
            numof_shots: 3,
            created_at: expect.any(Date)
        });

    });

    it("should add a shot to the latest end if the game contains an end that is not full", async () => {
        const partialEndGame = testGameIDs[3];

        //Check that the game has one end with less than 3 shots
        const initialEndResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [partialEndGame]
        );
        expect(initialEndResult.rows).toHaveLength(1);
        let end = initialEndResult.rows[0];

        const initialShotsResult = await db.query(
            `SELECT * FROM shot WHERE end_id = $1`,
            [end.id]
        );
        expect(initialShotsResult.rows).toHaveLength(2);

        //Add a shot to the end
        const result = await Game.addShot(partialEndGame, 10);

        expect(result.end).toEqual({
            id: expect.any(Number),
            game_id: partialEndGame,
            archer_char: "A",
            end_num: 2,
            numof_shots: 3,
            created_at: expect.any(Date)
        });

        let end2Result = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [partialEndGame]
        );
        expect(end2Result.rows).toHaveLength(1);
        let end2 = end2Result.rows[0];
        let shots2Result = await db.query(
            `SELECT * FROM shot WHERE end_id = $1`,
            [end2.id]
        );
        expect(shots2Result.rows).toHaveLength(3);
    });

    it("should add a new end if the game contains an end that is full", async () => {
        const fullEndGame = testGameIDs[0];

        // verify the end is full 
        const endResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [fullEndGame]
        );
        expect(endResult.rows).toHaveLength(1);
        let end = endResult.rows[0];

        const shotsResult = await db.query(
            `SELECT * FROM shot WHERE end_id = $1`,
            [end.id]
        );
        expect(shotsResult.rows).toHaveLength(3);

        // Add a shot to the end
        const result = await Game.addShot(fullEndGame, 10);

        expect(result.end).toEqual({
            id: expect.any(Number),
            game_id: fullEndGame,
            archer_char: "A",
            end_num: 2,
            numof_shots: 3,
            created_at: expect.any(Date)
        });

        let end2Result = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [fullEndGame]
        );
        expect(end2Result.rows).toHaveLength(2);

    });

    it("should throw an error if the game is full", async () => {
        const fullGame = testGameIDs[2];
        // Verify that the game is full before attempting to add a shot
        const endsResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [fullGame]
        );
        expect(endsResult.rows).toHaveLength(24); // A full game should have 24 ends

        for (let end of endsResult.rows) {
            const shotsResult = await db.query(
                `SELECT * FROM shot WHERE end_id = $1`,
                [end.id]
            );
            expect(shotsResult.rows).toHaveLength(3); // Each end should have 3 shots
        }

        // Attempt to add a shot, which should throw an error
        await expect(Game.addShot(fullGame, 10)).rejects.toThrow("Game is full");

        // Verify that no new end or shot was added
        const finalEndsResult = await db.query(
            `SELECT * FROM ends WHERE game_id = $1`,
            [fullGame]
        );
        expect(finalEndsResult.rows).toHaveLength(24);
    });


});



