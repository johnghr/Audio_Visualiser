import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackForm/UploadForm'


function App() {
 
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000")
    .then(res => res.json())
    .then(data => setMessage(data.message))
  
  }, [])

  const [tracks, setTracks] = useState([]);

  // useEffect(() => {
  //   getUploads().then((allUploads) => {
  //     setTracks(allUploads)
  //   })
  // }, [])

  const addUpload = (upload) => {
    const temp = tracks.map( t => t);
    temp.push(upload)
    setTracks(temp)
  }

  return (
    <div>
      <MediaPlayer></MediaPlayer>
      <UploadForm addUpload={addUpload}></UploadForm>
      <p>The message is: {message}</p>
    </div>
  );
}

export default App;
