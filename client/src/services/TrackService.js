const baseUrl = 'http://localhost:5000/upload';

export const getUploads = () => {
    return(fetch(baseUrl))
        .then(res => res.json())
}

export const postUpload = (payload) => {
    return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
}

// export async function uploadDocumentRequest() {
//     const path = `file://${}`
//     const data = new FormData();
//     data.append('file', 
//     {
//         uri: path,
//         name:         
//     });

//     return (dispatch) => {
//         axios.post()
//     }
// }
