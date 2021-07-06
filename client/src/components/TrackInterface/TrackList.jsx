import React from 'react';
import Track from './Track'

const TrackList = ({trackUploads, setSelectedTrack}) => {

    const trackList = trackUploads.map((track, index) => {
        return <Track track={track} key={index} setSelectedTrack={setSelectedTrack}></Track>
    })

    return (
        <ul>
            {trackList}
        </ul>
    )

}

export default TrackList;