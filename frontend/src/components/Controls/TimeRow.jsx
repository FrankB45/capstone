import React from 'react'
import { Col, Row, CardText } from 'reactstrap'

function TimeRow({ time, label, color, onTimeChange, index }) {
  return (
    <Row className="mt-2">
      <Col xs="6" className="flex border-t border-gray-300 items-center">
        <CardText className='w-1/2'>{label}</CardText>
        <input 
            type="number" 
            className={`text-${color}-300 font-bold w-1/2`}
            value={time}
            onChange={(e) => onTimeChange(index, parseInt(e.target.value) || 0)}
            style={{ color: color}}
            />
      </Col>
    </Row>
  )
}

export default TimeRow
