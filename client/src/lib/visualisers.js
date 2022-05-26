export const renderFrequency = (
  analyser,
  background,
  canvas,
  context,
  frequencyData
) => {
  if (background === "Clear") {
    context.fillStyle = "#67b9a9";
  } else {
    context.fillStyle = "#000000";
  }

  context.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / analyser.frequencyBinCount) * 2.5;
  let barHeight;
  let x = 0;

  for (var i = 0; i < analyser.frequencyBinCount; i++) {
    // the height of a bar equals the current audio sample value halved
    barHeight = frequencyData[i] * 2.75;
    const red = (i * barHeight) / 20;
    const green = i * 4;
    const blue = barHeight / 2;
    context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    context.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }
};

export const renderWaveform = (background, canvas, context, waveformData) => {
  const randomColour = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  if (background === "Clear") {
    context.fillStyle = "#67b9a9";
  } else {
    // context.fillStyle = "#000000";
  }

  let x = 0;

  const sliceWidth = canvas.width / waveformData.length;

  //   context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 2;
  context.strokeStyle = randomColour;

  context.beginPath();
  context.moveTo(0, canvas.height / 2);

  for (const item of waveformData) {
    const y = (item / 255.0) * canvas.height;
    context.lineTo(x, y);
    x += sliceWidth;
  }

  context.lineTo(x, canvas.height / 2);
  context.stroke();
};
