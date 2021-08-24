import React, { useState} from 'react';
import AudioAnalyser from '../components/Analyser/AudioAnalyser';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import '../App.css';

const MediaPlayer = ({
  currentVisualiser,
  background,
  selectedTrackIndex,
  setSelectedTrackIndex, 
  audioContext,
  trackUploads,
  setTrackUploads,
  setAnalyserState,
  analyserState
}) => {

  console.log(currentVisualiser)

  const onChangeTrack = (track) => {
      setAnalyserState({
        input: track,
        mode: "track"
      })
  }

  
  return (
      <>
        
        {analyserState.input &&
        
        <AudioAnalyser 
          input={analyserState.input} 
          mode={analyserState.mode} 
          currentVisualiser={currentVisualiser}
          background={background}
          audioContext={audioContext}
        />}
    
        <AudioPlayer 
          selectedTrackIndex={selectedTrackIndex}
          setSelectedTrackIndex={setSelectedTrackIndex}
          trackUploads={trackUploads} 
          setTrackUploads={setTrackUploads}
          onChangeTrack={onChangeTrack}
          setAnalyserState={setAnalyserState}
        />
      </>
  )
}

export default MediaPlayer;
