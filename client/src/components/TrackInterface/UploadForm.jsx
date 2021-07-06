import React from 'react';
const baseUrl = 'http://localhost:5000/upload';

const UploadForm = ({setTrackUploads, trackUploads}) => {

    const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const config = {
            method: 'POST',
            body: formData,
        }
            
        fetch(baseUrl, config)
            .then((res) => res.json())
            .then(savedTrack => setTrackUploads([...trackUploads, savedTrack]))
            .catch((err) => (console.log("error", err)))
    }

    return(
        
        <div>
           <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="file" name="track" />
                <input type="submit" value="Upload"/>
            </form> 
        </div>
    )

}

export default UploadForm;