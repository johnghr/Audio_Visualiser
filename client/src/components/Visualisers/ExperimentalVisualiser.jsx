import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const ExperimentalVisualiser = ({
    background,
    reducedFrequencyData,
    rafId
}) => {

    const canvasRef = useRef();

    useEffect(() => {
        let reducedDataToString = reducedFrequencyData.toString()
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');     
        let number = 0;
        let scale =  10;

        if(background === "Black"){
            context.fillRect(0, 0,width, height)
        } else {
            context.fillStyle = '#67b9a9'
        }

        function drawFlower(){

            let angle = number * 1;
            let radius = scale * Math.sqrt(number);
            let positionX = radius * Math.sin(angle) + width / 2;
            let positionY = radius * Math.cos(angle) + height / 2;

            context.fillStyle = `#${reducedDataToString}`;
            context.strokeStyle = 'black';
            context.lineWidth = 5;
            context.beginPath();
            context.arc(positionX, positionY, 20, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.stroke();

            number ++
        }

        function animate(){
            drawFlower();
            requestAnimationFrame(animate)
        }

        animate()

        return function cleanup(){
            context.fillStyle = "##67b9a9"
            context.fillRect(0, 0,width, height)
        }

    }, [background])

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