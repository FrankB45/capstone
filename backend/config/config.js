require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

const SECRET_KEY = process.env.SECRET_KEY || "reallyBadSecret"

//Sets a bcrypt work factor based on if we are testing or not
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13

//Pulls port and converts to integer
const PORT = +process.env.PORT || 3001

//Provies a function to pull the db URI based on test env or not
function getDbURI() {
    return process.env.NODE_ENV === "test"
        ? `postgres://${DB_USER}:${DB_PASS}@localhost:5432/archshot_test`
        : `postgres://${DB_USER}:${DB_PASS}@localhost:5432/archshot`
}

console.log("ArchShot Config: ");
console.log("SECRET_KEY: ", SECRET_KEY);
console.log("BCRYPT_WORK_FACTOR: ", BCRYPT_WORK_FACTOR);
console.log("PORT: ", PORT);
console.log("DB_URI: ", getDbURI());
console.log("-----------");

module.exports = {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    PORT,
    getDbURI
}
