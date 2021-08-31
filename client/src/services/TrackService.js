const baseUrl = 'http://localhost:5000/'

const TrackService = {
    
    getTracks() {
        return fetch(baseUrl)
            .then(res => res.json())
    },

    addTrack(formData) {
        return fetch(`${baseUrl}upload`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
    },

    updateTrack(trackTitle, updatedTrack) {
        console.log("yi best pal jason",JSON.stringify(updatedTrack))
        return fetch(baseUrl + trackTitle, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTrack)
        })
        .then(res => res.json)
    },

    deleteTrack(trackTitle) {
        return fetch(baseUrl + trackTitle, {
            method: 'DELETE'    
        })
    }
    
}

export default TrackService;