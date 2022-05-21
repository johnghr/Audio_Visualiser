import { useRef, useEffect } from "react";

//let testWaveFormRef = useRef(Array.from({length: 1024}, () => Math.floor(Math.random() * 255)));
//  const testWaveForm = testWaveFormRef.current;

export const FrequencyVisualiser = ({
  frequencyData,
  analyser,
  background,
  fullscreen,
  setFullscreen,
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext("2d");

    //bufferLength equals half the fftSize i.e. 128
    const bufferLength = analyser.frequencyBinCount;

    context.clearRect(0, 0, width, height);

    const render = () => {
      if (background === "Clear") {
        context.fillStyle = "#67b9a9";
      } else {
        context.fillStyle = "#000000";
      }

      context.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (var i = 0; i < bufferLength; i++) {
        // the height of a bar equals the current audio sample value halved
        barHeight = frequencyData[i] * 2.75;
        const red = (i * barHeight) / 20;
        const green = i * 4;
        const blue = barHeight / 2;
        context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
        context.fillRect(x, height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();

    return function cleanup() {
      context.fillStyle = "##67b9a90";
      context.fillRect(0, 0, width, height);
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (fullscreen) {
      canvas.requestFullscreen();
    }

    return function cleanup() {
      setFullscreen(false);
    };
  }, [fullscreen, setFullscreen]);

  return (
    <canvas
      className={`canvas ${fullscreen ? "fullscreen" : ""}`}
      ref={canvasRef}
    />
  );
};
