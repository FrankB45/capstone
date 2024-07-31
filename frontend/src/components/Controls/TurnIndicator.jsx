import React from 'react';

function TurnIndicator({ scenario, turn }) {
  const getHighlightedCharacters = () => {
    let highlighted = {
      A: 'text-zinc-800',
      B: 'text-zinc-800',
      C: 'text-zinc-800',
      D: 'text-zinc-800'
    };

    switch (scenario) {
      case 'scenario1':
        if (turn === 0 || turn === 1) {
          highlighted.A = 'text-green-500';
        }
        break;
      case 'scenario2':
        if (turn === 0) {
          highlighted.A = 'text-green-500';
          highlighted.B = 'text-green-500';
        } else if (turn === 1) {
          highlighted.A = 'text-green-500';
        } else if (turn === 2) {
          highlighted.B = 'text-green-500';
        }
        break;
      case 'scenario3':
        if (turn === 0) {
          highlighted.A = 'text-green-500';
          highlighted.B = 'text-green-500';
          highlighted.C = 'text-green-500';
          highlighted.D = 'text-green-500';
        } else if (turn === 1) {
          highlighted.A = 'text-green-500';
          highlighted.B = 'text-green-500';
        } else if (turn === 2) {
          highlighted.C = 'text-green-500';
          highlighted.D = 'text-green-500';
        }
        break;
      default:
        break;
    }
    return highlighted;
  };

  const highlightedCharacters = getHighlightedCharacters();

  return (
    <h1 style={{ fontSize: 'min(6vw, 10vh)' }} className='w-1/4'>
      <span className={highlightedCharacters.A}>A</span> 
      <span className={highlightedCharacters.B}>B</span> 
      <span className={highlightedCharacters.C}>C</span> 
      <span className={highlightedCharacters.D}>D</span>
    </h1>
  );
}

export default TurnIndicator;