import React, {useState, useEffect, useRef} from 'react';
import AudioControls from './AudioControls.jsx';

const AudioPlayer = ({ tracks, toggleTrack }) => {

    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const {title, audioSrc} = tracks[trackIndex];
    
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const toPrevTrack = () => {
        // if trackIndex minus 1 is less than zero, set track index to the last track
        if (trackIndex - 1 < 0){
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }
    
    const toNextTrack = () => {
        // if trackIndex is less than tracks length go to next track, otherwise go to first track
        if (trackIndex < tracks.length -1){
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }
    
    useEffect(() => {
        // when isPlaying state changes, call play() or stop() according to isPlaying value
        if(isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current)
            audioRef.current.pause();
        }
    },[isPlaying])

    useEffect(() => {

        // pause and clean up on unmount / clear any setInterval timers

        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }

    }, [])

    useEffect(() => {
        
        // runs when trackIndex is updated, allowing current track to be paused while
        // updating the value of audioRef to new source, resetting the progress state and 
        // setting new track to play

        audioRef.current.pause()

        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer()
        } else {
            isReady.current = true;
        }
    }, [trackIndex])

    const startTimer = () => {
        // clear any timers already running
        clearInterval(intervalRef.current);

        // check track every second, if so go to next track, otherwise update track progress
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000])
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
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                />
            </div>
        </div>

    ) 
            

}

export default AudioPlayer;