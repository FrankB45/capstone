import { React, useState, useEffect } from 'react'

function OrientationCheck({ children }) {

    const [isLandscape, setIsLandscape] = useState(window.screen.orientation.type.startsWith('landscape'));

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsLandscape(window.screen.orientation.type.startsWith('landscape'));
        };

        window.screen.orientation.addEventListener('change', handleOrientationChange);

        // Clean up event listener on component unmount
        return () => {
            window.screen.orientation.removeEventListener('change', handleOrientationChange);
        };

    },[]);


  return (
    <div>
      { isLandscape ? children : (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="text-center text-white p-6 border-2 border-white rounded-lg bg-black bg-opacity-60">
          Please rotate your device to landscape mode to continue.
        </div>
      </div>
    ) }
    </div>
  )
}

export default OrientationCheck
