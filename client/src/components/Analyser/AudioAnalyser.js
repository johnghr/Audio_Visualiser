import React, {useEffect, useState, useRef} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';
import ExperimentalVisualiser from '../Visualisers/ExperimentalVisualiser';
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser';

const AudioAnalyser = ({ 
    mode, 
    input, 
    currentVisualiser, 
    background, 
    audioContext 
}) => {

    const [frequencyData, setFrequencyData] = useState(new Uint8Array(0));
    const [waveformData, setWaveformData] = useState(new Uint8Array(0));
    const [reducedFrequencyData, setReducedFrequencyData] = useState(0);
    
    let sourceRef = useRef(null);
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    let audioData;
    let rafId;  

    useEffect(() => {    
        if(mode === "track"){ 
            source = audioContext.createMediaElementSource(input);
            source.connect(analyser).connect(audioContext.destination);    
        } else {
            source = audioContext.createMediaStreamSource(input);
            source.connect(analyser);
        }

        return function cleanup() {
            console.log("analyser disconnected")
            source.disconnect(analyser)
            cancelAnimationFrame(rafId);
        }

    }, [mode, input])

    const waveformTick = () => {
        analyser.fftSize = 1024
        audioData = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(audioData);
        setWaveformData([...audioData])
        console.log("waveformData")
        if(currentVisualiser === "Waveform"){
          rafId = requestAnimationFrame(waveformTick);  
        }
        
    }

    const frequencyTick = () => {
        analyser.fftSize = 512
        let bufferLength = analyser.frequencyBinCount
        audioData = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(audioData);
        setFrequencyData([...audioData])
        console.log("frequencyData")
        let reduceData = audioData.reduce((accum, currentValue) => accum += currentValue)
        setReducedFrequencyData(reduceData);
        if(currentVisualiser !== "Waveform"){
           rafId = requestAnimationFrame(frequencyTick); 
        }
        
    }

    useEffect(() => {
        if (currentVisualiser === "Waveform"){
           requestAnimationFrame(waveformTick); 
        } else {
            requestAnimationFrame(frequencyTick)
        }
        
        return function cleanup() {
            console.log("clean up di mess pls")
            cancelAnimationFrame(rafId);
        }

    })

    // const tick = () => {
    //     if (currentVisualiser === "Waveform"){
    //         analyser.fftSize = 1024
    //         let waveformData = new Uint8Array(analyser.fftSize);
    //         analyser.getByteTimeDomainData(waveformData);
    //         setAudioData([...waveformData])
    //         console.log("waveformData")
    //     } else {
    //         analyser.fftSize = 512
    //         let bufferLength = analyser.frequencyBinCount
    //         let frequencyData = new Uint8Array(bufferLength);
    //         analyser.getByteFrequencyData(frequencyData);
    //         setAudioData([...frequencyData])
    //         console.log("frequencyData")
    //         let reduceData = frequencyData.reduce((accum, currentValue) => accum += currentValue)
    //         setReducedData(reduceData);
            
    //     }

    //     rafId = requestAnimationFrame(tick);
    // }

    return(
        <>
            {currentVisualiser === "Waveform" &&
            <WaveformVisualiser 
                waveformData={waveformData} 
                background={background}
                analyser={analyser}
            />}

            {currentVisualiser === "Frequency" &&
            <FrequencyVisualiser
                frequencyData={frequencyData} 
                analyser={analyser}
                background={background}
            />}  
            
            {currentVisualiser === "Experimental" &&
            <ExperimentalVisualiser 
                frequencyData={frequencyData} 
                analyser={analyser}
                background={background}
                reducedData={reducedFrequencyData}
            />}
        </>  
    )

}

export default AudioAnalyser;