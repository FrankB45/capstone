import React from 'react'
import { CardTitle } from 'reactstrap'
import TimeRow from './TimeRow'

function TimeSection({ title, times, onTimeChange }) {
  return (
    <div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {times.map((time, index) => (
                <TimeRow 
                    key={index} 
                    index={index}
                    time={time.value} 
                    label={time.label} 
                    color={time.color}
                    onTimeChange={onTimeChange}
                     />
            ))}
        <hr className="my-4" />
    </div>
  )
}

export default TimeSection
