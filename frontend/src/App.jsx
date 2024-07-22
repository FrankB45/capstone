import { useState } from 'react'
import './App.css'
import CountDown from './components/ShotClock/CountDown'
import SlideBar from './components/SlideBar'
import Timings from './components/Controls/Timings'
import AuthSection from './components/Auth/AuthSection'
import AboutSection from './components/Auth/About'

function App() {

  //Timeset for the countdown timer
  //Can be modified by the user via the SlideBar
  const [timeSet, setTimeSet] = useState([50, 30, 10]);
  const [offTimeSet, setOffTimeSet] = useState([0, 30, 10]);

  //Open state for the slidebars 
  //Only want one open at a time so we will have to change state if both are open
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);

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
        <h2 className='text-lg font-bold'>Controls</h2>
        <Timings setTimeSet = {setTimeSet} />
      </SlideBar>
      <div className='flex flex-col items-center flex-1 grow'> 
        <h1 style={{fontSize:'min(10vw, 10vh)'}} className=''>Arch Shot</h1>
        <CountDown timeSet={timeSet} />
      </div>
      <SlideBar isOpen={isRightOpen} setIsOpen={setIsOpen} side='right'>
        <h2 className='text-lg font-bold'>Extra Features</h2>
        <AuthSection />
        <AboutSection />
      </SlideBar>
    </div>
  )
}

export default App
