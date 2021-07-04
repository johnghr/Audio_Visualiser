import React, {useState} from 'react';

const UploadForm = () => {

    const [formData, setFormData] = useState(null)

    const onChangeHandler = (event) => {
        setFormData(event.target.files[0]);
        console.log(formData)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postUpload(formData).then((data) => {
            addUpload(data);
        })
    }

    return(

        <form onSubmit="onSubmit" action="/uploadfile" encType="multipart/form-data" methods="POST">
            <input onChange={onChangeHandler} type="file" name="" id="" />
            <input type="submit" value="Upload"/>
        </form>
    
    )

}

export default UploadForm;