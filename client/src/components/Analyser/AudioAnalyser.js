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
    
    let sourceRef = useRef();
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    let audioData;
    const waveformRafIdRef = useRef();
    let waveformRafId = waveformRafIdRef.current;
    const frequencyRafIdRef = useRef();
    let frequencyRafId = frequencyRafIdRef.current

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
            // cancelAnimationFrame(rafId);
        }

    }, [mode, input])

    const waveformTick = () => {
        console.log("waveform says tick")
        audioData = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(audioData);
        setWaveformData([...audioData])
        if(currentVisualiser === "Waveform"){
            waveformRafId = requestAnimationFrame(waveformTick);  
        } 
    }

    const frequencyTick = () => {
        console.log("frequency says tock")
        audioData = new Uint8Array(analyser.fftSize / 2);
        analyser.getByteFrequencyData(audioData);
        setFrequencyData([...audioData])
        reducedFrequencyDataRef.current = audioData.reduce((accum, currentValue) => accum += currentValue)
        
        if(currentVisualiser !== "Waveform"){
            frequencyRafId = requestAnimationFrame(frequencyTick); 
        }  
    }
    

    useEffect(() => {
        if (currentVisualiser === "Waveform"){
            analyser.fftSize = 2048;
            requestAnimationFrame(waveformTick);
        } else {
            analyser.fftSize = 512;
            requestAnimationFrame(frequencyTick);
        }

    }, [currentVisualiser])

    useEffect(() => {
        console.log("clean up di mess pls 2")
        if (currentVisualiser === "Waveform"){
            cancelAnimationFrame(waveformRafId)
        } else {
            cancelAnimationFrame(frequencyRafId)
        }
        
    }, [currentVisualiser])

    return(
        <div className="canvas-container">
            {currentVisualiser === "Waveform" &&
            <WaveformVisualiser 
                rafId={waveformRafId}
                waveformData={waveformData} 
                background={background}
                analyser={analyser}
            />}

            {currentVisualiser === "Frequency" &&
            <FrequencyVisualiser
                rafId={frequencyRafId}
                frequencyData={frequencyData} 
                analyser={analyser}
                background={background}
            />}  
            
            {currentVisualiser === "Experimental" &&
            <ExperimentalVisualiser
                rafId={frequencyRafId} 
                analyser={analyser}
                background={background}
                reducedFrequencyData={reducedFrequencyData}
            />}
        </div>  
    )

}

export default AudioAnalyser;