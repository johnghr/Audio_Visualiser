import React from 'react';
import song from './song.mp3'

const AudioPlayer = ({toggleTrack}) => {

    const handlePlay = (event) => {
        const eventTarget = event.target;
        console.log("eventTarget",eventTarget)
        toggleTrack(eventTarget);
    }    

    return <audio onPlaying={handlePlay} controls src={song}/>

}

export default AudioPlayer;