import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {

  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const audioContext = audioContextRef.current;

  const initialAnalyserState = {input: null, mode: 'off'};
  const [analyserState, setAnalyserState] = useState(initialAnalyserState);
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

  const [trackUploads, setTrackUploads] = useState([])
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0)
  
  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setTrackUploads(data))
  },[])

  const deleteTrack = (track) => {
    const trackToDelete = track
    const updatedTrackList = trackUploads.filter(trackUpload => trackUpload !== trackToDelete)
    return fetch(baseUrl + track, {
        method: 'Delete'    
    }).then(setTrackUploads(updatedTrackList))
  };

  const [background, setBackground] = useState("Clear");
  const visualisers = ["Waveform", "Frequency", "Experimental"];
  const [visualiserIndex, setVisualiserIndex] = useState(0);
  let currentVisualiser = visualisers[visualiserIndex];

  const toggleVisualiser = () => {
    if (visualiserIndex < visualisers.length -1){
        setVisualiserIndex(visualiserIndex + 1);
    } else {
        setVisualiserIndex(0);
    }
  }

  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear")
  }

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

  function toggleMicrophone() {
    if (analyserState.mode  === "microphone"){
      stopMicrophone();
    } else {
      if(analyserState.mode === "track"){
        analyserState.input.pause()
        resetAnalyser();
      }
      getMicrophone();
    }
  }
 
  return (
    
    <div className="app-container">
      
      <div className="track-sidebar">
       
        <TrackList
          deleteTrack={deleteTrack} 
          setSelectedTrackIndex={setSelectedTrackIndex} 
          trackUploads={trackUploads}
          selectedTrackIndex={selectedTrackIndex}
        />

        <UploadForm 
          trackUploads={trackUploads} 
          setTrackUploads={setTrackUploads} 
        />

      </div>

      <div className="media-player">
        <MediaPlayer
          analyserState={analyserState}
          setAnalyserState={setAnalyserState}
          background={background}
          currentVisualiser={currentVisualiser} 
          selectedTrackIndex={selectedTrackIndex}
          setSelectedTrackIndex={setSelectedTrackIndex} 
          audioContext={audioContext}
          trackUploads={trackUploads} 
          setTrackUploads={setTrackUploads}>
        </MediaPlayer>
      </div>

      <div className="toggle-controls">
      
        <button id="mic-toggle" onClick={toggleMicrophone}>
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Get microphone'}
        </button>

        <button id="visualiser-toggle" onClick={toggleVisualiser}>
          {visualisers[visualiserIndex]}
        </button>

        <button id="background-toggle" onClick={toggleBackground}>
          {background === "Clear" ? "Black" : "Clear"}
        </button>

      </div>  
      
    </div>
  );
}

export default App;
