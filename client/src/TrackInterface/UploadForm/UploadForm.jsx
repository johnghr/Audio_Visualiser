import { useRef } from "react";
import { TrackService } from "../../services/TrackService";
import buttonStyles from "../../ToggleControls/ToggleControls.module.css";
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
    <div>
      <form ref={formRef} encType="multipart/form-data">
        <label
          className={`${buttonStyles.Button} ${buttonStyles.Button__AddTrack}`}
          htmlFor="file-upload-input"
        >
          Add Track +
          <input
            className={styles.UploadForm__Input}
            id="file-upload-input"
            onChange={onChooseFile}
            type="file"
            name="track"
          />
        </label>
      </form>
    </div>
  );
};

export default UploadForm;
