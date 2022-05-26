import { useRef } from "react";
import Add from "../../components/Icons/Add";
import { TrackService } from "../../services/TrackService";
import actionStyles from "../Track/Track.module.css";
import styles from "./UploadForm.module.css";

const UploadForm = ({ setTrackUploads, trackUploads }) => {
  const formRef = useRef(null);

  const onChooseFile = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    TrackService.addTrack(formData)
      .then((savedTrack) => setTrackUploads([...trackUploads, savedTrack]))
      .catch((err) => console.log("error:", err));
  };

  return (
    <form
      className={styles.UploadForm}
      ref={formRef}
      encType="multipart/form-data"
    >
      <label className={styles.Button} htmlFor="file-upload-input">
        Add
        <input
          className={styles.UploadForm__Input}
          id="file-upload-input"
          onChange={onChooseFile}
          type="file"
          name="track"
        />
        <span className={styles.Button__Content}>
          <Add className={actionStyles.Actions__Icon} />
        </span>
      </label>
    </form>
  );
};

export default UploadForm;
