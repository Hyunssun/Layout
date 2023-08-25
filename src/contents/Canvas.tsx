/**
 * @name Canvas
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef } from "react";

const WIDTH = 1800;
const HEIGHT = 900;

export const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ backgroundColor: "black" }}
      />
    </div>
  );
};
