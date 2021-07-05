import React, {useState} from 'react';

const baseUrl = 'http://localhost:5000/upload';

const UploadForm = () => {

    const [file, setFile] = useState(null)
    const [uploadedFile, setUploadedFile] = useState({})

    
    const onChange = e => {
        console.log("event target:", e.target)
        setFile(e.target.files[0],);
        console.log("file set to:",file)
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
                    'Content-Type': 'multipart/form-data '
                },
                method: 'POST',
                data: formData
            })
            .then((res) => console.log("response",res))
            .catch((err) => (console.log("error",err)));
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
           <form onSubmit={onSubmit} action="/upload" encType="multipart/form-data" method="POST">
                <input onChange={onChange} type="file" name="track" id="" />
                <input type="submit" value="Upload"/>
            </form> 
        </div>
    
    )

}

export default UploadForm;