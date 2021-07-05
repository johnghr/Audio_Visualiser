import React, {useState, useEffect} from 'react';
const axios = require('axios')
const baseUrl = 'http://localhost:5000/upload';

const UploadForm = () => {

    const [file, setFile] = useState(null)
    const [uploadedFile, setUploadedFile] = useState({})

    
    const onChange = e => {
        console.log("event target:", e.target)
        setFile(e.target.files); // async
    }

    useEffect(() => {
        console.log(file)
    }, [file])

    const onSubmit = e => {
        console.log("stop hitting me")
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)
        console.log("here be form data",formData)
        
        const config = {
            method: 'POST',
            data: formData
        }
            
        fetch(baseUrl, config)
            .then((res) => res.json())
            .then(data => console.log(data))
            .catch((err) => (console.log("error",err)));
        // const { fileName, filePath} = res.formData;
        // setUploadedFile({ fileName, filePath });
    }

    return(
        <div>
           <form onSubmit={onSubmit} encType="multipart/form-data">
                <input onChange={onChange} type="file" name="track" />
                <input type="submit" value="Upload"/>
            </form> 
        </div>
    )

}

export default UploadForm;