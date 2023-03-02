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
    const element = document.querySelector("#tv-container");
    const { width, height } = element.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    const handleResize = (e) => {
      console.log("resizing");
      const element = document.querySelector("#tv-container");
      const { width, height } = element.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

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
