import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const ExperimentalVisualiser = ({
    audioData, 
    background
}) => {

    const canvasRef = useRef();

    useEffect(() => {
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');
        // let randomColour = "#" + ((1<<24)*Math.random() | 0).toString(16)
        if(background === "Black"){
            context.fillRect(0, 0,width, height)
        } else {
            context.fillStyle = '#000000'
        }
        
        let number = 0;
        let scale =  10;

        function drawFlower(){
            let angle = number * 1;
            let radius = scale * Math.sqrt(number);
        }

    }, [audioData, background])

    return(
        <canvas 
            className="canvas"
            width="550" 
            height="550" 
            ref={canvasRef}
        />
    )

}

export default ExperimentalVisualiser;