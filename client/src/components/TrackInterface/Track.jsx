import React from 'react';
import TrackList from './TrackList';

const Track = ({
    track, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    index,
    deleteTrack
}) => {

  
    // set selected track index to be the index of the clicked track list item
    const handleClick = () => setSelectedTrackIndex(index)
    const handleDelete = () => deleteTrack(track)
    
    return(
       <div className="track-item-container">
            <li 
                className={selectedTrackIndex === index ? "playing" : ""} 
                onClick={handleClick}
            >
                {track}
                <button 
                    className="delete-button"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </li>
            
        </div> 
    ) 

}

export default Track;