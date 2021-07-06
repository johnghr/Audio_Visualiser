import React from 'react';

const Track = ({track, setSelectedTrack}) => {

    const handleClick = (event) => {
        console.log("stop poking me", event.target.textContent);
        setSelectedTrack(event.target.textContent);
        
    }

    return(
       <li onClick={handleClick}>{track}</li> 
    ) 

}

export default Track;