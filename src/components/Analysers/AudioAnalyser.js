import React, {useEffect, useState, useRef} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser';

const AudioAnalyser = ({ mode, input }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0));
        
    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)());
    const audioContext = audioContextRef.current;
    const sourceRef = useRef(null);
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    const [analyserDisconnected, setAnalyserDisconnected] = useState(false)
    
    useEffect( () => {
        console.log('analyser input', input)
        // empty request animation frame Id
        let rafId; 
        
        // creates an audio context
        
        // Creates a data Array which is half the length of the fftSize;
        // it takes in unsigned integers  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        // connects the audio stream to the analyser node

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
            setAudioData([...dataArray])
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        return function cleanup() {
            console.log("disconnect analyser")
            if(mode === "track"){
                console.log("mode is track")
                source.disconnect(analyser);
                setAnalyserDisconnected(true)
            } else {
                console.log("mode is not track")
                source.disconnect()
            }
            cancelAnimationFrame(rafId);
            console.log('clean up on aisle 3')   
        }

    }, [mode, input])

    return(
        <div>
            <WaveformVisualiser audioData={audioData} analyserDisconnected={analyserDisconnected}/>
            {/* <FrequencyVisualiser audioData={audioData} analyser={analyser}/>  */}
        </div>
        
    )

}

export default AudioAnalyser;