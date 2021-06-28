import React from 'react';
import song from './song.mp3'

const AudioPlayer = () => {

    return <audio controls src={song}/>

}

export default AudioPlayer;