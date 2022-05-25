import { useRef, useEffect } from "react";
import { renderWaveform, renderFrequency } from "../lib/visualisers";
import styles from "./Visualiser.module.css";

const Visualiser = ({
  analyser,
  frequencyData,
  waveformData,
  background,
  fullscreen,
  setFullscreen,
  mode,
  currentVisualiser,
}) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");

    if (mode !== "off" && currentVisualiser === "Waveform") {
      renderWaveform(background, canvas, context, waveformData);
    } else if (mode !== "off" && currentVisualiser === "Frequency") {
      renderFrequency(analyser, background, canvas, context, frequencyData);
    } else {
      if (background === "Clear") {
        context.fillStyle = "#67b9a9";
        context.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    return function cleanup() {
      context.fillStyle = "##67b9a9";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
  }, [
    waveformData,
    frequencyData,
    background,
    mode,
    currentVisualiser,
    analyser,
  ]);

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
      className={`${styles.Canvas} ${
        fullscreen ? styles.Canvas__Fullscreen : ""
      }`}
      ref={canvasRef}
    />
  );
};

export default Visualiser;
