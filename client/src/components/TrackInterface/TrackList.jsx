import React from 'react';
import Track from './Track'

const TrackList = ({trackUploads, selectedTrackIndex, setSelectedTrackIndex}) => {

    // map trackUploads into individual tracks while assigning an index to each track
    const trackList = trackUploads.map((track, index) => {
        return <Track track={track} key={index} index={index} selectedTrackIndex={selectedTrackIndex} setSelectedTrackIndex={setSelectedTrackIndex}></Track>
    })

    return (
        <ul className="track-list">
            {trackList}
        </ul>
    )

}

export default TrackList;