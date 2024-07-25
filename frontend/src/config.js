
const API_URL = 'http://localhost:3001';

const API_ROUTES = {
    BASE: `${API_URL}`,
    REGISTER: `${API_URL}/users/register`,
    AUTHENTICATE: `${API_URL}/users/authenticate`,
    NEW_GAME: `${API_URL}/games/new`,
    GET_GAME: `${API_URL}/games/`,
    LOGOUT: `${API_URL}/users/logout`,
}

export default API_ROUTES;