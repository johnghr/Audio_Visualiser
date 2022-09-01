import { useState } from "react";
import AudioAnalyser from "../Analyser";
import AudioPlayer from "./AudioPlayer";
import { RecordPlayer } from "./RecordPlayer";
import styles from "./MediaPlayer.module.css";
import { Television } from "./Television";

const MediaPlayer = ({
  analyserState,
  audioContext,
  background,
  currentVisualiser,
  fullscreen,
  selectedTrackIndex,
  setAnalyserState,
  setFullscreen,
  setSelectedTrackIndex,
  trackUploads,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onChangeTrack = (track) => {
    if (track.src !== "http://localhost:5000/uploads/undefined") {
      setAnalyserState({
        input: track,
        mode: "track",
      });
    }
  };

  return (
    <div className={styles.MediaPlayer}>
      <div className={styles.Canvas__Container}>
        <Television class={styles.Television} />
        <AudioAnalyser
          input={analyserState.input}
          mode={analyserState.mode}
          currentVisualiser={currentVisualiser}
          background={background}
          audioContext={audioContext}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </div>

      <RecordPlayer />
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onChangeTrack={onChangeTrack}
        trackUploads={trackUploads}
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex}
      />
    </div>
  );
};

export default MediaPlayer;
