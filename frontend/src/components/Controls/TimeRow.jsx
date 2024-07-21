import React from 'react'
import { Col, Row, CardText } from 'reactstrap'

function TimeRow({ time, label, color, onTimeChange, index }) {
  return (
    <Row className="">
      <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
        <CardText className='w-1/2 text-center'>{label}</CardText>
        <input 
            type="number" 
            className={`text-${color}-300 font-bold w-1/2 text-center`}
            value={time}
            onChange={(e) => onTimeChange(index, parseInt(e.target.value) || 0)}
            style={{ color: color}}
            />
      </Col>
    </Row>
  )
}

export default TimeRow
