import React, {useEffect, useState} from 'react';
import AudioAnalyser from '../components/Analyser/AudioAnalyser';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import '../App.css';

const MediaPlayer = ({
  selectedTrackIndex,
  setSelectedTrackIndex, 
  audioContext,
  trackUploads,
  setTrackUploads
}) => {

  // an initial analyserState for resetting analyser
  const initialAnalyserState = {input: null, mode: 'off'};
  // state to be passed down for analyser: track or mic input and mode:'track', 'mic' and off
  const[analyserState, setAnalyserState] = useState(initialAnalyserState);
  // background state to be passed down to visualiser canvases to set background
  const[background, setBackground] = useState("Clear")
  // type state to be passed down to visualiser canvases to determine which visualiser is rendered
  const visualisers = ["Waveform", "Frequency", "Experimental"]
  const [visualiserIndex, setVisualiserIndex] = useState(0)
  const [currentVisualiser, setCurrentVisualiser] = useState(visualisers[0])
  const [displayedVisualiserIndex, setDisplayedVisualiserIndex] = useState(1)
  const [displayedVisualiser, setDisplayedVisualiser] = useState(visualisers[displayedVisualiserIndex])
  // does what it says on the tin
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);


    console.log("initial currentVisualiser",currentVisualiser)



    console.log("initial displayedVisualiser", displayedVisualiser)
 

  // fetch permission to use microphone and set the feed as the input for the analyser
  async function getMicrophone() {
    let micAudio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    setAnalyserState({
      input: micAudio,
      mode: "microphone"
    });
  }

  // loop through all mic tracks and stop them, reset the analyser
  function stopMicrophone() {
    analyserState.input.getTracks().forEach(track => track.stop());
    resetAnalyser();
  }
  
  // check if analyserState mode has been set to microphone - if so stop microphone
  function toggleMicrophone() {
    if (analyserState.mode  === "microphone"){
      stopMicrophone();
    } else {
      // check if the last media type was track, if so pause audio player and reset analyser
      if(analyserState.mode === "track"){
        analyserState.input.pause()
        resetAnalyser();
      }
      // otherwise, get permission to use microphone
      getMicrophone();
    }
  }

  // when track is played in AudioPlayer, onChangeTrack sets the audio tag and its src
  // as the input of setAnalyserState, while setting mode to track
  const onChangeTrack = (track) => {
    setAnalyserState({
      input: track,
      mode: "track"
    })
  }

  // toggles the visualiserType state between Waveform, Frequency and experimental
  const toggleVisualiser = () => {
    
    if (visualiserIndex < visualisers.length -1){
        setVisualiserIndex(visualiserIndex + 1)
        setCurrentVisualiser(visualisers[visualiserIndex])
        console.log("currentVisualiser",currentVisualiser)
    } else {
        setVisualiserIndex(0);
        setCurrentVisualiser(visualisers[visualiserIndex])
        console.log("visualiser reset", currentVisualiser)        
    }

    if (displayedVisualiserIndex < 2) {
        setDisplayedVisualiserIndex(displayedVisualiserIndex + 1)
        setDisplayedVisualiser(visualisers[displayedVisualiserIndex])
        console.log("displayed visualiser", displayedVisualiser)
    } else {
        setDisplayedVisualiserIndex(0)
        setDisplayedVisualiser(visualisers[displayedVisualiserIndex])
        console.log("displayed visualiser reset",displayedVisualiser)
    } 

  }

  // toggles the visualiser background state between Black and Clear
  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear")
  }
  
  return (
    <div className="App">
      
      <div className="toggle-controls">
        
        {/* if analyserState mode is set to microphone, display Stop microphone, if it is not, display get microphone */}
        <button id="mic-toggle" onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        {/* if visualiserType is set to Waveform, display Frequency, if it is not, display Waveform */}
        <button id="visualiser-toggle" onClick={toggleVisualiser}>
          {displayedVisualiser}
        </button>

        {/* if background is set to Clear, display Black, if it is not, display Clear */}
        <button id="background-toggle" onClick={toggleBackground}>
          {background === "Clear" ? "Black" : "Clear"}
        </button>

      </div>

      {/* if there is an input in analyserState, render the AudioAnalyser */}
      <div className="visualiser-container">
        {analyserState.input &&
        
        <AudioAnalyser 
          input={analyserState.input} 
          mode={analyserState.mode} 
          currentVisualiser={currentVisualiser}
          background={background}
          audioContext={audioContext}
        />}
      </div>
      
      <AudioPlayer 
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex}
        trackUploads={trackUploads} 
        setTrackUploads={setTrackUploads}
        onChangeTrack={onChangeTrack}
        setAnalyserState={setAnalyserState}
      />
    
    </div>
  );
}

export default MediaPlayer;
