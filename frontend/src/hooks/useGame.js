import { useState } from 'react';
import API_ROUTES from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';

const useGame = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleGame = async (score, action) => {
        setError('');
        setMessage('');

        if (action === 'new') {
            if (Cookies.get('userID')) {
                try {
                    const response = await axios.post(`${API_ROUTES.BASE}/games/${Cookies.get('userID')}/new`, {
                        numOf_ends: 24
                    }, { withCredentials: true });
                    if (response.status === 201) {
                        setMessage('Game created successfully!');
                        Cookies.set('gameID', response.data.game.id);
                    }

                } catch (error) {

                }
            } else {
                setError('Must be signed in to create a game.');
                console.log("A new game was attempted without being signed in");
                return;
            }
        }

        if (action === 'addShot') {
            if (Cookies.get('gameID')) {

                if (0 <= score || score <= 10) {
                    try {
                        const response = await axios.post(`${API_ROUTES.BASE}/games/${Cookies.get('gameID')}/addShot`, {
                            score
                        }, { withCredentials: true });
                        if (response.status === 201) {
                            setMessage('Shot added successfully!');
                        }

                    } catch (error) {
                        setError(error.response.data.message || "Error from Server Received");
                    }
                }


                setError('Score is required.');
                return;

            } else {
                setError('Must be signed in to add a shot.');
                console.log("A shot was attempted without being signed in");
                return;
            }

        }

    };
    return { error, message, handleGame };
};

export default useGame;
