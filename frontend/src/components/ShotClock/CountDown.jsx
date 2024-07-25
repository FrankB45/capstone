import { React, useState, useRef, useEffect } from 'react'
import Controls from './Controls'
import TurnIndicator from '../Controls/TurnIndicator'
import './CountDown.css'

/**
 * gameState will be used to determine the state that the control buttons should be in
 * timeSet will be the set of times that the timer should countdown from
 * isInShotTimer will change a display value to show if the timer is in the shot or off-shot mode
 * endNum will change a display value to show the current end number
 * handleTimerFinish will be called when the timer finishes
 * 
 */

function CountDown({ gameState, timeSet, isInShotTimer, endNum, handleTimerFinish, isRunning, setIsRunning, scenario, turn }) {
  //Used to keep track of the running time
  const [time, setTime] = useState(timeSet.reduce((acc, time) => acc + time, 0));
  //Used to keep track of the running state
  //const [isRunning, setIsRunning] = useState(false);
  //Interval reference to keep track of the running Interval clock
  const intervalRef = useRef(null);

  // Helper functions for the control buttons
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleNext = () => {
    setIsRunning(false);
    handleTimerFinish();
  };

  const handleReverse = () => {
    setIsRunning(false);
    setTime(timeSet.reduce((acc, time) => acc + time, 0));
  };

  const handleGameStart = () => {
    handleTimerFinish();
  };

  //Effect to stop and start the interval clock 
  useEffect(() => { 
    if (isRunning) { 
      //While the timer is running, the interval will decrement time every second.
      intervalRef.current = setInterval(() => { 
        setTime((prevTime) => { 
          if (prevTime > 0) { 
            return prevTime - 1; 
          }else { 
            clearInterval(intervalRef.current); 
            setIsRunning(false);
            handleTimerFinish(); 
            return 0; 
          } 
      }); }, 1000);
    }else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current); 
    } 
    return () => clearInterval(intervalRef.current); 
  }, [isRunning]); 

  //Effect to update the time based on changes to the timeSet
  //This should be removed I think or reworked to only allow changes during certain state
  useEffect(() => {
    let totalTime = timeSet.reduce((acc, time) => acc + time, 0);
    setTime(totalTime);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [timeSet]);
    
  //Helper function to convert seconds into MM:SS format
  const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    };
  
  //gets the color for the time based on the timeSet
  const getColor = () => {
    const totalTime = timeSet.reduce((acc, time) => acc + time, 0);
    const greenTime = totalTime - timeSet[0];
    const yellowTime = greenTime - timeSet[1];
  
    if (time > greenTime) {
      return 'text-green-600';
    } else if (time > yellowTime) {
      return 'text-orange-600';
    } else {
      return 'text-red-600';
    }
  }

  return (
    <div className='flex-1 w-full h-full'>
      <div style={{ 
        fontSize: 'min(10vw, 20vh)'
      }} className={`flex flex-col items-center justify-center h-4/5 ${getColor()}`}>
        <div style={{ 
          fontSize: '3em', 
          fontFamily: 'tech'
        }} className='text-5xl clock-font' >
          {formatTime(time)}
        </div>
      </div>
      
      <div className='flex justify-center items-center'>
        <Controls handleStart={handleStart} handlePause={handlePause} handleNext={handleNext} handleReverse={handleReverse} isRunning={isRunning} gameState={gameState} handleGameStart={handleGameStart} />  
        <div className='w-1/4'>
          <p style={{ 
        fontSize: 'min(2vw, 2vh)'
      }} className='font-bold'>Currently in: {isInShotTimer() ? "Shot Time" : "Off-Shot Time"}</p>
          <p style={{ 
        fontSize: 'min(2vw, 2vh)'
      }} >End Number: {endNum}/24</p>
        </div>
        <TurnIndicator scenario={scenario} turn={turn} />
      </div>
    </div>
  )
}

export default CountDown
