const baseUrl = 'http://localhost:5000/tracks';

export const getTracks = () => {
    return(fetch(baseUrl))
        .then(res => res.json())
}

// export function uploadSuccess({data}) {
//     return {
//         type: 'UPLOAD_DOCUMENT_SUCCESS',
//         data
//     };
// }

// export function uploadFail(error) {
//     return {
//         type: 'UPLOAD_DOCUMENT_FAIL',
//         error
//     }
// }

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
