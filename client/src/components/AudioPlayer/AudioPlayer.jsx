import React from "react";

const AudioPlayer = ({
    selectedTrackIndex,
    setSelectedTrackIndex,
    onChangeTrack,
    trackUploads,
    setAnalyserState
}) => {

    const toPreviousTrack = () => {
        if (selectedTrackIndex - 1 < 0){
            setSelectedTrackIndex(trackUploads.length - 1);
        } else {
            setSelectedTrackIndex(selectedTrackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (selectedTrackIndex < trackUploads.length -1){
            setSelectedTrackIndex(selectedTrackIndex + 1);
        } else {
            setSelectedTrackIndex(0);
        }
    }

    const handlePlay = (event) => {
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
            <button onClick={toPreviousTrack}><svg className="control-icon"><use href="#prev-icon"/></svg></button>
            <audio className="audio-player" crossOrigin="anonymous" onPlay={handlePlay} onPause={handlePause} controls src={`http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`}></audio>
            <button onClick={toNextTrack}><svg className="control-icon"><use href="#next-icon"/></svg></button>
        </div>
    )

}

export default AudioPlayer;