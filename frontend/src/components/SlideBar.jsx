import {React, useState} from 'react'
import { Container, Row, Col, Button} from 'reactstrap'
import Timings from './Controls/Timings'
import './SlideBar.css'

function SlideBar({ isOpen, setIsOpen, side = 'left', children }) {
    //const [isOpen, setIsOpen] = useState(initiallyOpen);
    //Converts side to boolean
    const isLeft = side === 'left';

    return (
        <div className={`flex h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-1/4' : 'w-0'} ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`flex w-full`}>
                <div className={`h-full w-full overflow-y-scroll no-scrollbar ${isOpen ? 'p-2' : 'p-0'}`}>
                    {isOpen && <h2 className='text-lg font-bold'>Controls</h2>}
                    {children}
                </div>
            </div>
            <Button onClick={() => setIsOpen(side)} className='flex text-2xl font-extrabold bg-zinc-700 z-50'>{isOpen 
    ? (isLeft ? '◀' : '▶') 
    : (isLeft ? '▶' : '◀')
}</Button>
        </div>
    )
}

export default SlideBar
