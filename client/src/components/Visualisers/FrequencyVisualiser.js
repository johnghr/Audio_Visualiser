import React, { useRef, useEffect } from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const FrequencyVisualiser = ({ audioData, analyser, background }) => {

    const canvasRef = useRef();

    useEffect(() => {
        
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');
        let randomColour = "#" + ((1 << 24) * Math.random() | 0).toString(16)

        // a quarter of the fft size default
        analyser.fftSize = 256;
        //bufferLength equals half the fftSize i.e. 128
        let bufferLength = analyser.frequencyBinCount;
        // let dataArray = new Uint8Array(bufferLength);

        context.clearRect(0, 0, width, height);

        const render = () => {
            if(background === "Clear"){
                context.fillStyle = '#00aeb0';   
            } else {
                context.fillStyle = '#000000'
            }

            context.fillRect(0, 0, width, height);

            let barWidth = (width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (var i = 0; i < bufferLength; i++) {
                // the height of a bar equals the current audio sample value halved
                barHeight = audioData[i] / 0.3;
                
                context.fillStyle = randomColour;
                context.fillRect(x, height - barHeight / 2, barWidth, barHeight)

                x += barWidth + 1;
            }
        };

        render()

    }, [audioData]);

    return (
        <canvas
            className="canvas"
            width="550"
            height="550"
            ref={canvasRef}
        />
    )

}

export default FrequencyVisualiser;