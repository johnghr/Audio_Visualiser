import React, {useEffect, useState} from 'react'
import WaveformVisualiser from '../Visualisers/WaveformVisualiser'
import FrequencyVisualiser from '../Visualisers/FrequencyVisualiser'


 const TrackAnalyser = ({ trackInput }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0))
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    // creates analyser node
    const analyser = audioContext.createAnalyser();

    useEffect( () => {
        // empty request animation frame Id
        let rafId;
        // creates an audio context
        
        // Creates a data Array which is half the length of the fftSize
        // it takes in unsigned integers  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        // creates a source variable containing the media stream source
        const source = audioContext.createMediaElementSource(trackInput)
        // connects the audio stream to the analyser node
        source.connect(analyser).connect(audioContext.destination)
        const tick = () => {
            // copies wave form data into the dataArray which is passed in as an argument   
            analyser.getByteTimeDomainData(dataArray)
            // sets audioData to be the value of a copy of dataArray
            // console.log("audio data:",dataArray)
            setAudioData([...dataArray])
            // requests a re-render while calling tick in a recursive loop
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }

    }, [trackInput])

    return(
        <div>
            <WaveformVisualiser audioData={audioData}/>
            <FrequencyVisualiser analyser={analyser} audioData={audioData}/>
        </div>
        
        
    )

}

export default TrackAnalyser;