import React, {useState, useEffect, useRef} from 'react';


const AudioPlayer = ({ tracks, toggleTrack }) => {

    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const {title, audioSrc} = tracks[trackIndex]
    
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

     

    const toPreviousTrack = () => {
        console.log('TODO go to previous track')
    }

    const toNextTrack = () => {
        console.group('TODO go to next track')
    }

    const handlePlay = (event) => {
            const eventTarget = event.target;
            console.log("eventTarget", event)
            toggleTrack(eventTarget);
    }    

    return(
        
        <div className="audio-player">
            <div className="track-info">
                <h3 className="title">{title}</h3>
            </div>
        </div>

    ) 
            

}

export default AudioPlayer;