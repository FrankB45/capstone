import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

function Scenarios({ onScenarioChange }) {
  const [selectedScenario, setSelectedScenario] = useState('scenario1');

  useEffect(() => {
    onScenarioChange(selectedScenario);
  }, [selectedScenario]);

  const handleScenarioChange = (event) => {
    setSelectedScenario(event.target.value);
  };

  return (
    <Card className="p-1">
      <CardBody className='border border-gray-300 shadow-md'>
        <CardTitle className="text-xl font-bold pb-3 pl-2">Game Scenarios</CardTitle>
        <Row className="">
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-1/2 text-center'>1 Archer per turn, 1 turn per end [A]</CardText>
            <div className='w-1/2 text-center'>
              <input
                type="radio"
                name="scenario"
                value="scenario1"
                className="text-gray-300 bg-zinc-700 font-bold text-center w-1/4"
                checked={selectedScenario === 'scenario1'}
                onChange={handleScenarioChange}
                style={{ color: 'gray' }}
              />
            </div>
          </Col>
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-1/2 text-center'>1 Archer per turn, 2 turns per end [A-B]</CardText>
            <div className='w-1/2 text-center'>
              <input
                type="radio"
                name="scenario"
                value="scenario2"
                className="text-gray-300 bg-zinc-700 font-bold text-center w-1/4"
                checked={selectedScenario === 'scenario2'}
                onChange={handleScenarioChange}
                style={{ color: 'gray' }}
              />
            </div>
          </Col>
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-1/2 text-center'>2 Archers per turn, 2 turns per end [AB-CD]</CardText>
            <div className='w-1/2 text-center'>
              <input
                type="radio"
                name="scenario"
                value="scenario3"
                className="text-gray-300 bg-zinc-700 font-bold text-center w-1/4"
                checked={selectedScenario === 'scenario3'}
                onChange={handleScenarioChange}
                style={{ color: 'gray' }}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Scenarios;