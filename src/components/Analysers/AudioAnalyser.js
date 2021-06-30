import React, {useEffect, useState} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';

const AudioAnalyser = ({ mode, input }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0));
    

    useEffect( () => {
        // empty request animation frame Id
        let rafId; 
        
        // creates an audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // creates analyser node
        const analyser = audioContext.createAnalyser();
        // Creates a data Array which is half the length of the fftSize
        // it takes in unsigned integers  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        // connects the audio stream to the analyser node
        let source;
        if(mode === "track"){
            source = audioContext.createMediaElementSource(input);
            source.connect(analyser).connect(audioContext.destination);
        } else {
            source = audioContext.createMediaStreamSource(input);
            source.connect(analyser);
        }
        
        const tick = () => {
            // copies wave form data into the dataArray which is passed in as an argument   
            analyser.getByteTimeDomainData(dataArray)
            // sets audioData to be the value of a copy of dataArray
            console.log("audio data:",dataArray)
            setAudioData([...dataArray])
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }

    }, [mode, input])

    return(
        <div>
            <WaveformVisualiser audioData={audioData}/>
            {/* <FrequencyVisualiser audioData={audioData} analyser={analyser}/>  */}
        </div>
        
    )

}

export default AudioAnalyser;