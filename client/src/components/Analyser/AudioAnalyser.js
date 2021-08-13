import React, {useEffect, useState, useRef} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';
import ExperimentalVisualiser from '../Visualisers/ExperimentalVisualiser';
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser';

const AudioAnalyser = ({ 
    mode, 
    input,
    visualisers, 
    visualiserIndex, 
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
        if(visualisers[visualiserIndex] === "Waveform"){
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
        reducedFrequencyDataRef.current = audioData.reduce((accum, currentValue) => accum += currentValue)
        
        if(visualisers[visualiserIndex] !== "Waveform"){
           rafId = requestAnimationFrame(frequencyTick); 
        }
        
    }

    useEffect(() => {
        if (visualisers[visualiserIndex] === "Waveform"){
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
            {visualisers[visualiserIndex] === "Waveform" &&
            <WaveformVisualiser 
                waveformData={waveformData} 
                background={background}
                analyser={analyser}
            />}

            {visualisers[visualiserIndex] === "Frequency" &&
            <FrequencyVisualiser
                frequencyData={frequencyData} 
                analyser={analyser}
                background={background}
            />}  
            
            {visualisers[visualiserIndex] === "Experimental" &&
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