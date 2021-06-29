import React, {useState, useRef} from 'react';
import AudioAnalyser from './components/AudioAnalyser'
import AudioPlayer from './components/AudioPlayer'
import './App.css';

function App() {

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
    const streamSource = audioContext.createMediaStreamSource(micAudio);
    setAudioInput(streamSource);
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
      const elementSource = audioContext.createMediaElementSource(event.target)
      setAudioInput(elementSource);
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
