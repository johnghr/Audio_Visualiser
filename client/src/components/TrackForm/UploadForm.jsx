import React, {useState, useEffect} from 'react';
const baseUrl = 'http://localhost:5000/upload';

const UploadForm = () => {
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const config = {
            method: 'POST',
            // body not data
            body: formData,
        }
            
        fetch(baseUrl, config)
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch((err) => (console.log("error",err)));
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