import React from 'react';
import Track from './Track'

const TrackList = ({trackUploads}) => {

    const trackList = trackUploads.map((track, index) => {
        return <Track track={track} key={index}></Track>
    })

    return (
        <ul>
            {trackList}
        </ul>
    )

}

export default TrackList;