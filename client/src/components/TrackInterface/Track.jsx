import React from 'react';

const Track = ({track, setSelectedTrackIndex, index}) => {

    const handleClick = (event) => {
        console.log("stop poking me", event.target);
        setSelectedTrackIndex(index);
    }

    return(
       <li onClick={handleClick}>{track}</li> 
    ) 

}

export default Track;