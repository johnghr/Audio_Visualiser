import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const AudioVisualiser = ({audioData}) => {

    const canvasRef = useRef();
    
    useEffect(() => {
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');
        let x = 0;
        let sliceWidth = (width * 0.5) / audioData.length;

        const render = () => {
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            // when not clearingRect waveform displays
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.moveTo(0, height / 2);

            for(const item of audioData) {
                const y = (item / 255.0) * height;
                context.lineTo(x, y);
                x += sliceWidth;
            }

            context.lineTo(x, height / 2);
            context.stroke();
            
        }
        
        render()
        
    }, [audioData])

    return(
        <canvas 
        width="300" 
        height="300" 
        ref={canvasRef}
        />
    )

}

export default AudioVisualiser;