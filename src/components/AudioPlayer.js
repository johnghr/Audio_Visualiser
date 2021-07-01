import React from 'react';
import song from './song.mp3'
import song_8 from './song_8.mp3'

const AudioPlayer = ({toggleTrack}) => {

    const handlePlay = (event) => {
        const eventTarget = event.target;
        console.log("eventTarget", event)
        toggleTrack(eventTarget);
    }    

    const trackList = [song, song_8]

    const handleTrackChange = () => (
        
    ) 

    return(
        <div>
            <audio onPlay={handlePlay} controls >
                <source src={song_8}/>
                <source src={song}/>
            </audio>
                    
                   
                        



        </div>
        


    ) 
            

}

export default AudioPlayer;