import styles from "./EditForm.module.css";

const EditForm = ({ handleChange }) => {
  return (
    <form className={styles.EditForm}>
      <label htmlFor="edit-track-input"></label>
      <input
        className={styles.EditForm__Input}
        onChange={handleChange}
        type="text"
        id="edit-track-input"
        name="edit-track-input"
      />
    </form>
  );
};

export default EditForm;
