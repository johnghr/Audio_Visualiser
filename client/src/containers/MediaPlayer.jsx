import React, { useState} from 'react';
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

  const initialAnalyserState = {input: null, mode: 'off'};
  const [analyserState, setAnalyserState] = useState(initialAnalyserState);
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

  const [background, setBackground] = useState("Clear");
  const visualisers = ["Waveform", "Frequency", "Experimental"];
  const [visualiserIndex, setVisualiserIndex] = useState(0);
  // const [currentVisualiser, setCurrentVisualiser] = useState(visualisers[visualiserIndex]);
  
  let currentVisualiser = visualisers[visualiserIndex]

  console.log(currentVisualiser)

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

  function stopMicrophone() {
    analyserState.input.getTracks().forEach(track => track.stop());
    resetAnalyser();
  }
  
  function toggleMicrophone() {
    if (analyserState.mode  === "microphone"){
      stopMicrophone();
    } else {
      if(analyserState.mode === "track"){
        analyserState.input.pause()
        resetAnalyser();
      }
      getMicrophone();
    }
  }

  const onChangeTrack = (track) => {
      setAnalyserState({
        input: track,
        mode: "track"
      })
  }

  const toggleVisualiser = () => {
      if (visualiserIndex < visualisers.length -1){
          setVisualiserIndex(visualiserIndex + 1);
      } else {
          setVisualiserIndex(0);
      }

  }

  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear")
  }
  
  return (
    <div className="App">
      
      <div className="toggle-controls">
      
        <button id="mic-toggle" onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        <button id="visualiser-toggle" onClick={toggleVisualiser}>
          {visualisers[visualiserIndex]}
        </button>

        <button id="background-toggle" onClick={toggleBackground}>
          {background === "Clear" ? "Black" : "Clear"}
        </button>

      </div>

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
  )
}

export default MediaPlayer;
