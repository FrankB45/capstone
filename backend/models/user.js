const db = require('../database/dbClient');
const bcrypt = require('bcryptjs');
const { BCRYPT_WORK_FACTOR } = require('../config/config');


/** Functions related to users
 *  Middlelayer between routes and the database
 */

class User {

    /** 
     * Inserts a new user into the database
     * 
     * Returns { id, username, created_at }
     * 
     * Throws { Error } Throws an error if the username is already taken
     * TODO: Implement error handling
     * 
     * Parameters { username, password }
     */
    static async register(username, password) {
        //Perform a check to see if the username is already taken
        const dupCheck = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );

        if (dupCheck.rowCount > 0) {
            //TODO: Implement error handling
            throw new Error("Username already taken");
        }

        //Hash the password so no secure info is stored in plaintext
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        //Insert the user into the database
        const result = await db.query(
            `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at`,
            [username, hashedPassword]
        );
        const user = result.rows[0];
        return user;
    }

    /**
     * Authenticates a users credentials
     * 
     * Returns { id, username, created_at }
     * 
     * Throws { Error } Throws an error if the username or password is incorrect
     * TODO: Implement error handling
     * 
     * Parameters { username, password }
     */
    static async authenticate(username, password) {
        //Perform a check to find the user first
        const result = await db.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );

        //Pull info from the result
        const user = result.rows[0];

        //Check if the password matches
        if (user) {
            //compare hashed pw to the new hash
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                //Remove the password from memory NO PLAINTEXT!
                delete user.password;
                //If the password is valid, return the user
                return user;
            }
        }
        //TODO: Implement error handling
        throw new Error("Invalid username or password");
    }






};

module.exports = User;
