import { useState } from "react";
import EditForm from "./EditForm/EditForm";
import styles from "./Track.module.css";

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
  const handleDelete = () => deleteTrack(trackTitle);
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

  return (
    <div className={styles.Track}>
      {isEditing === false ? (
        <li
          className={`${styles.Track__ListItem} ${
            selectedTrackIndex === index ? styles.Playing : ""
          }`}
          onClick={handleClick}
        >
          {trackTitle}
          <div>
            <button onClick={handleDelete}>
              <svg className={styles.Track__DeleteButton}>
                <use href="#delete-icon" />
              </svg>
            </button>

            <button onClick={handleEdit}>
              <svg className={styles.Track__EditButton}>
                <use href="#edit-icon" />
              </svg>
            </button>
          </div>
        </li>
      ) : (
        <EditForm
          handleChange={handleChange}
          handleUpdateTrack={handleUpdateTrack}
        />
      )}
    </div>
  );
};

export default Track;
