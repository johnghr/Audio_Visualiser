import React from 'react';

const Track = ({track}) => {

    const handleClick = (event) => {
        console.log("stop poking me", event.target.textContent)
        let selectedTrack = event.target.textContent
        
    }

    return(
       <li onClick={handleClick}>{track}</li> 
    ) 

}

export default Track;