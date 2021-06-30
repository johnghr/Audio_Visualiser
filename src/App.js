import React, {useState} from 'react';
import AudioAnalyser from './components/MicAudioAnalyser'
import AudioPlayer from './components/AudioPlayer'
import './App.css';

function App() {

  const[audioInput, setAudioInput] = useState(null);
  // const[audioInput, setAudioInput] = useState(null);
  

  async function getMicrophone() {
    let micAudio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    // setAudioInput(micAudio);
    setAudioInput(micAudio);
  }

  function stopTracks() {
    audioInput.getTracks().forEach(track => track.stop());
    setAudioInput(null);
  }

  function toggleMicrophone() {
    if(audioInput){
      stopTracks();
    } else {
      getMicrophone();
    }
  }

  function getAudioTrack(event) {
    if(audioInput){
      stopTracks();
    } else {
      setAudioInput(event.target);
    }
  }

  

  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {audioInput ? 'Stop microphone' : 'Get microphone'}
        </button>

      </div>
      {audioInput ? <AudioAnalyser audioInput={audioInput} /> : ""}
      <AudioPlayer onPlay={getAudioTrack}></AudioPlayer>
    </div>
  );
}

export default App;
