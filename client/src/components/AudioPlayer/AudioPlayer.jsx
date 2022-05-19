/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { AudioControls } from "./AudioControls";

export const AudioPlayer = ({
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
      audioRef.current.src = `http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`;
      onChangeTrack(audioRef.current);
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }

    return () => {
      console.log("bless this mess");
    };
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
    audioRef.current = new Audio(
      `http://localhost:5000/uploads/${trackUploads[selectedTrackIndex]}`
    );
    onChangeTrack(audioRef.current);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }

    return () => {
      console.log("somebody tidy this goddamn mess");
      audioRef.current.pause();
    };
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
  };

  const toNextTrack = () => {
    selectedTrackIndex < trackUploads.length - 1
      ? setSelectedTrackIndex(selectedTrackIndex + 1)
      : setSelectedTrackIndex(0);
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
