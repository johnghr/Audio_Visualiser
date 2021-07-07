import React, {useState} from 'react';
import AudioAnalyser from '../components/Analyser/AudioAnalyser';
import AudioPlayerTwo from '../components/AudioPlayer/AudioPlayer';

const MediaPlayer = ({
  selectedTrackIndex,
  setSelectedTrackIndex, 
  audioContext,
  trackUploads,
  setTrackUploads
}) => {

  // an initial analyserState for resetting analyser
  const initialAnalyserState = {input: null, mode: 'off'};
  // state to be passed down for analyser: track or mic input and mode:'track', 'mic' and off
  const[analyserState, setAnalyserState] = useState(initialAnalyserState);
  // background state to be passed down to visualiser canvases to set background
  const[background, setBackground] = useState("Clear")
  // type state to be passed down to visualiser canvases to determine which visualiser is rendered
  const[visualiserType, setVisualiserType] = useState("Waveform")
  // does what it says on the tin
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

  // fetch permission to use microphone and set the feed as the input for the analyser
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

  // loop through all mic tracks and stop them, reset the analyser
  function stopMicrophone() {
    analyserState.input.getTracks().forEach(track => track.stop());
    resetAnalyser();
  }

  // function onPauseTrack() {
  //   console.log("onPauseTrack hit")
  //   resetAnalyser();
  // }

  
  // check if analyserState mode has been set to microphone - if so stop microphone
  function toggleMicrophone() {
    if (analyserState.mode  === 'microphone'){
      stopMicrophone();
    } else {
      // otherwise, get permission to use microphone
      getMicrophone();
    }
  }

  // when track is played in AudioPlayer
  const onChangeTrack = (track) => {
    // console.log('on change track', track);
    setAnalyserState({
      input: track,
      mode: "track"
    })
  }

  const toggleVisualiser = () => {
    setVisualiserType(visualiserType === "Waveform" ? "Frequency" : "Waveform");
  }

  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear")
  }
  
  return (
    <div className="App">
      
      <div className="controls">
        
        <button onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        <button onClick={toggleVisualiser}>
          {visualiserType === "Waveform" ? "Frequency" : "Waveform"}
        </button>

        <button onClick={toggleBackground}>
          {background === "Clear" ? "Black" : "Clear"}
        </button>

      </div>

      {analyserState.input &&
        <AudioAnalyser 
            input={analyserState.input} 
            mode={analyserState.mode} 
            visualiserType={visualiserType}
            background={background}
            audioContext={audioContext}
        />}

      <AudioPlayerTwo 
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex}
        trackUploads={trackUploads} 
        setTrackUploads={setTrackUploads}
        onChangeTrack={onChangeTrack}
      />
    
    </div>
  );
}

export default MediaPlayer;
