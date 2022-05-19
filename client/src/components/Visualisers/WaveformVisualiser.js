import { useRef, useEffect } from "react";

export const WaveformVisualiser = ({
  waveformData,
  background,
  fullscreen,
  setFullscreen,
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let height = canvas.height;
    let width = canvas.width;
    let context = canvas.getContext("2d");
    let x = 0;

    let sliceWidth = width / waveformData.length;
    let randomColour = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

    context.clearRect(0, 0, width, height);

    const renderWaveform = () => {
      if (background === "Clear") {
        context.fillStyle = "#67b9a9";
      } else {
        context.fillStyle = "#000000";
      }

      context.fillRect(0, 0, width, height);
      context.lineWidth = 2;
      context.strokeStyle = randomColour;

      context.beginPath();
      context.moveTo(0, height / 2);

      for (const item of waveformData) {
        const y = (item / 255.0) * height;
        context.lineTo(x, y);
        x += sliceWidth;
      }

      context.lineTo(x, height / 2);
      context.stroke();
    };

    renderWaveform();

    return function cleanup() {
      context.fillStyle = "##67b9a9";
      context.fillRect(0, 0, width, height);
    };
  }, [waveformData, background]);

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
