import {React, useState} from 'react'
import { Container, Row, Col, Button} from 'reactstrap'
import Timings from './Timings'
import './SlideBar.css'

function SlideBar({setTimeSet}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`flex h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-1/4' : 'w-0'}`}>
            <div className={`flex w-full`}>
                <div className={`h-full w-full overflow-y-scroll no-scrollbar ${isOpen ? 'p-2' : 'p-0'}`}>
                    {isOpen && <h2 className='text-lg font-bold'>Controls</h2>}
                    <Timings setTimeSet = {setTimeSet} />
                </div>
            </div>
            <Button onClick={() => setIsOpen(!isOpen)} className='flex text-2xl font-extrabold bg-slate-500'>{isOpen ? '◀' : '▶'}</Button>
        </div>
    )
}

export default SlideBar
