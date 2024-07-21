import { React, useState, useRef, useEffect } from 'react'
import Controls from './Controls'

function CountDown({timeSet}) {

  //Used to keep track of the running time
  const [time, setTime] = useState(timeSet.reduce((acc, time) => acc + time, 0));
  //Used to keep track of the running state
  const [isRunning, setIsRunning] = useState(false);
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

  const handleStop = () => {
    setIsRunning(false);
    setTime(time);
  };

  const handleReverse = () => {
    setIsRunning(false);
    setTime(timeSet[3]);
  };

  //Effect to stop and start the inverval clock
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  //Effect to update the time based on the timeSet
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
      if (time > timeSet[1]) {
        return 'text-green-600';
      } else if (time > timeSet[2]) {
        return 'text-orange-600';
      } else {
        return 'text-red-600';
      }
    }

  return (
    <div>
      <div style={{ 
        fontSize: 'min(10vw, 20vh)'
      }} className={`flex flex-col items-center justify-center ${getColor()}`}>
        <div style={{ 
          fontSize: '3em', 
          fontWeight: 'bold'
        }} className='font-bold text-5xl' >
          {formatTime(time)}
        </div>
       
      </div>
      <div className='flex'>
        <Controls handleStart={handleStart} handlePause={handlePause} handleStop={handleStop} handleReverse={handleReverse} />
        <h1 style={{ 
          fontSize: 'min(6vw, 10vh)'
        }} className='w-1/2 text-center' >AB CD</h1>
      </div>
    </div>
  )
}

export default CountDown
