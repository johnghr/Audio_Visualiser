import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackForm/UploadForm'
const baseUrl = 'http://localhost:5000/';

function App() {


  const [tracks, setTracks] = useState([])

  useEffect(() => {
    
    fetch(baseUrl)
        .then(data => setTracks(data))
        console.log(tracks)
  }, [])
  

  return (
    <div>
      <MediaPlayer></MediaPlayer>
      <UploadForm></UploadForm>
    </div>
  );
}

export default App;
