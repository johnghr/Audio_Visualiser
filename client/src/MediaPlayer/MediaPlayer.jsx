import { useState } from "react";
import { RecordPlayer } from "./RecordPlayer";

const MediaPlayer = ({
  selectedTrackIndex,
  setAnalyserState,
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
    <>
      <RecordPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onChangeTrack={onChangeTrack}
        trackUploads={trackUploads}
        selectedTrackIndex={selectedTrackIndex}
        setSelectedTrackIndex={setSelectedTrackIndex}
      />
    </>
  );
};

export default MediaPlayer;
