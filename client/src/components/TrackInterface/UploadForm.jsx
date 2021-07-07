import React from 'react';
const baseUrl = 'http://localhost:5000/upload';

const UploadForm = ({
    setTrackUploads, 
    trackUploads,
    setTrackIndex
}) => {


    const onSubmit = event => {
        // prevent page refresh
        event.preventDefault();
        // create a new instance of FormData while passing in the user file input
        const formData = new FormData(event.currentTarget);
        // configuration for post request - * must exclude Content-Type *
        const config = {
            method: 'POST',
            body: formData,
        }
        // receive response from the server   
        fetch(baseUrl, config)
            // response to json
            .then((res) => res.json())
            // set trackUploads to be a new array containing previous entries plus new submitted track
            .then(savedTrack => setTrackUploads([...trackUploads, savedTrack]))
            // catch any errors
            .catch((err) => (console.log("error", err)))
    }

    return(
        
        <div>
            {/* * encType required to handle sending audio to server * */}
           <form onSubmit={onSubmit} encType="multipart/form-data">
                <input type="file" name="track" />
                <input type="submit" value="Upload"/>
            </form> 
        </div>
    )

}

export default UploadForm;