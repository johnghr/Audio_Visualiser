import React from 'react';

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
                    onClick={handleDelete}
                >
                    <svg className="delete-button"><use href="#delete-icon"/></svg>
                </button>
            
            </li>
            
        </div> 
    ) 

}

export default Track;