import React, {useEffect, useState} from 'react'
import AudioVisualiser from './AudioVisualiser'


 const AudioAnalyser = ({ audioInput, audioContext }) => {

    const [audioData, setAudioData] = useState(new Uint8Array(0))
    
    
    
    
    useEffect( () => {
        // sets audio data to be a Uint8Array which is half as long as the analyser fftSize:
        // determines the amount of data values available for visualisation
        // setDataArray(new Uint8Array(analyser.frequencyBinCount)) ;
        // connect the audio analyser to the source of audio
        // audioContextSource.connect(analyser);
        // set the request animation frame Id for use when app dismounts/cancels and calls 
        // tick
        let rafId;

        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        // const [dataArray, setDataArray] = useState(new Uint8Array());
        // const [audioData, setAudioData] = useState(new Uint8Array());
        audioInput.connect(analyser)
        const tick = () => {
            // copies wave form data into the dataArray which is passed in as an argument   
            analyser.getByteTimeDomainData(dataArray)
            // setDataArray([...dataArray]);
            console.log("audio data:",dataArray)
            setAudioData([...dataArray])
            // set AudioData to be data contained in dataArray so it can be passed down to
            // visualiser as a prop
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }

    }, [])

    
    

    // function componentWillUnmount() {
    //     cancelAnimationFrame(rafId);
    //     analyser.disconnect();
    //     source.disconnect();
    // }

    return(
        <AudioVisualiser audioData={audioData}/>
        // <p>Testing broken shit</p>
    )

}

export default AudioAnalyser;