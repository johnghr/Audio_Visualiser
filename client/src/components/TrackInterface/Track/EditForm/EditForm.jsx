import styles from "./EditForm.module.css";

const EditForm = ({ handleUpdateTrack, handleChange }) => {
  return (
    <form className={styles.EditForm}>
      <label htmlFor="edit-track-input"></label>
      <input
        onChange={handleChange}
        type="text"
        id="edit-track-input"
        name="edit-track-input"
      />
      <svg
        onClick={handleUpdateTrack}
        className={styles.EditForm__ConfirmButton}
      >
        <use href="#confirm-icon" />
      </svg>
    </form>
  );
};

export default EditForm;
