import React, {useEffect, useState, useRef} from 'react';
import WaveformVisualiser from '../Visualisers/WaveformVisualiser';
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser';

const AudioAnalyser = ({ mode, input, visualiserType, background, audioContext }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0));
    
    const sourceRef = useRef(null);
    let source = sourceRef.current;
    const analyserRef = useRef(audioContext.createAnalyser())
    const analyser = analyserRef.current;
    const [analyserDisconnected, setAnalyserDisconnected] = useState(false)

    useEffect( () => {
        // empty request animation frame Id
        let rafId; 
         
        // Creates a data Array which is half the length of the fftSize;
        // which takes in unsigned 8 byte integers  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        // connects the audio stream to the analyser node using the relevant method depending on input
        if(mode === "track"){ 
            console.log("I'm playing a track")
            source = audioContext.createMediaElementSource(input);
            source.connect(analyser).connect(audioContext.destination);    
        } else {
            // creating audioStream for mic input
            source = audioContext.createMediaStreamSource(input);
            source.connect(analyser);
        }
        
        
        const tick = () => {
            // copies wave form data into the dataArray which is passed in as the argument   
            analyser.getByteTimeDomainData(dataArray)
            // sets audioData to be the value of a copy of dataArray - 
            // * spread operator required to force a re-render *
            setAudioData([...dataArray])
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        return function cleanup() {
            console.log("here be cleanup")
            if(mode === "track"){
                console.log("disconnecting here")
                source.disconnect(analyser);
                setAnalyserDisconnected(true)
                console.log(source)
                
            } else {
                console.log("or here")
                source.disconnect()
                console.log(source)
            }
            cancelAnimationFrame(rafId);
        }

    }, [mode, input])

    return(
        // render either WaveformVisualiser or FrequencyVisualiser depending on state of visualiserType 
        <>
            {visualiserType === "Waveform" ? 
            <WaveformVisualiser 
                audioData={audioData} 
                analyserDisconnected={analyserDisconnected} 
                setAnalyserDisconnected={setAnalyserDisconnected}
                background={background}
            /> :
            <FrequencyVisualiser 
                audioData={audioData} 
                analyser={analyser}
                setAnalyserDisconnected={setAnalyserDisconnected}
                background={background}
            /> }
        </>
        
    )

}

export default AudioAnalyser;