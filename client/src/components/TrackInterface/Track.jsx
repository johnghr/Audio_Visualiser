import React, {useState} from 'react';

const Track = ({
    track, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    index,
    deleteTrack
}) => {

    const baseUrl = 'http://localhost:5000/';
    const [isEditing, setIsEditing] = useState(false)
    const [editedTrackTitle, setEditedTrackTitle] = useState("")
    // set selected track index to be the index of the clicked track list item
    const handleClick = () => setSelectedTrackIndex(index)
    const handleDelete = () => deleteTrack(track)
    const handleEdit = () => editTrack(track)

    const editTrack = () => setIsEditing(true)
        

    const handleSubmitEdit = () => {
        setIsEditing(false)
        console.log(editedTrackTitle)
        return fetch(baseUrl + track + `/${editedTrackTitle}`, {
            method: 'PUT'
        })
    }

    const handleChange = event => setEditedTrackTitle(event.target.value)
    
    return(
    
        <div className="track-item-container">
        {isEditing === false ?        
            <>
            <li 
                className={selectedTrackIndex === index ? "playing" : ""} 
                onClick={handleClick}
            >
                {track}
            </li>

            <button onClick={handleDelete}>
                <svg className="delete-button"><use href="#delete-icon"/></svg>
            </button>  
            
            <button  onClick={handleEdit}>
                <svg className="edit-button"><use href="#edit-icon"/></svg>
            </button>
            </>
        :
            <>
                <form className="edit-form">
                    <label htmlFor="edit-track-input">
                        <svg onClick={handleSubmitEdit} className="confirm-button"><use href="#confirm-icon"/></svg>
                        <input onChange={handleChange} type="text" id="edit-track-input" name="edit-track-input"></input>
                    </label>
                </form>
            </>
        }
        </div>
          
    ) 

}

export default Track;