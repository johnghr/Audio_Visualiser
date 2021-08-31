import React, { useRef, useEffect } from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const FrequencyVisualiser = ({ 
    frequencyData, 
    analyser, 
    background,
    rafId 
}) => {

    const canvasRef = useRef();

    useEffect(() => {
        
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');
        // let randomColour = "#" + ((1 << 24) * Math.random() | 0).toString(16)

        //bufferLength equals half the fftSize i.e. 128
        let bufferLength = analyser.frequencyBinCount;

        context.clearRect(0, 0, width, height);

        const render = () => {
            if(background === "Clear"){
                context.fillStyle = '#67b9a9';   
            } else {
                context.fillStyle = '#000000'
            }

            context.fillRect(0, 0, width, height);

            let barWidth = (width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (var i = 0; i < bufferLength; i++) {
                // the height of a bar equals the current audio sample value halved
                barHeight = frequencyData[i] * 2.75;
                const red = i * barHeight/20;
                const green = i * 4;
                const blue = barHeight/2;
                context.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
                // context.fillStyle = 'red';
                context.fillRect(x, height - barHeight / 2, barWidth, barHeight)

                x += barWidth + 1;
            }
        };

        render()

        return function cleanup(){
            context.fillStyle = "##67b9a90"
            context.fillRect(0, 0,width, height)
        }

    });

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