import React from 'react';

const TrackForm = () => {


    return(
        <form action="/uploadfile" encType="multipart/form-data" methods="POST">
            <input type="file" name="myFiles" />
            <input type="file" value="Upload"/>
        </form>
    )

}

export default TrackForm;