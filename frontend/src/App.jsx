import { useState } from 'react'
import { Button } from 'reactstrap'
import './App.css'
import Game from './components/Game'
import SlideBar from './components/SlideBar'
import Timings from './components/Controls/Timings'
import AuthSection from './components/Auth/AuthSection'
import AboutSection from './components/Auth/About'
import ScoreBoard from './components/Controls/ScoreBoard'
import Scenarios from './components/Controls/Scenarios'
import GameControls from './components/Controls/GameControls'

function App() {

  //Timeset for the countdown timer
  //Can be modified by the user via the SlideBar
  const [timeSet, setTimeSet] = useState([50, 30, 10]);
  const [offTimeSet, setOffTimeSet] = useState([0, 30, 10]);

  //Game Controls settings
  const [gameSettings, setGameSettings] = useState({
    includeCountdown: false,
    preMatchTime: 60,
    practiceEnds: 0,
  });

  const handleGameSettingsChange = (newSettings) => {
    setGameSettings(newSettings);
  };

  //Scenarios
  const [selectedScenario, setSelectedScenario] = useState('scenario1');

  const handleScenarioChange = (newScenario) => {
    setSelectedScenario(newScenario);
  };


  //Open state for the slidebars 
  //Only want one open at a time so we will have to change state if both are open
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);

  //State for login
  const [loggedInUser, setLoggedInUser] = useState(null);

  // State to toggle between Controls and ScoreBoard
  const [isControls, setIsControls] = useState(true);

  //This will keep track of the game state
  // 0 = Not started
  // 1 = Pre-Match countdown
  // 2 = Practice End
  // 3 = Shooting
  // 4 = Match Finished
  const [gameState, setGameState] = useState(0);

  const setIsOpen = (side) => {
    if (side === 'left') {
      if(isRightOpen) {
        setIsRightOpen(false);
      }
      setIsLeftOpen(!isLeftOpen);
    } else {
      if(isLeftOpen) {
        setIsLeftOpen(false);
      }
      setIsRightOpen(!isRightOpen);
    }
  };



  return (
    <div className='flex flex-row items-center flex-nowrap content-between'>
      <SlideBar isOpen={isLeftOpen} setIsOpen={setIsOpen} side='left'>
        <div className="flex flex-row mb-2">
          <Button
            className={`py-2 px-3 ${isControls ? 'bg-zinc-700 text-white' : 'bg-gray-300 text-black'} rounded-l`}
            onClick={() => setIsControls(true)}
          >
            Controls
          </Button>
          {loggedInUser && (
            <Button
              className={`py-2 px-3 ${!isControls ? 'bg-zinc-700 text-white' : 'bg-gray-300 text-black'} rounded-r`}
              onClick={() => setIsControls(false)}
            >
              ScoreBoard
            </Button>
          )}
        </div>
        {isControls ? (
          <>
          <Scenarios onScenarioChange={handleScenarioChange} />
          <GameControls onSettingsChange={handleGameSettingsChange} />
          <Timings setTimeSet={setTimeSet} setOffTimeSet={setOffTimeSet} />
          
          </>
        ) : (
          <ScoreBoard />
        )}
      </SlideBar>
      <div className='flex flex-col items-center justify-start h-screen flex-1 grow'> 
        <h1 style={{fontSize:'min(10vw, 10vh)'}} className=''>Archery Clock</h1>
        <Game timeSet={timeSet} offTimeSet={offTimeSet} gameState={gameState} selectedScenario={selectedScenario} gameSettings={gameSettings} setGameState={setGameState} />
      </div>
      <SlideBar isOpen={isRightOpen} setIsOpen={setIsOpen} side='right'>
        <h2 className='text-lg font-bold'>Extra Features</h2>
        <AuthSection loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <AboutSection />
      </SlideBar>
    </div>
  )
}

export default App
