import React, {useState} from 'react';
import AudioAnalyser from './components/AudioAnalyser'
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

  function stopMicrophone() {
    audioInput.getTracks().forEach(track => track.stop());
    setAudioInput(null);
  }

  function toggleMicrophone() {
    if(audioInput){
      stopMicrophone();
    } else {
      getMicrophone();
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
      <AudioPlayer></AudioPlayer>
    </div>
  );
}

export default App;
