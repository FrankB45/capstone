import { React, useState, useEffect } from 'react'
import CountDown from './ShotClock/CountDown'

function Game({timeSet, offTimeSet}) {
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

    //Will keep track if the timer is running or not
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    //Function to find out if we are in the shot timer or the off timer
    const isInShotTimer = () => {
        return endNum > offNum;
      };

    //Function to handle the completion of a timer in the countdown
    const handleTimerFinish = () => {
        if (isInShotTimer()) {
          console.log("Finished a shot timer");
          setCurrentTimeSet(offTimeSet);
          setOffNum(offNum + 1);
        } else {
          console.log("Finished an off shot timer");
          setCurrentTimeSet(timeSet);
          setEndNum(endNum + 1);
        }
        //setIsTimerRunning(true); // Automatically start the next timer
      };


    //Effect to update the currentTimeSet 
    useEffect(() => {
        setCurrentTimeSet(isInShotTimer() ? timeSet : offTimeSet);
    },[timeSet, offTimeSet]);



    
  return (
    <div>
      <CountDown timeSet={currentTimeSet} isInShotTimer={isInShotTimer} endNum={endNum} handleTimerFinish={handleTimerFinish} isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} />
    </div>
  )
}

export default Game
