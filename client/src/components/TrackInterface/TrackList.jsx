import React from 'react';
import Track from './Track'

const TrackList = ({
    trackUploads, 
    selectedTrackIndex, 
    setSelectedTrackIndex,
    deleteTrack,
    updateTrack,
    setUpdatedTrack,
    updatedTrack
}) => {

    // map trackUploads into individual tracks while assigning an index to each track
    const trackList = trackUploads.map((trackTitle, index) => {
        return <Track   trackTitle={trackTitle} 
                        key={index} 
                        index={index} 
                        selectedTrackIndex={selectedTrackIndex} 
                        setSelectedTrackIndex={setSelectedTrackIndex}
                        deleteTrack={deleteTrack}
                        updateTrack={updateTrack}
                        setUpdatedTrack={setUpdatedTrack}
                        updatedTrack={updatedTrack}

                    ></Track>
    })

    return (
        <ul className="track-list">
            {trackList}
        </ul>
    )

}

export default TrackList;