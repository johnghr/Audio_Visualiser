import React, {useState, useRef} from 'react';
import AudioAnalyser from './components/AudioAnalyser';
import AudioPlayer from './components/AudioPlayer'
import './App.css';

function App() {

  const[audioContextSource, setAudioContextSource] = useState(null);
  const[audioInput, setAudioInput] = useState(null);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)())
  const audioContext = audioContextRef.current;

  async function getMicrophone() {
    let micAudio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    setAudioInput(micAudio);
    setAudioContextSource(audioContext.createMediaStreamSource(micAudio));
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
      {audioContextSource ? <AudioAnalyser audioContextSource={audioContextSource} audioContext={audioContext} /> : ""}
      <AudioPlayer></AudioPlayer>
    </div>
  );
}

export default App;
