import MediaPlayer from "./containers/MediaPlayer";
import { useEffect, useState, useRef } from "react";
import TrackService from "./services/TrackService";
import { UploadForm } from "./components/TrackInterface/UploadForm";
import { TrackList } from "./components/TrackInterface/TrackList";
import "./App.css";
import { ToggleConrols } from "./components/ToggleControls/ToggleControls";

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

  useEffect(() => {
    TrackService.getTracks().then((trackUploads) =>
      setTrackUploads(trackUploads)
    );
    console.log("getting tracks:", trackUploads);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [updatedTrack, setUpdatedTrack] = useState({
    title: "",
    index: 0,
  });

  const updateTrack = (trackTitle, updatedTrack) => {
    TrackService.updateTrack(trackTitle, updatedTrack);
    const updatedTrackUploads = [...trackUploads];
    console.log(updatedTrackUploads);
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

  const [background, setBackground] = useState("Clear");
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
    <div className="app-container">
      <div className="track-sidebar">
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

      <div className="media-player">
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
        ></MediaPlayer>
      </div>

      <div className="toggle-controls">
        <ToggleConrols
          background={background}
          mode={analyserState.mode}
          toggleBackground={toggleBackground}
          toggleMicrophone={toggleMicrophone}
          toggleVisualiser={toggleVisualiser}
          visualisers={visualisers}
          visualiserIndex={visualiserIndex}
        />
      </div>
    </div>
  );
};
