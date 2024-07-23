import React, { useState } from 'react';

const ScoreBoard = () => {
  const [scores, setScores] = useState(Array(24).fill(Array(3).fill(null)));
  const [currentEnd, setCurrentEnd] = useState(0);
  const [currentShot, setCurrentShot] = useState(0);
  const [inputScore, setInputScore] = useState('');

  const addShot = () => {
    if (inputScore === '' || currentEnd >= 24) return;

    const score = parseInt(inputScore);
    if (isNaN(score) || score < 0 || score > 10) {
      alert('Please enter a valid score between 0 and 10');
      return;
    }

    const newScores = scores.map((end, i) => {
      if (i === currentEnd) {
        const newEnd = [...end];
        newEnd[currentShot] = score;
        return newEnd;
      }
      return end;
    });

    setScores(newScores);
    setInputScore('');

    if (currentShot === 2) {
      setCurrentShot(0);
      setCurrentEnd(currentEnd + 1);
    } else {
      setCurrentShot(currentShot + 1);
    }
  };

  const calculateTotalScore = () => {
    return scores.flat().reduce((sum, score) => sum + (score || 0), 0);
  };

  return (
    <div className="w-full p-4 min-w-[280px] max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Archery Score Board</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <div className="flex font-bold text-xs md:text-sm">
          <div className="w-10 flex-shrink-0">End</div>
          <div className="flex-grow flex">
            <div className="w-1/3">Shots</div>
            <div className="w-1/3">Total</div>
            <div className="w-1/3">Running Total</div>
          </div>
        </div>
        {scores.map((end, i) => (
          <div key={i} className="flex text-xs md:text-sm">
            <div className="w-10 flex-shrink-0">{i + 1}</div>
            <div className="flex-grow flex">
              <div className="w-1/3 flex space-x-1">
                {end.map((shot, j) => (
                  <span key={j} className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center border border-gray-300 rounded">
                    {shot !== null ? shot : '-'}
                  </span>
                ))}
              </div>
              <div className="w-1/3 flex items-center justify-center">
                {end.reduce((sum, shot) => sum + (shot || 0), 0)}
              </div>
              <div className="w-1/3 flex items-center justify-center">
                {scores.slice(0, i + 1).flat().reduce((sum, shot) => sum + (shot || 0), 0)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-lg font-bold">Total Score: {calculateTotalScore()}</p>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          max="10"
          value={inputScore}
          onChange={(e) => setInputScore(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-16 md:w-20"
          placeholder="Score"
        />
        <button
          onClick={addShot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Shot
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;