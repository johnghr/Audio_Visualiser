import React from 'react';
import Track from './Track'

const TrackList = ({trackUploads, setSelectedTrackIndex}) => {

    const trackList = trackUploads.map((track, index) => {
        return <Track track={track} key={index} index={index} setSelectedTrackIndex={setSelectedTrackIndex}></Track>
    })

    return (
        <ul>
            {trackList}
        </ul>
    )

}

export default TrackList;