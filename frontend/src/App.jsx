import { useState } from 'react'
import { Button } from 'reactstrap'
import './App.css'
import Game from './components/Game'
import SlideBar from './components/SlideBar'
import Timings from './components/Controls/Timings'
import AuthSection from './components/Auth/AuthSection'
import AboutSection from './components/Auth/About'
import ScoreBoard from './components/Controls/ScoreBoard'

function App() {

  //Timeset for the countdown timer
  //Can be modified by the user via the SlideBar
  const [timeSet, setTimeSet] = useState([50, 30, 10]);
  const [offTimeSet, setOffTimeSet] = useState([0, 30, 10]);

  //Open state for the slidebars 
  //Only want one open at a time so we will have to change state if both are open
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);

  //State for login
  const [loggedInUser, setLoggedInUser] = useState(null);

  // State to toggle between Controls and ScoreBoard
  const [isControls, setIsControls] = useState(true);

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
          <Timings setTimeSet={setTimeSet} setOffTimeSet={setOffTimeSet} />
        ) : (
          <ScoreBoard />
        )}
      </SlideBar>
      <div className='flex flex-col items-center justify-start h-screen flex-1 grow'> 
        <h1 style={{fontSize:'min(10vw, 10vh)'}} className=''>Archery Clock</h1>
        <Game timeSet={timeSet} offTimeSet={offTimeSet} />
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
