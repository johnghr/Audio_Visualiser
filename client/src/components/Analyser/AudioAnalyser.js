import React, {useEffect, useState, useRef} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';
import ExperimentalVisualiser from '../Visualisers/ExperimentalVisualiser';
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser';

const AudioAnalyser = ({ mode, input, visualiserType, background, audioContext }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0));
    
    const sourceRef = useRef(null);
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    // empty request animation frame Id
    let rafId;  
    // Creates a data Array which is half the length of the fftSize;
    // which takes in unsigned 8 byte integers  
    let dataArray;

    useEffect(() => {    
        // connects the audio stream to the analyser node using the relevant method depending on input
        if(mode === "track"){ 
            source = audioContext.createMediaElementSource(input);
            source.connect(analyser).connect(audioContext.destination);    
        } else {
            // creating audioStream for mic input
            source = audioContext.createMediaStreamSource(input);
            source.connect(analyser);
        }

        return function cleanup() {
            source.disconnect(analyser)
            cancelAnimationFrame(rafId);
        }
    }, [mode, input])

    useEffect(() => {
        if (visualiserType === "Waveform"){
            analyser.fftSize = 1024
            let dataArray = new Uint8Array(analyser.frequencyBinCount)
            const tick = () => {
            // copies wave form data into the dataArray which is passed in as the argument   
            analyser.getByteTimeDomainData(dataArray)
            // sets audioData to be the value of a copy of dataArray - 
            // * spread operator required to force a re-render *
            setAudioData([...dataArray])
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
        }

            requestAnimationFrame(tick)
        } else {
            analyser.fftSize = 512;
            
            const tick = () => {
            // copies wave form data into the dataArray which is passed in as the argument   
            let dataArray = new Uint8Array(analyser.fftSize)
            analyser.getByteFrequencyData(dataArray)
            // sets audioData to be the value of a copy of dataArray - 
            // * spread operator required to force a re-render *
            setAudioData([...dataArray])
            console.log(dataArray)
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick)
        }

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }
    }, [visualiserType])

    return(
        // render either WaveformVisualiser or FrequencyVisualiser depending on state of visualiserType 
        <>
            {visualiserType === "Waveform" ? 
            <WaveformVisualiser 
                audioData={audioData} 
                background={background}
                analyser={analyser}
            /> :
            <FrequencyVisualiser 
                audioData={audioData} 
                analyser={analyser}
                background={background}
            /> }
        </>
        
    )

}

export default AudioAnalyser;