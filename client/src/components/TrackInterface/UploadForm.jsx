import React, {useRef} from 'react';
const baseUrl = 'http://localhost:5000/upload';

const UploadForm = ({
    setTrackUploads, 
    trackUploads
}) => {

    const formRef = useRef(null);

    const onChooseFile = (event) => {
         // prevent page refresh
         event.preventDefault();
         // create a new instance of FormData while passing in the user file input
         const formData = new FormData(formRef.current);
         console.log(formData)
         // configuration for post request - * must exclude Content-Type *
         const config = {
             method: 'POST',
             body: formData,
         }
         // receive response from the server   
         fetch(baseUrl, config)
             // response to json
             .then(res => res.json())
             // set trackUploads to be a new array containing previous entries plus new submitted track
             .then(savedTrack => setTrackUploads([...trackUploads, savedTrack]))
             // catch any errors
             .catch((err) => (console.log("error", err)))
    } 


    return(
        
        <div>
            {/* * encType required to handle sending audio to server * */}
           <form ref={formRef} encType="multipart/form-data">
                <label className="file-upload-label" htmlFor="file-upload-input">
                    Add Track +
                    <input className="file-upload-input" id="file-upload-input" onChange={onChooseFile} type="file" name="track"/>
                </label>
                
            </form> 
        </div>
    )

}

export default UploadForm;