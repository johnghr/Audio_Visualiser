import React from 'react';
import song from './song.mp3'

const AudioPlayer = ({toggleTrack}) => {

    const handlePlay = (event) => {
        const eventTarget = event.target;
        console.log("eventTarget", event)
        toggleTrack(eventTarget);
    }    

    return <audio onPlay={handlePlay} controls src={song}/>

}

export default AudioPlayer;