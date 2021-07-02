import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const FrequencyVisualiser = ({audioData, analyser, setAnalyserDisconnected, analyserDisconnected}) => {

    const canvasRef = useRef();
    
    useEffect(() => {
        
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');

        analyser.fftSize = 256;
        console.log(analyser) 
        //bufferLength equals half the fftSize i.e. 128
        let bufferLength = analyser.frequencyBinCount;
        console.log("buffer length",bufferLength);
        // let dataArray = new Uint8Array(bufferLength);

        context.clearRect(0, 0, width, height);

        const render = () => {
            context.fillStyle = 'rgb(0, 0 , 0)';
            context.fillRect(0, 0 , width, height);

            let barWidth = (width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for(var i = 0; i < bufferLength; i++) {
                // the height of a bar equals the current audio sample value halved
                barHeight = audioData[i] / 0.5;

                context.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
                context.fillRect(x, height - barHeight / 2, barWidth, barHeight)

                x += barWidth + 1;
            }
        };

        render()

    }, [audioData]);

    return(
        <canvas 
            className="canvas"
            width="300" 
            height="300" 
            ref={canvasRef}
        />
    )

}

export default FrequencyVisualiser; 