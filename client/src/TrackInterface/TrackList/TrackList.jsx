import { useState } from "react";
import Delete from "../../components/Icons/Delete";
import Edit from "../../components/Icons/Edit";
import Track from "../Track";
import styles from "./TrackList.module.css";

const TrackList = ({
  trackUploads,
  selectedTrackIndex,
  setSelectedTrackIndex,
  deleteTrack,
  updateTrack,
  setUpdatedTrack,
  updatedTrack,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // map trackUploads into individual tracks while assigning an index to each track
  const trackList = trackUploads.map((trackTitle, index) => {
    const handleDelete = () => deleteTrack(trackTitle);
    const handleEdit = () => editTrack(trackTitle);
    const editTrack = () => setIsEditing(true);

    return (
      <div className={styles.TrackContainer}>
        <Track
          trackTitle={trackTitle}
          key={index}
          index={index}
          selectedTrackIndex={selectedTrackIndex}
          setSelectedTrackIndex={setSelectedTrackIndex}
          deleteTrack={deleteTrack}
          updateTrack={updateTrack}
          setUpdatedTrack={setUpdatedTrack}
          updatedTrack={updatedTrack}
          isEditing={isEditing}
        />
      </div>
    );
  });

  return <ul className={styles.TrackList}>{trackList}</ul>;
};

export default TrackList;
