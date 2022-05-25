/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import Visualiser from "../../Visualiser";
const AudioAnalyser = ({
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

  const source = useRef(null);
  const analyserRef = useRef(audioContext.createAnalyser());
  const analyser = analyserRef.current;
  let audioData;
  const rafIdRef = useRef(null);

  const currentVisualiserRef = useRef(null);

  useEffect(() => {
    if (mode === "track") {
      source.current = audioContext.createMediaElementSource(input);
      source.current.connect(analyser).connect(audioContext.destination);
    } else if (mode === "microphone") {
      source.current = audioContext.createMediaStreamSource(input);
      source.current.connect(analyser);
    }

    return function cleanup() {
      if (source.current !== null) {
        source.current.disconnect(analyser);
        cancelAnimationFrame(rafIdRef.current);
      }
    };
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
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [currentVisualiser]);

  return (
    <Visualiser
      analyser={analyser}
      mode={mode}
      fullscreen={fullscreen}
      setFullscreen={setFullscreen}
      waveformData={waveformData}
      frequencyData={frequencyData}
      background={background}
      currentVisualiser={currentVisualiser}
    />
  );
};

export default AudioAnalyser;
