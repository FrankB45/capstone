import { React, useState, useEffect } from 'react'
import { Card, CardBody, Button, CardTitle } from 'reactstrap'
import TimeSection from './TimeSection'

function Timings({setTimeSet}) {
    //ShotMode indicates if we are using 30 seconds per arrow or 40 seconds per arrow
    //true = 30 seconds per arrow
    //false = 40 seconds per arrow
    const [shotMode, setShotMode] = useState(true);
    //pre-defined timings for 30 and 40 seconds per arrow
    const sec30 = [50, 30, 10];
    const sec40 = [70, 40, 10];
    //Managed time sets
    //Changing these will change when the clock changes color
    const [timings, setTimings] = useState([
        { value: 60, label: 'Seconds Green', color: 'green' },
        { value: 30, label: 'Seconds Yellow', color: 'yellow' },
        { value: 10, label: 'Seconds Red', color: 'red' },
    ]);
    const [offTimings, setOffTimings] = useState([
        { value: 0, label: 'Seconds Green', color: 'green' },
        { value: 30, label: 'Seconds Yellow', color: 'yellow' },
        { value: 10, label: 'Seconds Red', color: 'red' },
      ]);
    
    //This function will update the timings based on the index and new time
    const handleTimingChange = (index, newTime, updater) => {
      updater((prev) => {
        const newTimings = prev.map((time, i) =>
          i === index ? { ...time, value: newTime } : time
        );
  
        // Update the parent component's state
        setTimeSet(newTimings.map(t => t.value));
  
        return newTimings;
      });
    };

    //This effect will update the timings based on the shotMode state
    useEffect(() => {
        if (shotMode){
            sec30.forEach((time, index) => {
                handleTimingChange(index, time, setTimings)
            });
        }
        if (!shotMode){
            sec40.forEach((time, index) => {
                handleTimingChange(index, time, setTimings)
            });
        }
    }, [shotMode]);


  return (
      <Card className="p-1">
        <CardBody className='border border-gray-300 shadow-md'>
          <TimeSection title="Shot timing" times={timings} onTimeChange={(index, newTime) => handleTimingChange(index, newTime, setTimings) } />
          <TimeSection title="Off-shot timing" times={offTimings} onTimeChange={ (index, newTime) => handleTimingChange(index, newTime, setOffTimings) } />
          <div className="">
            <CardTitle className="text-xl font-bold pb-3 pl-2">Seconds per arrow</CardTitle>
            <div className="flex justify-around pb-2">
                <Button className={`text-white px-4 py-2 ${shotMode ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => setShotMode(true)}>
                30 Seconds
                </Button>
                <Button className={`text-white px-4 py-2 ${!shotMode ? 'bg-blue-500' : 'bg-gray-500'}`} onClick={() => setShotMode(false)}>
                40 Seconds
                </Button>
            </div>
          </div>
        </CardBody>
      </Card>
  )
}

export default Timings
