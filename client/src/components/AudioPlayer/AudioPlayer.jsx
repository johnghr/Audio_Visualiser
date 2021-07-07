import React, { useState } from "react";

const AudioPlayerTwo = ({
    audioContext, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    onChangeTrack,
    trackUploads
}) => {

    // handles previous track click
    const toPreviousTrack = () => {
        // if trackIndex minus 1 is less than zero, set track index to the last track
        if (selectedTrackIndex - 1 < 0){
            setSelectedTrackIndex(trackUploads.length - 1);
        } else {
            // otherwise, set track to previous index
            setSelectedTrackIndex(selectedTrackIndex - 1);
        }
    }

    // handles next track click
    const toNextTrack = () => {
        // if selectedTrackIndex is less than tracks length go to next track 
        if (selectedTrackIndex < trackUploads.length -1){
            setSelectedTrackIndex(selectedTrackIndex + 1);
        } else {
            // otherwise go to first track
            setSelectedTrackIndex(0);
        }
    }

    // const onPlayPause = () => {
    //     console.log("no the now")
    // }

    // when the track is played, set the analyser input to be the playing track
    const handlePlay = (event) => {
        onChangeTrack(event.target)
    }

    return (
        
        <div>
            {/* src is the base url plus the trackUpload name stored at the current trackIndex */}
            <audio className="audio-player" crossorigin="anonymous" onPlay={handlePlay} controls src={`http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`}></audio>
            <button onClick={toPreviousTrack}>Prev</button>
            {/* <button onClick={onPlayPause}>Play</button> */}
            <button onClick={toNextTrack}>Next</button>
        </div>
        
    )

}

export default AudioPlayerTwo;