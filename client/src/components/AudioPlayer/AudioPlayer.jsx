import React, {useState, useEffect, useRef} from 'react';
import AudioControls from './AudioControls.jsx';

const AudioPlayer = ({ tracks, onChangeTrack, onPauseTrack }) => {

    // index of track being played
    const [trackIndex, setTrackIndex] = useState(0);
    // current progress of track being played
    const [trackProgress, setTrackProgress] = useState(0);
    // wether or not track is being played
    const [isPlaying, setIsPlaying] = useState(false);
    // current title and source equal the current track index
    const {title, audioSrc} = tracks[trackIndex];
    
    // stores Audio element plus audio source in a ref
    const audioRef = useRef(new Audio(audioSrc));
    
    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;
    // const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    // const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

    // PREV -  handles previous track click
    const toPrevTrack = () => {
        // if trackIndex minus 1 is less than zero, set track index to the last track
        if (trackIndex - 1 < 0){
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }
    
    // NEXT - handles next track click
    const toNextTrack = () => {
        // if trackIndex is less than tracks length go to next track, otherwise go to first track
        if (trackIndex < tracks.length -1){
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }
    
    // PLAY
    useEffect(() => {
        // when isPlaying changes:
        // if isPlaying is true, play the track in audio tag 
        if(isPlaying) {
            // update track for analyser
            
            audioRef.current.play();
            // console.log('setting track')
            onChangeTrack(audioRef.current)
            startTimer();
        } else {
            // otherwise clear the intervalRef and pause the track in audio tag
            console.log('pause track')
            clearInterval(intervalRef.current)
            audioRef.current.pause();
            // onPauseTrack();
        }
    },[isPlaying])

    useEffect(() => {
        // pause and clean up on unmount / clear any setInterval timers

        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }

    }, [])

    // NEXT track
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

        // check track every second, if ended reset the player, otherwise update track progress
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                setTrackProgress(0);
                setIsPlaying(false);
                console.log("player reset:", audioRef.current)
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000])
    }


    const onScrub = (value) => {
        // clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // if isPlayings value is false then set it to true
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
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
                    // onPlay={toggleTrack}
                />
                <input 
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    // style={{ background: trackStyling}}
                />
            </div>
        </div>

    ) 
            

}

export default AudioPlayer;