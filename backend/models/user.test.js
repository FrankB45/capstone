const { commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach, testUserIDs } = require('./_testCommon');

const User = require('./user');

const db = require('../database/dbClient');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterAll(commonAfterAll);
afterEach(commonAfterEach);

/**
 * Tests for the 
 * 
 *     USER MODEL
 * 
 *-----------------------
 */


describe("Authenticate", () => {
    it("should return the user if the username and password match", async () => {
        const user = await User.authenticate("Roland", "JohnJakeChambers");
        expect(user.username).toBe("Roland");
        expect(user.id).toBe(testUserIDs[0]);
    });
    it("should throw an error if the username and password do not match", async () => {
        try {
            await User.authenticate("Roland", "EddieDean");
            fail("Should have thrown an error with invalid password");
        } catch (err) {
            expect(err.message).toBe("Invalid username or password");
        }
    });
    it("should throw an error if the username is not found", async () => {
        try {
            await User.authenticate("EddieDean", "JohnJakeChambers");
            fail("Should have thrown an error with invalid username");
        } catch (err) {
            expect(err.message).toBe("Invalid username or password");
        }
    });
});

describe("Register", () => {
    it("should return the user id when successfully registering a new user", async () => {
        const user = await User.register("Oy", "Midworld");
        expect(user).toEqual({
            id: expect.any(Number),
            username: "Oy",
            created_at: expect.any(Date)
        });
        const foundUser = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            ["Oy"]
        );
        expect(foundUser.rows.length).toBe(1);
        expect(foundUser.rows[0].username).toBe("Oy");
    });

    it("should throw an error if the username is already taken", async () => {
        try {
            await User.register("Roland", "JohnJakeChambers");
            fail("Should have thrown an error with invalid username");
        } catch (err) {
            expect(err.message).toBe("Username already taken");
        }
    });

});

