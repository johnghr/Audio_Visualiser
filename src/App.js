import React, {useState, useRef} from 'react';
import AudioAnalyser from './components/AudioAnalyser';
import './App.css';

function App() {

  const[source, setSource] = useState(null);
  const[audio, setAudio] = useState(null);
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)())
  const audioContext = audioContextRef.current;

  async function getMicrophone() {
    let audio = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: false
      }
    )
    setAudio(audio);
    setSource(audioContext.createMediaStreamSource(audio));
  }

  function stopMicrophone() {
    audio.getTracks().forEach(track => track.stop());
    setAudio(null);
  }

  function toggleMicrophone() {
    if(audio){
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }

  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {audio ? 'Stop microphone' : 'Get microphone'}
        </button>

      </div>
      {source ? <AudioAnalyser source={source} audioContext={audioContext} /> : ""}
    </div>
  );
}

export default App;
