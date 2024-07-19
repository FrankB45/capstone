import { useState } from 'react'
import './App.css'
import CountDown from './CountDown'
import Sidebar from './SideBar'
import SlideBar from './SlideBar'

function App() {

  //Timeset for the countdown timer
  //Can be modified by the user via the SlideBar
  const [timeSet, setTimeSet] = useState([60, 30, 10, 90]);

  return (
    <div className='flex flex-row items-center flex-nowrap content-between'>
      <SlideBar setTimeSet = {setTimeSet} />
      <div className='flex flex-col items-center flex-1 grow'> 
        <h1 style={{fontSize:'min(10vw, 10vh)'}} className=''>Arch Shot</h1>
        <CountDown timeSet={timeSet} />
      </div>
    </div>
  )
}

export default App
