// import React, {useRef}  from 'react';
// import AudioPlayer from './AudioPlayer';
// import AudioAnalyser from './AudioAnalyser';

// const AudioContext = ( {audioInput} ) => {

//     const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)())
//     const audioContext = audioContextRef.current;
//     console.log(audioContext)
//     const analyser = audioContext.createAnalyser();
//     const audioContextSource = audioContext.createMediaStreamSource(audioInput)

//     return(
//         <AudioAnalyser analyser={analyser} audioContextSource={audioContextSource}/>
//     )

// } 

// export default AudioContext
