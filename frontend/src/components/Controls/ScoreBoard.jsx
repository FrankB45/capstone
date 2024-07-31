import React, { useState, useEffect } from 'react';
import useGame from '../../hooks/useGame';
import Cookies from 'js-cookie';

const ScoreBoard = () => {
  const [scores, setScores] = useState([Array(3).fill(null)]);
  const [currentEnd, setCurrentEnd] = useState(0);
  const [currentShot, setCurrentShot] = useState(0);
  const [inputScore, setInputScore] = useState('');
  
  const { error, message, handleGame } = useGame();

  const addShot = () => {
    if (inputScore === '' || currentEnd >= 24) return;

    const score = parseInt(inputScore);
    if (isNaN(score) || score < 0 || score > 10) {
      alert('Please enter a valid score between 0 and 10');
      return;
    }

    handleGame(score, 'addShot');

    const newScores = [...scores];
    if (!newScores[currentEnd]) {
      newScores[currentEnd] = Array(3).fill(null);
    }
    newScores[currentEnd][currentShot] = score;
    setScores(newScores);
    setInputScore('');

    if (currentShot === 2) {
      setCurrentShot(0);
      if (currentEnd < 23) {
        setCurrentEnd(currentEnd + 1);
      }
    } else {
      setCurrentShot(currentShot + 1);
    }
  };

  const calculateTotalScore = () => {
    return scores.flat().reduce((sum, score) => sum + (score || 0), 0);
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameId = Cookies.get('gameID');
        if (gameId) {
          const gameData = await handleGame(null, 'getGame');
          if (gameData && gameData.game) {
            const fetchedScores = gameData.game.ends.map(end => {
              const shots = end.shots.map(shot => shot.score);
              while (shots.length < 3) {
                shots.push(null);
              }
              return shots;
            });
            setScores(fetchedScores);
            setCurrentEnd(fetchedScores.length);
            setCurrentShot(fetchedScores[fetchedScores.length - 1]?.filter(shot => shot !== null).length || 0);
          }
        } else {
          // Initialize an empty game with just the first end
          console.log("Initializing an empty game");
          setScores([Array(3).fill(null)]);
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Archery Score Board</h2>
      
      <div className="mb-4 grid grid-cols-12 gap-2 font-semibold text-center">
        <div className="col-span-1">End</div>
        <div className="col-span-9">Shots</div>
        <div className="col-span-2">Total</div>
      </div>

      <div className="space-y-2">
        {scores.map((end, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-1 text-center font-semibold">{i + 1}</div>
            <div className="col-span-9 grid grid-cols-3 gap-2">
              {end.map((shot, j) => (
                <div key={j} className="border border-gray-300 p-2 text-center">
                  {shot !== null ? shot : '-'}
                </div>
              ))}
            </div>
            <div className="col-span-2 text-center font-semibold">
              {end.reduce((sum, shot) => sum + (shot || 0), 0)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-bold">
          Total Score: {calculateTotalScore()}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="0"
            max="10"
            value={inputScore}
            onChange={(e) => setInputScore(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-16 text-center"
            placeholder="Score"
            disabled={currentEnd >= 24}
          />
          <button
            onClick={addShot}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            disabled={currentEnd >= 24}
          >
            Add Shot
          </button>
        </div>
      </div>

      {(error || message) && (
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
