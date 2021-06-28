import React, {useEffect, useState} from 'react'
import AudioVisualiser from './AudioVisualiser'


const AudioAnalyser = ({ audioContextSource, audioContext }) => {

    const [audioData, setAudioData] = useState(new Uint8Array());

    
    let analyser = audioContext.createAnalyser();

    
    
    useEffect( () => {
        setAudioData(new Uint8Array(analyser.frequencyBinCount)) ;
        audioContextSource.connect(analyser);
        let rafId = requestAnimationFrame(tick);
    }, [])

    
    let tick = () => {   
        analyser.getByteTimeDomainData(audioData);
        // console.log(audioData)
        setAudioData(audioData)
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