import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {

  const [trackUploads, setTrackUploads] = useState([])
  const [selectedTrack, setSelectedTrack] = useState("")

  useEffect(() => {
    
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setTrackUploads(data))

  }, [])
   
  // useEffect(() => {

  //   console.log(tracks)

  // },[tracks])

  return (
    <div>
      <MediaPlayer selectedTrack={selectedTrack}></MediaPlayer>
      <UploadForm trackUploads={trackUploads} setTrackUploads={setTrackUploads}></UploadForm>
      <TrackList setSelectedTrack={setSelectedTrack} trackUploads={trackUploads}></TrackList>
      {/* <audio controls src={`http://localhost:5000/uploads/${selectedTrack}`}></audio> */}
    </div>
  );
}

export default App;
