import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {

  const [trackUploads, setTrackUploads] = useState([])
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0)

  // creates an audio context and stores it in ref    
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  // sets audioContext to be the current ref of audioContext 
  const audioContext = audioContextRef.current;

  useEffect(() => {
    
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setTrackUploads(data))

  }, [])

  return (
    
    <div>

      <MediaPlayer 
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex} 
        audioContext={audioContext}
        trackUploads={trackUploads} 
        setTrackUploads={setTrackUploads}>
      </MediaPlayer>

      <UploadForm 
        trackUploads={trackUploads} 
        setTrackUploads={setTrackUploads} 
      >
      </UploadForm>

      <TrackList 
        setSelectedTrackIndex={setSelectedTrackIndex} 
        trackUploads={trackUploads}
      />
      
      
    </div>
  );
}

export default App;
