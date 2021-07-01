import React, {useState} from 'react';
import AudioAnalyser from './components/Analysers/AudioAnalyser';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

//your da sells the avon
function App() {
  //mode can be 'off', 'track' or 'microphone'
  const initialAnalyserState = {input: null, mode: 'off'};
  const[analyserState, setAnalyserState] = useState(initialAnalyserState);

  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

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

  function stopTrack() {
    console.log("input",analyserState.input)
    analyserState.input.getTracks().forEach(track => track.stop());
    resetAnalyser();
  }

  function toggleMicrophone() {
    if (analyserState.mode  === 'microphone'){
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }

  function toggleTrack(track) {
    if (analyserState.mode  === 'track'){
      stopTrack();
    } else {
      setAnalyserState({
        input: track,
        mode: "track"
      });
    }
    
  }
  

  

  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

      </div>

      {analyserState.input ? <AudioAnalyser input={analyserState.input} mode={analyserState.mode}/> : ""}

      <AudioPlayer toggleTrack={toggleTrack}></AudioPlayer>
    </div>
  );
}

export default App;
