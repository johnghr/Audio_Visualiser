import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {

  // state to store user track uploads in an array
  const [trackUploads, setTrackUploads] = useState([])
  // state to track the index of the current selected track
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0)

  // creates an audio context and stores it in ref in order to manipulate/visualise audio inputs    
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  // sets audioContext to be the current ref of audioContext 
  const audioContext = audioContextRef.current;

  useEffect(() => {
    // when the app has started retrieve data from the server
    fetch(baseUrl)
      // turn the response into json
      .then(res => res.json())
      // store the data in trackUploads array
      .then(data => setTrackUploads(data))

  }, [])

  const deleteTrack = (track) => {
    const trackToDelete = track
    const updatedTrackList = trackUploads.filter(trackUpload => trackUpload !== trackToDelete)
    return fetch(baseUrl + track, {
        method: 'Delete'    
    }).then(setTrackUploads(updatedTrackList))
    
    
  };

  

  return (
    
    <div className="app-container">
      
      <div className="sidebar">
       
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

      <MediaPlayer 
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex} 
        audioContext={audioContext}
        trackUploads={trackUploads} 
        setTrackUploads={setTrackUploads}>
      </MediaPlayer>
      
    </div>
  );
}

export default App;
