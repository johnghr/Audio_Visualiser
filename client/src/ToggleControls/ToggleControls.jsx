import styles from "./ToggleControls.module.css";

export const ToggleConrols = ({
  background,
  mode,
  toggleBackground,
  toggleMicrophone,
  toggleVisualiser,
  visualisers,
  visualiserIndex,
  setFullscreen,
  fullscreen,
}) => {
  return (
    <div className={styles.ToggleControls}>
      <button className={styles.Button} onClick={toggleMicrophone}>
        {mode === "microphone" ? "Stop microphone" : "Use microphone"}
      </button>

      <button className={styles.Button} onClick={toggleVisualiser}>
        {visualisers[visualiserIndex]}
      </button>

      <button className={styles.Button} onClick={toggleBackground}>
        {background === "Clear" ? "Black" : "Clear"}
      </button>

      <button
        id={styles.Fullscreen}
        className={styles.Button}
        onClick={() => {
          setFullscreen(!fullscreen);
        }}
      >
        Fullscreen
      </button>
    </div>
  );
};
