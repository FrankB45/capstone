import { useState } from 'react';
import API_ROUTES from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuth = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleAuth = async (username, password, action) => {
        setError('');
        setMessage('');

        if (action === 'logout') {
            try {
                const response = await axios.post(API_ROUTES.LOGOUT, {}, { withCredentials: true });
                if (response.status === 200) {
                    Cookies.remove('username');
                    Cookies.remove('userID');
                    setMessage('Logout successful!');
                }
            } catch (err) {
                setError('Error logging out. Please try again.');
            }
            return;
        }

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        const endpoint = action === 'login' ? API_ROUTES.AUTHENTICATE : API_ROUTES.REGISTER;

        try {

            const response = await axios.post(endpoint, {
                username,
                password
            }, { withCredentials: true });

            if (response.status === 200 || response.status === 201) {
                setMessage(action === 'login' ? 'Login successful!' : 'Registration successful!');
                Cookies.set('username', response.data.user.username);
                Cookies.set('userID', response.data.user.id);
            }


        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Error from Server Received");
            } else if (err.request) {
                setError("No response from API Server. Please try again.");
            } else {
                setError("Error with Auth");
            }

        }
    };
    return { error, message, handleAuth };
};

export default useAuth;
