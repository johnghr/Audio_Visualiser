/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { WaveformVisualiser } from "../Visualisers/WaveformVisualiser";
import { FrequencyVisualiser } from "../Visualisers/FrequencyVisualiser";

export const AudioAnalyser = ({
  mode,
  input,
  currentVisualiser,
  background,
  audioContext,
  fullscreen,
  setFullscreen,
}) => {
  const [frequencyData, setFrequencyData] = useState(new Uint8Array(0));
  const [waveformData, setWaveformData] = useState(new Uint8Array(0));

  let source = useRef(null);
  const analyserRef = useRef(audioContext.createAnalyser());
  const analyser = analyserRef.current;
  let audioData;
  const rafIdRef = useRef(null);

  let currentVisualiserRef = useRef(null);

  useEffect(() => {
    if (mode === "track") {
      source.current = audioContext.createMediaElementSource(input);
      source.current.connect(analyser).connect(audioContext.destination);
    } else if (mode === "microphone") {
      source.current = audioContext.createMediaStreamSource(input);
      source.current.connect(analyser);
    }

    // return function cleanup() {
    //   source.current.disconnect(analyser);
    //   cancelAnimationFrame(rafIdRef.current);
    // };
  }, [input]);

  const waveformTick = () => {
    audioData = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(audioData);
    setWaveformData([...audioData]);
    if (currentVisualiserRef.current === "Waveform") {
      rafIdRef.current = requestAnimationFrame(waveformTick);
    }
  };

  const frequencyTick = () => {
    audioData = new Uint8Array(analyser.fftSize / 2);
    analyser.getByteFrequencyData(audioData);
    setFrequencyData([...audioData]);
    if (currentVisualiserRef.current === "Frequency") {
      rafIdRef.current = requestAnimationFrame(frequencyTick);
    }
  };

  useEffect(() => {
    currentVisualiserRef.current = currentVisualiser;
    if (currentVisualiser === "Waveform") {
      analyser.fftSize = 2048;
      requestAnimationFrame(waveformTick);
    }

    if (currentVisualiser === "Frequency") {
      analyser.fftSize = 512;
      requestAnimationFrame(frequencyTick);
    }

    return function cleanup() {
      console.log("cancelling animation frame");
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [currentVisualiser]);

  return (
    <div className="canvas-container">
      {currentVisualiser === "Waveform" && (
        <WaveformVisualiser
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
          waveformData={waveformData}
          background={background}
          analyser={analyser}
        />
      )}

      {currentVisualiser === "Frequency" && (
        <FrequencyVisualiser
          fullscreen={fullscreen}
          frequencyData={frequencyData}
          analyser={analyser}
          background={background}
        />
      )}
    </div>
  );
};
