import { useState } from 'react';
import API_ROUTES from '../config';
import axios from 'axios';

const useAuth = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleAuth = async (username, password, action) => {
        setError('');
        setMessage('');

        if (!username || !password) {
            setError('Username and password are required.');
            return;
        }

        const endpoint = action === 'login' ? API_ROUTES.AUTHENTICATE : API_ROUTES.REGISTER;

        try {

            const response = await axios.post(endpoint, {
                username,
                password
            });

            if (response.status === 200) {
                setMessage(action === 'login' ? 'Login successful!' : 'Registration successful!');
                //Should be OK here because of HTTP-Only cookies
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
