const baseUrl = 'http://localhost:5000/tracks';

const TrackService = {

    getTracks() {
        return fetch(baseUrl)
            .then(res => res.json())
    }
}

export default TrackService;