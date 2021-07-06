import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState, useRef} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackInterface/UploadForm'
import TrackList from './components/TrackInterface/TrackList'

const baseUrl = 'http://localhost:5000/';

function App() {

  const [trackUploads, setTrackUploads] = useState([])
  const [selectedTrack, setSelectedTrack] = useState("")

  // creates an audio context and stores it in ref    
  const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
  // sets audioContext to be the current ref of audioContext 
  const audioContext = audioContextRef.current;

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
      <MediaPlayer selectedTrack={selectedTrack} audioContext={audioContext}></MediaPlayer>
      <UploadForm trackUploads={trackUploads} setTrackUploads={setTrackUploads}></UploadForm>
      <TrackList setSelectedTrack={setSelectedTrack} trackUploads={trackUploads}></TrackList>
      {/* <audio controls src={`http://localhost:5000/uploads/${selectedTrack}`}></audio> */}
    </div>
  );
}

export default App;
