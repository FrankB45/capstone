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
    //const [isGameRunning, setIsGameRunning] = useState(false);

    //This piece of state will be used to determine the current running time set (Can switch between shot time and off shot time)
    const [currentTimeSet, setCurrentTimeSet] = useState(timeSet);    

    //Will keep track of how many ends we have run through and how many off periods we have run through
    const [endNum, setEndNum] = useState(1);
    const [isShotTime, setIsShotTime] = useState(true);
    const [turn, setTurn] = useState(0);

    //Will keep track if the timer is running or not
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    //This will be used to manage interacting with the game API
    const { error, message, handleGame } = useGame();

    const [title, setTitle] = useState("");

    //Function for crafting a title
    const getTitle = () => {
        let newTitle = "";
        if(turn === 0 )
            return null;
        if(endNum > 24 || (endNum === 1 && turn === 1 && isShotTime === true))
            return null;
        if (selectedScenario === 'scenario1') {
            newTitle = isShotTime ? `Shooting End - ${endNum}` : `Off-Shot End - ${endNum}`;
        }else {
            newTitle = isShotTime ? `Shooting - E.${endNum}, T.${turn}` : `Off-Shot- E.${endNum}, T.${turn}`;
        }
        return newTitle;
    }

    //Function to handle the completion of a timer in the countdown
    const handleTimerFinish = () => {
    switch (gameState) {
        case 0: // Game Not Started, User has clicked the Start Button
            //If the user is logged in, start a new game with the API
            if (Cookies.get('username')) {
                handleGame(0, 'new');
            }
            if (gameSettings.includeCountdown) {
                //Set up the Clock for Pre-Match Countdown
                setGameState(1);
                setCurrentTimeSet([ 0, gameSettings.preMatchTime, 0]);
                setTitle("Pre-Match Countdown");
            } else if (gameSettings.practiceEnds > 0) {
                //No pre-match countdown, but practice ends set up first practice end
                setGameState(2);
                setTitle("Practice End");
            } else {
                //No pre-match countdown, no practice ends, start the game
                setGameState(3);
                setTitle("Start Game - End 1");
                setTurn(1);
            }
            console.log("Hello from 0");
            break;

        case 1: // Pre-Match Countdown
            //Following a pre-match countdown, check if practice ends are set
            if (gameSettings.practiceEnds > 0) {
                //Set up first practice end if so
                setGameState(2);
                setCurrentTimeSet(timeSet);
                setTitle("Practice End");
            } else {
                //No practice ends, start the game
                setGameState(3);
                setCurrentTimeSet(timeSet);
                setTurn(1);
                setTitle("Start Game - End 1");
            }
            console.log("Hello from 1");
            break;

        case 2: // Practice End
            if (endNum < gameSettings.practiceEnds) {
                setEndNum(endNum + 1);
                setTitle(`Practice End ${endNum + 1}`);
            } else {
                setGameState(3);
                setEndNum(1);
                setCurrentTimeSet(timeSet);
                setTurn(1);
                setTitle("Start Game - End 1");
            }
            console.log("Hello from 2");
            break;

        case 3: // Shooting Phase
            //No more than 24 ends for the moment, should be configurable later
            if(endNum > 24){
                setGameState(4);
                setTitle("Game Finished");
                return;
            }
            if(isShotTime){
                //Always move to Off-Shot after a Shot timer
                setIsShotTime(false);
                setCurrentTimeSet(offTimeSet);
                
            }else {
                if(selectedScenario === 'scenario1' || (selectedScenario !== 'scenario1' && turn === 2)){
                    //End Finished, Move to next end
                    setEndNum(prevEnd => prevEnd + 1);//Functional update... lets see if it works??
                    setTurn(1);
                } else if(selectedScenario !== 'scenario1' && turn === 1) {
                    //Move to next turn
                    setTurn(2);
                }
                setIsShotTime(true);
                setCurrentTimeSet(timeSet);
            }
            console.log("Hello from 3");
            break;

        case 4: // Game Finished
            console.log("Hello from 4");
        break;

        default:
            console.log("Hello from def");
        break;
    }
    };

    //Effect to update the currentTimeSet 
    useEffect(() => {
        setCurrentTimeSet(isShotTime ? timeSet : offTimeSet);
    },[timeSet, offTimeSet]);



    
  return (
    <div className='flex-1 w-full h-full'>
      <CountDown timeSet={currentTimeSet} isInShotTimer={isShotTime} endNum={endNum} handleTimerFinish={handleTimerFinish} isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} scenario={selectedScenario} turn={turn} gameState={gameState} title={getTitle() || title} />
    </div>
  )
}

export default Game
