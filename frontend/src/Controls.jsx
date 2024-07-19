import React from 'react'

function Controls({handleStart, handlePause, handleStop, handleReverse}) {
    const buttons = [
        { onClick: handleStart, color: '#4CAF50', path: 'M8 5v14l11-7z' },
        { onClick: handlePause, color: '#FFC107', path: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' },
        { onClick: handleReverse, color: '#D32F2F', path: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z' },
        { onClick: handleStop, color: '#2196F3', path: 'M20 12l-6 6V6l6 6zm-8 0l-6 6V6l6 6z' }
      ];
  return (
    <div className='w-1/2 content-end'>
        <div className='flex gap-2 justify-center items-center'>
        {buttons.map((btn, index) => (
          <button 
            key={index} 
            onClick={btn.onClick} 
            className="bg-white/10 border-none rounded-sm p-1.5 cursor-pointer w-[min(10vw,10vh)] h-[min(10vw,10vh)] flex justify-center items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={btn.color} 
              width="100%" 
              height="100%"
            >
              <path d={btn.path} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Controls
