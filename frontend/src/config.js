require('dotenv').config()

const API_URL = process.env.API_URL || 'http://localhost:3001';

const API_ROUTES = {
    REGISTER: `${API_URL}/users/register`,
    AUTHENTICATE: `${API_URL}/users/authenticate`,
    NEW_GAME: `${API_URL}/games/new`,
    GET_GAME: `${API_URL}/games/${game_id}`,
    ADD_SHOT: `${API_URL}/games/${game_id}/addShot`,
}

module.exports = {
    API_ROUTES
};