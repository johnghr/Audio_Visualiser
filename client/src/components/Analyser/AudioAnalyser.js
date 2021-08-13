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
    const counterRef = useRef(0);

    //we should only be setting the value of a single piece of state per animation frame otherwise the components will force itself to unnecessarily re-render
    const [frequencyData, setFrequencyData] = useState(new Uint8Array(0));
    const [waveformData, setWaveformData] = useState(new Uint8Array(0));

    const reducedFrequencyDataRef = useRef(0);
    const reducedFrequencyData = reducedFrequencyDataRef.current;

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
            source.disconnect(analyser)
            cancelAnimationFrame(rafId);
        }

    }, [mode, input])

    const waveformTick = () => {
        analyser.fftSize = 1024
        audioData = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(audioData);
        setWaveformData([...audioData])
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
        let reduceData = audioData.reduce((accum, currentValue) => accum += currentValue)
        reducedFrequencyDataRef.current = reduceData
        if(currentVisualiser !== "Waveform"){
           rafId = requestAnimationFrame(frequencyTick); 
        }    
    }

    useEffect(()=> {
        if (currentVisualiser === "Waveform"){
            requestAnimationFrame(waveformTick); 
        } else {
            requestAnimationFrame(frequencyTick)
        }

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }       
    }, [currentVisualiser])

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