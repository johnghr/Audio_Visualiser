import MediaPlayer from './containers/MediaPlayer';
import React, {useEffect, useState} from 'react';
import './App.css';


function App() {
 
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http:localhost:5000')
    .then(res => res.text())
    .then(text => console.log(text))
  
  }, [])

  return (
    <div>
      <MediaPlayer></MediaPlayer>
      <p>The server said: {message}</p>
    </div>
  );
}

export default App;
