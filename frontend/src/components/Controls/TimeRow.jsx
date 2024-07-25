import React from 'react'
import { Col, Row, CardText } from 'reactstrap'

function TimeRow({ time, label, color, onTimeChange, index }) {
  return (
    <Row className="">
      <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
        <CardText className='w-1/2 text-center'>{label}</CardText>
        <div className='w-1/2 text-center'>
        <input 
            type="number" 
            className={`text-${color}-300 bg-zinc-700 font-bold text-center w-1/4`}
            value={time}
            onChange={(e) => onTimeChange(index, parseInt(e.target.value) || 0)}
            style={{ color: color}}
            min={0}
            max={500}
            />
          </div>
      </Col>
    </Row>
  )
}

export default TimeRow
