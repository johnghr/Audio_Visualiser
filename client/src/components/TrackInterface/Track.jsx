import React, {useState} from 'react';

const Track = ({
    track, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    index,
    deleteTrack
}) => {

    const [isEditing, setIsEditing] = useState(false)
    // set selected track index to be the index of the clicked track list item
    const handleClick = () => setSelectedTrackIndex(index)
    const handleDelete = () => deleteTrack(track)
    const handleEdit = () => editTrack(track)

    const editTrack = (track) => {
        console.log("if you loved me you wouldn't want me to change")
        if (isEditing === true) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }
    
    return(
       <div className="track-item-container">
            {isEditing === false ?
            <li 
                className={selectedTrackIndex === index ? "playing" : ""} 
                onClick={handleClick}
            >
                {track}
            </li> :
            <input></input>}

            <button onClick={handleDelete}>
                <svg className="delete-button"><use href="#delete-icon"/></svg>
            </button>

            <button onClick={handleEdit}>
                <svg className="edit-button"><use href="#edit-icon"/></svg>
            </button>
            
        </div> 
    ) 

}

export default Track;