import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const ExperimentalVisualiser = ({
    audioData, 
    background
}) => {

    const canvasRef = useRef();
    
    // clear the canvas every 30 seconds
    // useEffect(() => {
        
    //     const clearCanvas = () => {
    //         context.clearRect(0, 0, width, height);
    //     }
    //     setInterval(clearCanvas, 30000)

    // },[])

    useEffect(() => {
        let canvas = canvasRef.current;
        let height = canvas.height;
        let width = canvas.width;
        let context = canvas.getContext('2d');
        let x = 0;
        let sliceWidth = width / audioData.length;
        let randomColour = "#" + ((1<<24)*Math.random() | 0).toString(16)
        if(background === "Black"){
            context.fillRect(0, 0,width, height)
        } else {
            context.fillStyle = '#000000'
        }
        
        const particles = [];

        const renderParticles = () => {
            
            if(background === "Black"){
                context.fillRect(0, 0,width, height)
            } else {
                context.fillStyle = '#000000'
            }
            
            const particle = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                xvel: Math.random(),
                yvel: Math.random(),
                size: 7
            }
            particles.push(particle)

            for (let i = 0; i < particles.length; i++){
                let p = particles[i];
                context.fillStyle = randomColour;
                context.fillRect(p.x, p.y, p.size, p.size)
            }
        }
        
        renderParticles()
        

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