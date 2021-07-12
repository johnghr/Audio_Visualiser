import React from 'react';

const Track = ({track, selectedTrackIndex, setSelectedTrackIndex, index}) => {

    // set selected track index to be the index of the clicked track list item
    const handleClick = (event) => setSelectedTrackIndex(index)
    
    return(
       <li 
        className={selectedTrackIndex === index ? "playing" : ""} 
        onClick={handleClick}
        >
            {track}
        </li> 
    ) 

}

export default Track;