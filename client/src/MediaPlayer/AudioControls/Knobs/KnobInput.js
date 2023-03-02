import { useState } from "react";

export const MyKnob = ({ degrees }) => {
  const offSet = 360 - degrees;
  const startDegree = 360 - degrees - offSet;
  const minDegree = 360 / 2 - offSet / 2;
  const maxDegree = 360 / 2 + offSet / 2;

  const [currentDegree, setCurrentDegree] = useState(startDegree);

  const moveHandler = (event) => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;

    const mouseXCoordinate = event.clientX;
    const mouseYCoordinate = event.clientY;
    // The difference between the window width and the mouse x-coordinate and
    // the same for mouse y coordinate and window height
    const deltaX = width - mouseXCoordinate;
    const deltaY = height - mouseYCoordinate;

    // Represents the mouses position on the screen in radians. pmA radian is the
    // angle made when the radius - the distance between the center of a circle
    // and its circumference - is wrapped round the perimeter of the circle
    const radian = Math.atan2(deltaY, deltaX);

    // 1 Radian is about 57.2958... degrees. A semi cirlce, which is 180 degrees,
    // is 3.1416.. radians or in other words PI.
    // The above only works up to 180 degrees
    let radians = Math.round(radian * (180 / Math.PI));
    const finalValue = radians < 0 ? (radians + 360) % 360 : radians;
    if (finalValue > minDegree && finalValue < maxDegree) return;
    setCurrentDegree(finalValue);
  };

  const handleDrag = () => {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", moveHandler);
    });
  };

  const style = {
    transform: `rotate(${currentDegree}deg)`,
  };

  return (
    <div className="square">
      <div className="circle" onMouseDown={handleDrag} style={style}>
        <div className="inner-circle" />
      </div>
    </div>
  );
};
