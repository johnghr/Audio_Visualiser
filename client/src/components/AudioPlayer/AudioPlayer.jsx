import React, { useState } from "react";

const AudioPlayerTwo = ({
    audioContext, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    onChangeTrack,
    trackUploads,
    setAnalyserState
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

    // when the track is played, set the analyser input to be the playing track
    const handlePlay = (event) => {
        console.log(event.target,"event target")
        onChangeTrack(event.target)
    }

    const handlePause = (event) => {
        setAnalyserState({
            input: null,
            mode: "off"
        })
    }

    return (
        
        <div className="audio-player-container">
            {/* src is the base url plus the trackUpload name stored at the current trackIndex */}
            <button onClick={toPreviousTrack}><svg className="control-icon"><use href="#prev-icon"/></svg></button>
            <audio className="audio-player" crossOrigin="anonymous" onPlay={handlePlay} onPause={handlePause} controls src={`http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`}></audio>
            <button onClick={toNextTrack}><svg className="control-icon"><use href="#next-icon"/></svg></button>
        </div>
        
    )

}

export default AudioPlayerTwo;