import { useEffect, useState, useRef } from "react";
import { TrackService } from "./services/TrackService";
import styles from "./App.module.css";
import { Television } from "./MediaPlayer/Television";
import UploadForm from "./TrackInterface/UploadForm";
import TrackList from "./TrackInterface/TrackList";
import MediaPlayer from "./MediaPlayer";
import AudioAnalyser from "./Analyser";

import "./App.css";
import { ToggleConrols } from "./ToggleControls/ToggleControls";

export const App = () => {
  // Initializes Audio Context and stores it in the current property of useRef

  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const audioContext = audioContextRef.current;

  // State for managing the input for the visualiser analyser

  const initialAnalyserState = { input: null, mode: "off" };
  const [analyserState, setAnalyserState] = useState(initialAnalyserState);
  const resetAnalyser = () => setAnalyserState(initialAnalyserState);

  // State and functions for managing the track interface services

  const [trackUploads, setTrackUploads] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  // Ref for fullscreen

  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    TrackService.getTracks().then((trackUploads) =>
      setTrackUploads(trackUploads)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [updatedTrack, setUpdatedTrack] = useState({
    title: "",
    index: 0,
  });

  const updateTrack = (trackTitle, updatedTrack) => {
    TrackService.updateTrack(trackTitle, updatedTrack);
    const updatedTrackUploads = [...trackUploads];
    updatedTrackUploads[updatedTrack.index] = updatedTrack.title;
    setTrackUploads(updatedTrackUploads);
  };

  const deleteTrack = (track) => {
    const trackToDelete = track;
    const updatedTrackList = trackUploads.filter(
      (trackUpload) => trackUpload !== trackToDelete
    );
    TrackService.deleteTrack(trackToDelete).then(
      setTrackUploads(updatedTrackList)
    );
  };

  // State and functions for managing the toggle buttons - user mic, current visualiser setting and background
  const [background, setBackground] = useState("Black");
  const visualisers = ["Waveform", "Frequency"];
  const [visualiserIndex, setVisualiserIndex] = useState(0);
  let currentVisualiser = visualisers[visualiserIndex];

  const toggleVisualiser = () => {
    if (visualiserIndex < visualisers.length - 1) {
      setVisualiserIndex(visualiserIndex + 1);
    } else {
      setVisualiserIndex(0);
    }
  };

  const toggleBackground = () => {
    setBackground(background === "Clear" ? "Black" : "Clear");
  };

  const getMicrophone = async () => {
    let micAudio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAnalyserState({
      input: micAudio,
      mode: "microphone",
    });
  };

  const stopMicrophone = () => {
    analyserState.input.getTracks().forEach((track) => track.stop());
    resetAnalyser();
  };

  const toggleMicrophone = () => {
    if (analyserState.mode === "microphone") {
      stopMicrophone();
    } else {
      if (analyserState.mode === "track") {
        analyserState.input.pause();
        resetAnalyser();
      }
      getMicrophone();
    }
  };

  return (
    <div className={styles.AppContainer}>
      <div className={styles.TopContainer}>
        <ToggleConrols
          background={background}
          mode={analyserState.mode}
          toggleBackground={toggleBackground}
          toggleMicrophone={toggleMicrophone}
          toggleVisualiser={toggleVisualiser}
          visualisers={visualisers}
          visualiserIndex={visualiserIndex}
          setFullscreen={setFullscreen}
          fullscreen={fullscreen}
        />
        <Television
          input={analyserState.input}
          mode={analyserState.mode}
          currentVisualiser={currentVisualiser}
          background={background}
          audioContext={audioContext}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />

        <div className={styles.TrackInterface}>
          <TrackList
            deleteTrack={deleteTrack}
            setSelectedTrackIndex={setSelectedTrackIndex}
            setTrackUploads={setTrackUploads}
            trackUploads={trackUploads}
            selectedTrackIndex={selectedTrackIndex}
            updateTrack={updateTrack}
            setUpdatedTrack={setUpdatedTrack}
            updatedTrack={updatedTrack}
          />

          <UploadForm
            trackUploads={trackUploads}
            setTrackUploads={setTrackUploads}
          />
        </div>
      </div>

      <div className={styles.BottomContainer}>
        <MediaPlayer
          analyserState={analyserState}
          setAnalyserState={setAnalyserState}
          background={background}
          currentVisualiser={currentVisualiser}
          selectedTrackIndex={selectedTrackIndex}
          setSelectedTrackIndex={setSelectedTrackIndex}
          audioContext={audioContext}
          trackUploads={trackUploads}
          setTrackUploads={setTrackUploads}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </div>
    </div>
  );
};
