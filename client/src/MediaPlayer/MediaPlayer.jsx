import { useState } from "react";
import AudioAnalyser from "../Analyser";
import AudioPlayer from "./AudioPlayer";
import styles from "./MediaPlayer.module.css";

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

      <div className={styles.RecordPlayer__Contaier}>
        <div className={styles.RecordPlayer}>
          <div className={styles.RecordPlayer__Top}>
            <div className={styles.RecordDisc}>
              {/* <div className={styles.Moon__Container}> */}
              <div className={styles.RecordDisc__Moon} />
              <div
                className={`${
                  isPlaying
                    ? styles.RecordDisc__MoonInnerAnimated
                    : styles.RecordDisc__MoonInner
                }`}
              />
              <div className={styles.RecordDisc__Outer}>
                <div className={styles.RecordDisc__Inner} />
              </div>
            </div>
          </div>
          <div className={styles.RecordPlayer__Bottom}>
            <AudioPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onChangeTrack={onChangeTrack}
              trackUploads={trackUploads}
              selectedTrackIndex={selectedTrackIndex}
              setSelectedTrackIndex={setSelectedTrackIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
