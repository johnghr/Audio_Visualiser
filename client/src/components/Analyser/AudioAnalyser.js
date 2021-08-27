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
    let audioData;
    const rafIdRef = useRef(null);

    let currentVisualiserRef = useRef(currentVisualiser)
     

    useEffect(() => {    
        if(mode === "track"){ 
            source = audioContext.createMediaElementSource(input);
            source.connect(analyser).connect(audioContext.destination);    
        } else if (mode === "microphone") {
            source = audioContext.createMediaStreamSource(input);
            source.connect(analyser);
        } else {
            return
        }

        return function cleanup() {
            console.log("analyser disconnected")
            source.disconnect(analyser)
            cancelAnimationFrame(rafIdRef.current);
        }

    }, [mode, input])

    const waveformTick = () => {
        console.log("waveform says tick")
        audioData = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(audioData);
        setWaveformData([...audioData])
        if(currentVisualiserRef.current === "Waveform"){
            rafIdRef.current = requestAnimationFrame(waveformTick);  
        } 
    }

    const frequencyTick = () => {
        console.log("frequency says tock")
        audioData = new Uint8Array(analyser.fftSize / 2);
        analyser.getByteFrequencyData(audioData);
        setFrequencyData([...audioData])
        reducedFrequencyDataRef.current = audioData.reduce((accum, currentValue) => accum += currentValue)
        
        if(currentVisualiserRef.current !== "Waveform"){
            rafIdRef.current = requestAnimationFrame(frequencyTick); 
        }  
    }
    

    useEffect(() => {
        currentVisualiserRef.current = currentVisualiser
        if (currentVisualiser === "Waveform"){
            analyser.fftSize = 2048;
            requestAnimationFrame(waveformTick);
        } else {
            analyser.fftSize = 512;
            requestAnimationFrame(frequencyTick);
        }

        return function cleanup() {
            console.log("clean up di mess pls 2")
            if (currentVisualiser === "Waveform"){
                cancelAnimationFrame(rafIdRef.current)
            } else {
                cancelAnimationFrame(rafIdRef.current)
            }
        }

    }, [currentVisualiser])

    return(
        <div className="canvas-container">
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
                analyser={analyser}
                background={background}
                reducedFrequencyData={reducedFrequencyData}
            />}
        </div>  
    )

}

export default AudioAnalyser;