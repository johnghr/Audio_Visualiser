import React, {useState, useRef} from 'react';
import MicrophoneAnalyser from './components/Analysers/MicrophoneAnalyser';
import TrackAnalyser from './components/Analysers/TrackAnalyser';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {

  const[microphoneInput, setMicrophoneInput] = useState(null);
  const[trackInput, setTrackInput] = useState(null);
  const audioContextRef = useRef(new window.AudioContext() || window.webkitAudioContext)();
  const audioContext = audioContextRef.current;
  console.log(audioContext)

  async function getMicrophone() {
    let micAudio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    console.log("micAudio:", micAudio)
    setMicrophoneInput(micAudio);
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

  function toggleTrack(track) {
    if (trackInput){
      stopTrack();
    } else {
      console.log(track) 
      setTrackInput(track);
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
      <AudioPlayer toggleTrack={toggleTrack}></AudioPlayer>
    </div>
  );
}

export default App;
