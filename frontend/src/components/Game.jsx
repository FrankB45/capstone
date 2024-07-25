import { React, useState, useEffect } from 'react'
import CountDown from './ShotClock/CountDown'
import useGame from '../hooks/useGame'
import Cookies from 'js-cookie';

function Game({timeSet, offTimeSet, gameState, selectedScenario, gameSettings, setGameState}) {
    //Going to be the functional manager for the game
    //Will keep track of the game state, what ends is active, if we are in the shot timer or off timer
    //Will stop the game when it is finished

    //Will keep track if a game is started or not
    //If the game is running access to the timing/game controls should be disabled
    //If the game is not running then access to the Countdown controls should be disabled
    const [isGameRunning, setIsGameRunning] = useState(false);

    //This piece of state will be used to determine the current running time set (Can switch between shot time and off shot time)
    const [currentTimeSet, setCurrentTimeSet] = useState(timeSet);    

    //Will keep track of how many ends we have run through and how many off periods we have run through
    const [endNum, setEndNum] = useState(1);
    const [offNum, setOffNum] = useState(0);
    const [turn, setTurn] = useState(0);

    //Will keep track if the timer is running or not
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    //This will be used to manage interacting with the game API
    const { error, message, handleGame } = useGame();


    //Function to find out if we are in the shot timer or the off timer
    const isInShotTimer = () => {
        return endNum > offNum;
      };

    //Function to handle the completion of a timer in the countdown
    const handleTimerFinish = () => {

      switch (gameState) {
        //0 Not started
        case 0:
            console.log("Handle Timer has started the game");
            if(Cookies.get('username')){
                handleGame(0, 'new');
            }
            if(gameSettings.includeCountdown) {
                setGameState(1);
            }else if(gameSettings.practiceEnds > 0) {
                setGameState(2);
            }else {
                setGameState(3);
            }
            break;
        //1 Pre-Match countdown
        case 1:

            break;
        //2 Practice End
        case 2:

            break;
        //3 Shooting
        case 3:
            if (isInShotTimer()) {

              console.log("Finished a shot timer");
              setCurrentTimeSet(offTimeSet);
              setOffNum(offNum + 1);

            } else {

              console.log("Finished an off shot timer");
              setCurrentTimeSet(timeSet);
              setEndNum(endNum + 1);

            }
            break;
        //4 Match Finished
        case 4:

            break;
        default:
            break;
        }
        //setIsTimerRunning(true); // Automatically start the next timer
      };

  //Depending on the scenario, we will need to update the turn number
  const getNextTurn = () => {
      if( turn === 0 ) {
          return 1;
      }
      switch (selectedScenario) {
          case 'scenario1':
              return 1;
          case 'scenario2':
              return turn === 1 ? 2 : 1;
          case 'scenario3':
              return turn === 1 ? 2 : 1;
          default:
              return 1;
      }
  }


    //Effect to update the currentTimeSet 
    useEffect(() => {
        setCurrentTimeSet(isInShotTimer() ? timeSet : offTimeSet);
    },[timeSet, offTimeSet]);



    
  return (
    <div className='flex-1 w-full h-full'>
      <CountDown timeSet={currentTimeSet} isInShotTimer={isInShotTimer} endNum={endNum} handleTimerFinish={handleTimerFinish} isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} scenario={selectedScenario} turn={turn} gameState={gameState} />
    </div>
  )
}

export default Game
