import React, {useRef, useEffect} from 'react';


const WaveformVisualiser = ({
    waveformData, 
    background,
}) => {

    // creates a useRef for the canvas
    const canvasRef = useRef();

    useEffect(() => {
        
        // sets canvas to be the current property of canvasRef
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        // sets the canvas context to be 2d
        let context = canvas.getContext('2d');
        // horizontal axis
        let x = 0;
        // each audio sample is represented by a sliceWidth - the width of the 
        // canvas divided by the length of the dataArray (1024 samples)
        
        let sliceWidth = width / waveformData.length;
        let randomColour = "#" + ((1<<24)*Math.random() | 0).toString(16)
        if(background === "Clear"){
            context.fillStyle = '#67b9a9';   
        } else {
            context.fillStyle = '#000000'
        }

        const renderWaveform = () => {
            
            if(background === "Black"){
                context.fillRect(0, 0,width, height)
            } else {
                context.fillStyle = '#000000'
            }
            
            context.lineWidth = 2;
            context.strokeStyle = randomColour;
            
            context.beginPath();
            context.moveTo(0, height / 2);

            for(const item of waveformData) {
                const y = (item / 255.0) * height;
                context.lineTo(x, y);
                x += sliceWidth;
            }
            
            context.lineTo(x, height / 2);
            context.stroke();
            
        }
        
        renderWaveform()
        
        return function cleanup() {
            context.fillStyle = "#00aeb0"
            context.fillRect(0, 0,width, height)
        }
       
    }, [waveformData, background])

    return(
        
        <canvas 
            className="canvas"
            width="550" 
            height="550" 
            ref={canvasRef}
        />
    )

}

export default WaveformVisualiser;