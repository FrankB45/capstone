import React from 'react'
import { CardTitle, Row, Col, CardText } from 'reactstrap'
import TimeRow from './TimeRow'

function TimeSection({ title, times, onTimeChange }) {
  return (
    <div>
        <CardTitle className="text-xl font-bold p-2">{title}</CardTitle>
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
        <Row className="pt-2">
          <Col xs="6" className="pt-1 flex border-t border-gray-300 items-center">
          <CardText className='w-1/2 text-center'>Total</CardText>
            <p className='w-1/2 text-center font-bold'>{times.reduce((acc, time) => {
              return acc + time.value;
            }, 0)}</p>
            
          </Col>
        </Row>
        <hr className="my-4" />
    </div>
  )
}

export default TimeSection
