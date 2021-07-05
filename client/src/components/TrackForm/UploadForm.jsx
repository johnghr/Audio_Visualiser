import React, {useState} from 'react';

const baseUrl = 'http://localhost:5000/upload';

const UploadForm = ({addUpload}) => {

    const [file, setFile] = useState({
        file: null,
        fileName: ""
    })
    const [uploadedFile, setUploadedFile] = useState({})

    
    const onChange = e => {
        console.log("event target:", e.target)
        setFile({
            file: e.target.files[0],
            name: e.target.name
        });
        console.log("file set to:",file.file, 
                    "fileName set to:",file.fileName)
    }

    const onSubmit = async e => {
        console.log("stop hitting me")
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)
        console.log("here be form data",formData)
        
        try {

            const res = await fetch(baseUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })

            console.log("fetch sent")
            const { fileName, filePath} = res.formData;
            setUploadedFile({ fileName, filePath });
            console.log("uploaded file:", uploadedFile)

        } catch(err) {
            
            if(err.response.status === 500) {
                console.log('There was a problem with the server')
            } else {
                console.log(err.response.data.msg)
            }  

        }
    }

    return(
        <div>
           <form onSubmit={onSubmit} action="/upload" encType="multipart/form-data" methods="POST">
                <input onChange={onChange} type="file" name="track" id="" />
                <input type="submit" value="Upload"/>
            </form> 
            {uploadedFile ? <div>
                <h3>{file.name}</h3>
            </div> : null}
        </div>
    
    )

}

export default UploadForm;