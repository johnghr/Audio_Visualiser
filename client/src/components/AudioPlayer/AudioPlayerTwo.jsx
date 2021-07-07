import React, { useState } from "react";

const AudioPlayerTwo = ({
    audioContext, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    onChangeTrack,
    trackUploads
}) => {

    const toPreviousTrack = () => {
        // if trackIndex minus 1 is less than zero, set track index to the last track
        if (selectedTrackIndex - 1 < 0){
            setSelectedTrackIndex(trackUploads.length - 1);
        } else {
            setSelectedTrackIndex(selectedTrackIndex - 1);
        }
    }

    // NEXT  - handles next track click
    const toNextTrack = () => {
        // if trackIndex is less than tracks length go to next track, otherwise go to first track
        if (selectedTrackIndex < trackUploads.length -1){
            setSelectedTrackIndex(selectedTrackIndex + 1);
        } else {
            setSelectedTrackIndex(0);
        }
    }

    const onPlayPause = () => {
        console.log("no the now")
    }

    const handlePlay = (event) => {
        onChangeTrack(event.target)
    }
    // onChangeTrack()

    return (
        
        <div>
            <audio className="audio-player" crossorigin="anonymous" onPlay={handlePlay} controls src={`http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`}></audio>
            <button onClick={toPreviousTrack}>Prev</button>
            <button onClick={onPlayPause}>Play</button>
            <button onClick={toNextTrack}>Next</button>
        </div>
        
    )

}

export default AudioPlayerTwo;