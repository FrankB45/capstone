import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row, Col, CardText } from 'reactstrap';

function GameControls({ onSettingsChange }) {
  const [includeCountdown, setIncludeCountdown] = useState(false);
  const [preMatchTime, setPreMatchTime] = useState(60);
  const [practiceEnds, setPracticeEnds] = useState(0);

  useEffect(() => {
    onSettingsChange({ includeCountdown, preMatchTime, practiceEnds });
  }, [includeCountdown, preMatchTime, practiceEnds]);

  const handleIncludeCountdownChange = (event) => {
    setIncludeCountdown(event.target.checked);
  };

  const handlePreMatchTimeChange = (event) => {
    setPreMatchTime(event.target.value);
  };

  const handlePracticeEndsChange = (event) => {
    setPracticeEnds(event.target.value);
  };

  return (
    <Card className="p-1">
      <CardBody className='border border-gray-300 shadow-md'>
        <CardTitle className="text-xl font-bold pb-3 pl-2">Game Settings</CardTitle>
        
        <Row className="">
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-2/3 text-center'>Include pre-match countdown</CardText>
            <div className='w-1/3 text-center'>
              <input 
                type="checkbox"
                className="text-white bg-zinc-700 font-bold text-center w-1/4"
                checked={includeCountdown}
                onChange={handleIncludeCountdownChange}
                style={{ color: 'gray' }}
              />
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-2/3 text-center'>Pre-Match time(seconds)</CardText>
            <div className='w-1/3 text-center'>
              <input 
                type="number" 
                className="text-white bg-zinc-700 font-bold text-center w-1/4"
                value={preMatchTime}
                onChange={handlePreMatchTimeChange}
                style={{ color: 'gray' }}
                min={0}
                max={500}
              />
            </div>
          </Col>
        </Row>

        <Row className="">
          <Col xs="6" className="flex border-t border-gray-300 items-center py-2">
            <CardText className='w-2/3 text-center'>Number of Practice Ends (0 - none)</CardText>
            <div className='w-1/3 text-center'>
              <input 
                type="number" 
                className="text-gray-300 bg-zinc-700 font-bold text-center w-1/4"
                value={practiceEnds}
                onChange={handlePracticeEndsChange}
                style={{ color: 'gray' }}
                min={0}
                max={10}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default GameControls;