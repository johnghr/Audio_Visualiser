import React, {useEffect, useState} from 'react'
import AudioVisualiser from './AudioVisualiser'


const AudioAnalyser = ({ source, audioContext }) => {

    const [audioData, setAudioData] = useState(new Uint8Array());
    const [dataArray, setDataArray] = useState(new Uint8Array());
    
    let analyser = audioContext.createAnalyser();
    
    
    
    useEffect( () => {
        setDataArray = new Uint8Array(analyser.frequencyBinCount) ;
        source.connect(analyser);
        let rafId = requestAnimationFrame(tick);
    }, [])

    
    let tick = () => {   
        analyser.getByteTimeDomainData(dataArray);
        // console.log(dataArray)
        setAudioData(dataArray)
        let rafId = requestAnimationFrame(tick);
    }


    // function componentWillUnmount() {
    //     cancelAnimationFrame(rafId);
    //     analyser.disconnect();
    //     source.disconnect();
    // }

    return(
        <AudioVisualiser audioData={audioData}/>
    )

}

export default AudioAnalyser;