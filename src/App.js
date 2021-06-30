import React, {useState} from 'react';
import MicrophoneAnalyser from './components/Analysers/MicrophoneAnalyser';
import TrackAnalyser from './components/Analysers/TrackAnalyser';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {

  const[microphoneInput, setMicrophoneInput] = useState(null);
  const[trackInput, setTrackInput] = useState(null);
  

  async function getMicrophone() {
    let micAudio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    setMicrophoneInput(micAudio);
  }

  function getTrack(event) {
    if(trackInput){
      stopTrack();
    } else {
      setTrackInput(event.target);
    }
  }

  function stopMicrophone() {
    microphoneInput.getTracks().forEach(track => track.stop());
    setMicrophoneInput(null);
  }

  function stopTrack() {
    trackInput.getTracks().forEach(track => track.stop());
    setTrackInput(null);
  }

  function toggleMicrophone() {
    if (microphoneInput){
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }

  function toggleTrack() {
    if (trackInput){
      stopTrack();
    } else {
      getTrack();
    }
  }
  

  

  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {microphoneInput ? 'Stop microphone' : 'Get microphone'}
        </button>

      </div>
      {microphoneInput ? <MicrophoneAnalyser microphoneInput={microphoneInput} /> : ""}
      {trackInput ? <TrackAnalyser trackInput={trackInput} /> : ""}
      <AudioPlayer onPlay={toggleTrack}></AudioPlayer>
    </div>
  );
}

export default App;
