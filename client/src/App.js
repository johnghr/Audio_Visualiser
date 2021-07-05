import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';
// import { getUploads } from './services/TrackService';
import UploadForm from './components/TrackForm/UploadForm'


function App() {


  return (
    <div>
      <MediaPlayer></MediaPlayer>
      <UploadForm></UploadForm>
    </div>
  );
}

export default App;
