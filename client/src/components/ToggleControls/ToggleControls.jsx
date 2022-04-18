const ToggleConrols = ({
  background,
  mode,
  toggleBackground,
  toggleMicrophone,
  toggleVisualiser,
  visualisers,
  visualiserIndex,
}) => {
  return (
    <>
      <button className="toggle-button" onClick={toggleMicrophone}>
        {mode === "microphone" ? "Stop microphone" : "Use microphone"}
      </button>

      <button className="toggle-button" onClick={toggleVisualiser}>
        {visualisers[visualiserIndex]}
      </button>

      <button className="toggle-button" onClick={toggleBackground}>
        {background === "Clear" ? "Black" : "Clear"}
      </button>
    </>
  );
};

export default ToggleConrols;
