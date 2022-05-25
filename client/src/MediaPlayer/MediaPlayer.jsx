import AudioAnalyser from "./Analyser";
import AudioPlayer from "./AudioPlayer";
import styles from "./MediaPlayer.module.css";

const MediaPlayer = ({
  currentVisualiser,
  background,
  selectedTrackIndex,
  setSelectedTrackIndex,
  audioContext,
  trackUploads,
  setAnalyserState,
  analyserState,
  fullscreen,
  setFullscreen,
}) => {
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
              <div className={styles.RecordDisc__Outer}>
                <div className={styles.RecordDisc__Inner} />
              </div>
            </div>
          </div>
          <div className={styles.RecordPlayer__Bottom}>
            <AudioPlayer
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
