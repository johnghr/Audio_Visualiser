import React, {useState} from 'react';

const Track = ({
    trackTitle, 
    selectedTrackIndex,
    setSelectedTrackIndex,
    index,
    deleteTrack,
    updateTrack,
    setUpdatedTrack,
    updatedTrack
}) => {

    const [isEditing, setIsEditing] = useState(false)

    const handleClick = () => setSelectedTrackIndex(index)
    const handleDelete = () => deleteTrack(trackTitle)
    const handleEdit = () => editTrack(trackTitle)

    const editTrack = () => setIsEditing(true)
        
    const handleUpdateTrack = (event) => {
        event.preventDefault()
        setIsEditing(false)
        updateTrack(trackTitle, updatedTrack)
    }

    const handleChange = event => setUpdatedTrack({
        "title" : event.target.value,
        "index" : index
    })
    
    return(
    
        <div className="track-item-container">
        {isEditing === false ?        
            
            <li 
                className={`track-list-item ${selectedTrackIndex === index ? "playing" : ""}`} 
                onClick={handleClick}
            >
                {trackTitle}
                <div>
                   <button onClick={handleDelete}>
                        <svg className="delete-button"><use href="#delete-icon"/></svg>
                    </button>  
                    
                    <button  onClick={handleEdit}>
                        <svg className="edit-button"><use href="#edit-icon"/></svg>
                    </button> 
                </div>
                
            </li>
        :
            <>
                <form className="edit-form">
                    <label htmlFor="edit-track-input">
                        <svg onClick={handleUpdateTrack} className="confirm-button"><use href="#confirm-icon"/></svg>
                        <input onChange={handleChange} type="text" id="edit-track-input" name="edit-track-input"></input>
                    </label>
                </form>
            </>
        }
        </div>
          
    ) 

}

export default Track;