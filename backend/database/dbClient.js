/**
 * Client configuration for database
 * 
 * Uses pg to interface with the db
 * 
 * Does not verify SSL certs
 */

const { Client } = require('pg');
const { getDbURI } = require('../config/config');

let db;


console.log("DB Client: Not verifying SSL certs");
db = new Client({
    connectionString: getDbURI(),
    ssl: {
        rejectUnauthorized: false
    }
});


db.connect();

module.exports = db;

