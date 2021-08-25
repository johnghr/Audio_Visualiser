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

         {analyserState.input === null ? 
         
         <div className="canvas-container"></div> :
         
         <AudioAnalyser 
          input={analyserState.input} 
          mode={analyserState.mode} 
          currentVisualiser={currentVisualiser}
          background={background}
          audioContext={audioContext}
        />}      
        
        <div className="record-player">
          <div className="record-player-top">
              <div className="record-disc">
                  <div className="outer-disc">
                    <div className="inner-disc"></div>
                  </div>
              </div>
          </div>
          <div className="record-player-bottom">
            <AudioPlayer 
              selectedTrackIndex={selectedTrackIndex}
              setSelectedTrackIndex={setSelectedTrackIndex}
              trackUploads={trackUploads} 
              setTrackUploads={setTrackUploads}
              onChangeTrack={onChangeTrack}
              setAnalyserState={setAnalyserState}
            />
          </div>
        </div>
        
      </>
  )
}

export default MediaPlayer;
