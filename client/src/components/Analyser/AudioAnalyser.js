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
    const reducedFrequencyDataRef = useRef(0)
    let reducedFrequencyData = reducedFrequencyDataRef.current
    
    let sourceRef = useRef(null);
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    const analyserFftSizeRef = useRef(0);
    let analyserFftsize = analyserFftSizeRef.current
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
        analyser.fftSize = 2048
        analyserFftsize = analyser.fftSize
        audioData = new Uint8Array(analyserFftsize);
        analyser.getByteTimeDomainData(audioData);
        setWaveformData([...audioData])
        if(currentVisualiser === "Waveform"){
          rafId = requestAnimationFrame(waveformTick);  
        } 
    }

    const frequencyTick = () => {
        analyser.fftSize = 512
        analyserFftsize = analyser.fftSize
        audioData = new Uint8Array(analyserFftsize / 2);
        analyser.getByteFrequencyData(audioData);
        setFrequencyData([...audioData])
        reducedFrequencyDataRef.current = audioData.reduce((accum, currentValue) => accum += currentValue)
        
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
                reducedFrequencyData={reducedFrequencyData}
            />}
        </>  
    )

}

export default AudioAnalyser;