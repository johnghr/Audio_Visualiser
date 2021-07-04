import React, {useState} from 'react';

const baseUrl = 'http://localhost:5000/single';

const UploadForm = ({addUpload}) => {

    const [formData, setFormData] = useState(null)

    
    const onChangeHandler = (event) => {
        console.log("event target:", event.target)
        setFormData(event.target.files[0]);
        console.log("form data",formData)
    }

    const onSubmit = (formData) => {
        // event.preventDefault();
        // postUpload(formData).then((data) => {
        //     addUpload(data);
             fetch(baseUrl, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
        }
        
    

    return(

        <form onSubmit={onSubmit} action="/single" encType="multipart/form-data" methods="POST">
            <input onChange={onChangeHandler} type="file" name="track" id="" />
            <input type="submit" value="Upload"/>
        </form>
    
    )

}

export default UploadForm;