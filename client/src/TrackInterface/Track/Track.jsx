import { useState } from "react";
import EditForm from "./EditForm/EditForm";
import styles from "./Track.module.css";
import Delete from "../../components/Icons/Delete";
import Edit from "../../components/Icons/Edit";
import Confirm from "../../components/Icons/Confirm";
import Cancel from "../../components/Icons/Cancek";

const Track = ({
  trackTitle,
  selectedTrackIndex,
  setSelectedTrackIndex,
  index,
  deleteTrack,
  updateTrack,
  setUpdatedTrack,
  updatedTrack,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => setSelectedTrackIndex(index);
  const handleDelete = () => {
    console.log("deleting", trackTitle);
    deleteTrack(trackTitle);
  };
  const handleEdit = () => editTrack(trackTitle);

  const editTrack = () => setIsEditing(true);

  const handleUpdateTrack = (event) => {
    event.preventDefault();
    setIsEditing(false);
    updateTrack(trackTitle, updatedTrack);
  };

  const handleChange = (event) =>
    setUpdatedTrack({
      title: event.target.value,
      index: index,
    });

  return !isEditing ? (
    <div className={styles.Track__Container}>
      <li
        className={`${styles.Track__ListItem} ${
          selectedTrackIndex === index ? styles.Playing : ""
        }`}
        onClick={handleClick}
      >
        {trackTitle}
      </li>
      <div className={styles.Actions__Container}>
        <button className={styles.Actions__Positive} onClick={handleEdit}>
          <Edit className={styles.Actions__Icon} />
        </button>
        <button className={styles.Actions__Negative} onClick={handleDelete}>
          <Delete className={styles.Actions__Icon} />
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.Track__Container}>
      <EditForm
        handleChange={handleChange}
        handleUpdateTrack={handleUpdateTrack}
      />
      <div className={styles.Actions__Container}>
        <button
          className={styles.Actions__Positive}
          onClick={handleUpdateTrack}
        >
          <Confirm className={styles.Actions__Icon} />
        </button>
        <button
          className={styles.Actions__Negative}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Cancel className={styles.Actions__Icon} />
        </button>
      </div>
    </div>
  );
};

export default Track;
