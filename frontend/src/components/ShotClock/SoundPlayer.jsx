import { React, useRef, forwardRef, useImperativeHandle } from 'react';
import { Howl } from 'howler';

const SoundPlayer = forwardRef((props, ref) => {
    const sound1 = useRef(new Howl({ src: ['../assets/single_beep.mp3'] }));
    const sound2 = useRef(new Howl({ src: ['../assets/higher_beep.mp3'] }));

    useImperativeHandle(ref, () => ({
        play: (soundNumber) => {
            console.log("Playing sound number: ", soundNumber);
            if (soundNumber === 1) {
                sound1.current.play();
            } else if (soundNumber === 2) {
                sound2.current.play();
            }
        }
    }));
    return <div className='sound-player'></div>;
});

export default SoundPlayer
