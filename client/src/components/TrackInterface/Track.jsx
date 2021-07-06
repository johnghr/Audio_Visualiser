import React from 'react';

const Track = ({track}) => {

    const handleClick = (event) => {
        console.log("stop poking me", event.target.textContent)
        let selectedTrack = event.target.textContent
        fetch(`http://localhost:5000/uploads/${selectedTrack}`, )
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch((err) => (console.log("error",err)))
            // .then(savedTrack => setTrackUploads([...trackUploads, savedTrack]))
        
    }

    return(
       <li onClick={handleClick}>{track}</li> 
    ) 

}

export default Track;