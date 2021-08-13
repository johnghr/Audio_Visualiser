import React from 'react';

const Track = ({track, selectedTrackIndex, setSelectedTrackIndex, index}) => {

    const baseUrl = 'http://localhost:5000/uploads/'
    // set selected track index to be the index of the clicked track list item
    const handleClick = (event) => setSelectedTrackIndex(index)
    const handleDelete = (event) => deleteTrack(track)

    const deleteTrack = (id) => {
        return fetch(baseUrl + id, {
            method: 'Delete'    
        });
    };
    
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