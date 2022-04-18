/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";

const AudioPlayer = ({
  trackUploads,
  onChangeTrack,
  selectedTrackIndex,
  setSelectedTrackIndex,
}) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Refs
  const audioRef = useRef(new Audio());
  audioRef.current.crossOrigin = "anonymous";

  const { duration } = audioRef.current;

  const intervalRef = useRef();
  const isReady = useRef(false);

  useEffect(() => {
    if (isPlaying) {
      console.log("playing");
      audioRef.current.src = `http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`;
      onChangeTrack(audioRef.current);
      audioRef.current.play();
      startTimer();
    } else {
      console.log("paused");
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    console.log("clean up on aisle 3");
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // audioRef.current.pause();
    // setTrackProgress(audioRef.current.currentTime);
    audioRef.current.pause();

    audioRef.current.src = `http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`;
    onChangeTrack(audioRef.current);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      setIsPlaying(true);
      audioRef.current.play();

      startTimer();
    } else {
      isReady.current = true;
    }
  }, [selectedTrackIndex]);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const toPrevTrack = () => {
    selectedTrackIndex - 1 < 0
      ? setSelectedTrackIndex(trackUploads.length - 1)
      : setSelectedTrackIndex(selectedTrackIndex - 1);
    console.log("trackIndex on prev:", selectedTrackIndex);
  };

  const toNextTrack = () => {
    selectedTrackIndex < trackUploads.length - 1
      ? setSelectedTrackIndex(selectedTrackIndex + 1)
      : setSelectedTrackIndex(0);
    console.log("trackIndex on next:", selectedTrackIndex);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  return (
    <div className="audio-player">
      <div className="track-info">
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
