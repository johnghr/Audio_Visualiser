import React, {useState} from 'react';
import AudioAnalyser from '../components/Analysers/AudioAnalyser';
import {tracks} from '../components/AudioPlayer/tracks'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'


function MediaPlayer() {
  //mode can be 'off', 'track' or 'microphone'
  const initialAnalyserState = {input: null, mode: 'off'};
  const[analyserState, setAnalyserState] = useState(initialAnalyserState);
  const[visualiserType, setVisualiserType] = useState("Waveform")

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

  function onPauseTrack() {
    console.log("onPauseTrack hit")
    resetAnalyser();
  }

  function toggleMicrophone() {
    if (analyserState.mode  === 'microphone'){
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }

  const onChangeTrack = (track) => {
    console.log('on change track', track);
    setAnalyserState({
      input: track,
      mode: "track"
    })
  }

  const toggleVisualiser = () => 
    setVisualiserType(visualiserType === "Waveform" ? "Frequency" : "Waveform");

  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        <button onClick={toggleVisualiser}>
          {visualiserType === "Waveform" ? "Frequency" : "Waveform"}
        </button>

      </div>

      {analyserState.input &&
        <AudioAnalyser 
            input={analyserState.input} 
            mode={analyserState.mode} 
            visualiserType={visualiserType}
        />}

      <AudioPlayer tracks={tracks} onChangeTrack={onChangeTrack} onPauseTrack={onPauseTrack}></AudioPlayer>
    </div>
  );
}

export default MediaPlayer;
