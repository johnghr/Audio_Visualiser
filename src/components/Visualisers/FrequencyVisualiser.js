import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const FrequencyVisualiser = ({ audioData, analyser }) => {

    const canvasRef = useRef();
    
    useEffect(() => {

        const canvas = canvasRef.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');

        // small fftSize so that each bar is big enough to look like a bar
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        const dataArray =  new Uint8Array(bufferLength);

        context.clearRect(0, 0, width ,height);

        const render = () => {
            analyser.getByteFrequencyData(dataArray);

            context.fillStyle = 'rgb(0, 0, 0)';
            context.fillRect(0, 0, width, height)

            const barWidth = (width / bufferLength) * 2.5
            let barHeight;
            let x = 0;

            for(let i = 0; i < bufferLength; i++) {
                barHeight = audioData[i] / 2;

                context.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
                context.fillRect(x, height - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }
        }

        render();

    }, [audioData, analyser]);

}

export default FrequencyVisualiser;