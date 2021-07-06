import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {


  const [trackUploads, setTrackUploads] = useState([])

  useEffect(() => {
    
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setTrackUploads(data))

  }, [trackUploads])
   
  // useEffect(() => {

  //   console.log(tracks)

  // },[tracks])

  return (
    <div>
      <MediaPlayer></MediaPlayer>
      <UploadForm trackUploads={trackUploads} setTrackUploads={setTrackUploads}></UploadForm>
      <TrackList trackUploads={trackUploads}></TrackList>
    </div>
  );
}

export default App;
