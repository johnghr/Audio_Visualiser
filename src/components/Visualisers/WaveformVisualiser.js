import React, {useRef, useEffect} from 'react';

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

const WaveformVisualiser = ({audioData, setAnalyserDisconnected, analyserDisconnected}) => {

    const canvasRef = useRef();
    
    //clear the canvas every 30 seconds
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
        let sliceWidth = (width * 0.5) / audioData.length;
        let randomColour = "#" + ((1<<24)*Math.random() | 0).toString(16)
        
        // if the analyser has been disconnected clear the canvas and reset analyserDisconnected to false
        if(analyserDisconnected){
            context.clearRect(0, 0, width, height);
            setAnalyserDisconnected(false)
        }
        

        const renderWaveform = () => {
            context.lineWidth = 2;
            context.strokeStyle = randomColour;
            
            context.beginPath();
            context.moveTo(0, height / 2);

            for(const item of audioData) {
                const y = (item / 255.0) * height;
                context.lineTo(x, y);
                x += sliceWidth;
            }
            // console.log("Audio-data:", audioData)
            context.lineTo(x, height / 2);
            context.stroke();
            
        }
        
        renderWaveform()
        

    }, [audioData])

    return(
        <canvas 
            className="canvas"
            width="1024" 
            height="700" 
            ref={canvasRef}
        />
    )

}

export default WaveformVisualiser;