import React, {useEffect, useState} from 'react'
import AudioVisualiser from './AudioVisualiser'


 const MicAudioAnalyser = ({ audioInput }) => {

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
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContext.createAnalyser();
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        // const [dataArray, setDataArray] = useState(new Uint8Array());
        // const [audioData, setAudioData] = useState(new Uint8Array());
    
        
        const tick = () => {
            // copies wave form data into the dataArray which is passed in as an argument   
            analyser.getByteTimeDomainData(dataArray)
                
            // sets audioData to be the value of dataArray
            console.log("audio data:",dataArray)
            setAudioData([...dataArray])
            // requests a re-render while calling tick recursively
            rafId = requestAnimationFrame(tick);
        }
    
        rafId = requestAnimationFrame(tick);

        

        return function cleanup() {
            cancelAnimationFrame(rafId);
        }

    }, [audioInput])

    
    

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

export default MicAudioAnalyser;