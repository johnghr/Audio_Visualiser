import { useRef } from "react";
import TrackService from "../../services/TrackService";

export const UploadForm = ({ setTrackUploads, trackUploads }) => {
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
        <label className="file-upload-label" htmlFor="file-upload-input">
          Add Track +
          <input
            className="file-upload-input"
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
