import React, {useState} from 'react';
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
  const[visualiserType, setVisualiserType] = useState("Waveform")
  // does what it says on the tin
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

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

  // function onPauseTrack() {
  //   console.log("onPauseTrack hit")
  //   resetAnalyser();
  // }

  
  // check if analyserState mode has been set to microphone - if so stop microphone
  function toggleMicrophone() {
    if (analyserState.mode  === "microphone"){
      stopMicrophone();
    } else {
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

  // toggles the visualiserType state between Waveform and Frequency
  const toggleVisualiser = () => {
    setVisualiserType(visualiserType === "Waveform" ? "Frequency" : "Waveform");
  }

  // toggles the visualiser background state between Black and Clear
  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear")
  }
  
  return (
    <div className="App">
      
      <div className="controls">
        
        {/* if analyserState mode is set to microphone, display Stop microphone, if it is not, display get microphone */}
        <button onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        {/* if visualiserType is set to Waveform, display Frequency, if it is not, display Waveform */}
        <button onClick={toggleVisualiser}>
          {visualiserType === "Waveform" ? "Frequency" : "Waveform"}
        </button>

        {/* if background is set to Clear, display Black, if it is not, display Clear */}
        <button onClick={toggleBackground}>
          {background === "Clear" ? "Black" : "Clear"}
        </button>

      </div>

      {/* if there is an input in analyserState, render the AudioAnalyser */}
      <div className="visualiser-container">
        {analyserState.input &&
        
        <AudioAnalyser 
          input={analyserState.input} 
          mode={analyserState.mode} 
          visualiserType={visualiserType}
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
