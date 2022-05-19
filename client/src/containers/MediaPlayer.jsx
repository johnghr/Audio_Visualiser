import { AudioAnalyser } from "../components/Analyser/AudioAnalyser";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import "../App.css";

export const MediaPlayer = ({
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
    setAnalyserState({
      input: track,
      mode: "track",
    });
  };

  return (
    <>
      <div className="canvas-container">
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

      <div className="record-player-container">
        <div className="record-player">
          <div className="record-player-top">
            <div className="record-disc">
              <div className="outer-disc">
                <div className="inner-disc"></div>
              </div>
            </div>
          </div>
          <div className="record-player-bottom">
            <AudioPlayer
              onChangeTrack={onChangeTrack}
              trackUploads={trackUploads}
              selectedTrackIndex={selectedTrackIndex}
              setSelectedTrackIndex={setSelectedTrackIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};
