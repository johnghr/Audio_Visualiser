import React, {useState} from 'react';

const TrackForm = () => {

    const [selectedFile, setSelectedFile] = useState(null)

    const onChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    return(
        <form action="/uploadfile" encType="multipart/form-data" methods="POST">
            <input type="file" name="myFiles" />
            <input type="file" value="Upload"/>
        </form>
    )

}

export default TrackForm;