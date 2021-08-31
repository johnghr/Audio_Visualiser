import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState, useRef} from 'react';
import TrackService from './services/TrackService';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList';
import './App.css';



function App() {

  // Initializes Audio Context and stores it in the current property of useRef

  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  const audioContext = audioContextRef.current;

  // State for managing the input for the visualiser analyser

  const initialAnalyserState = {input: null, mode: 'off'};
  const [analyserState, setAnalyserState] = useState(initialAnalyserState);
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

  // State and functions for managing the track interface services

  const [trackUploads, setTrackUploads] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  
  useEffect(() => {
    TrackService.getTracks().then(trackUploads => setTrackUploads(trackUploads));
  },[])

  const [updatedTrack, setUpdatedTrack] = useState({
    "title" : "",
    "index" : 0
  })

  const updateTrack = (trackTitle, updatedTrack) => {
    TrackService.updateTrack(trackTitle, updatedTrack);
    const updatedTrackUploads = [...trackUploads];
    console.log(updatedTrackUploads);
    updatedTrackUploads[updatedTrack.index] = updatedTrack.title;
    setTrackUploads(updatedTrackUploads);
  }

  const deleteTrack = (track) => {
    const trackToDelete = track;
    const updatedTrackList = trackUploads.filter(trackUpload => trackUpload !== trackToDelete);
    TrackService.deleteTrack(trackToDelete).then(setTrackUploads(updatedTrackList));
  }

  // State and functions for managing the toggle buttons - user mic, current visualiser setting and background

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
          setTrackUploads={setTrackUploads} 
          trackUploads={trackUploads}
          selectedTrackIndex={selectedTrackIndex}
          updateTrack={updateTrack}
          setUpdatedTrack={setUpdatedTrack}
          updatedTrack={updatedTrack}
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
          {analyserState.mode === 'microphone' ? 'Stop microphone' : 'Use microphone'}
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
