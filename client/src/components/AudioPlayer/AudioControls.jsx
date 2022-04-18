import { Play } from "../Icons//Play";
import { Pause } from "../Icons//Pause.jsx";
import { Next } from "../Icons/Next.jsx";
import { Previous } from "../Icons//Previous.jsx";

export const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className="audio-controls">
    <button
      type="button"
      className="control-icon"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Previous />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="control-icon"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="control-icon"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className="control-icon"
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
);
