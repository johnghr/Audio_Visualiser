import React from 'react';
// import { ReactComponent as Play } from './assets/play.svg';
// import { ReactComponent as Pause } from './assets/pause.svg';
// import { ReactComponent as Next } from './assets/next.svg';
// import { ReactComponent as Prev } from './assets/prev.svg';

const AudioControls = ({
        isPlaying,
        onPlayPauseClick,
        onPrevClick,
        onNextClick,
        toggleTrack
    }) => {

        const handlePlay = (event) => {
            const eventTarget = event.target;
            console.log("eventTarget", event)
            toggleTrack(eventTarget);
        } 

        return(
            <div className="audio-controls">
                <button
                    type="button"
                    className="prev"
                    aria-label="Previous"
                    onClick={onPrevClick}
                >
                Prev {/* <Prev /> */}
                </button>
                {isPlaying ? (
                <button
                    type="button"
                    className="pause"
                    onClick={() => onPlayPauseClick(false)}
                    // onPlay={handlePlay}
                    aria-label="Pause"
                    onPlay={handlePlay}
                >
                    Pause {/* <Pause /> */}
                </button>
                ) : (
                <button
                    type="button"
                    className="play"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                    onPlay={handlePlay}
                >
                    Play {/* <Play /> */}
                </button>
                )}
                <button
                    type="button"
                    className="next"
                    aria-label="Next"
                    onClick={onNextClick}
                    >
                    Next {/* <Next /> */}
                </button>
            </div>
        )

} 
    


export default AudioControls;