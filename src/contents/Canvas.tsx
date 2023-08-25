/**
 * @name Canvas
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef, useEffect } from "react";
import { conveyor, conveyor_end, conveyor_start } from "../common/Dummy";

const WIDTH = 1800;
const HEIGHT = 900;

export const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // 컨베어
        context.strokeStyle = "gray";
        context.lineWidth = 2;
        conveyor.map((item: any) => {
          context.strokeRect(item.x, item.y, item.w, item.h);
        });

        // 시작지점
        context.strokeStyle = "blue";
        context.lineWidth = 2;
        context.strokeRect(
          conveyor_start.x,
          conveyor_start.y,
          conveyor_start.w,
          conveyor_start.h
        );

        // 종료지점
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(
          conveyor_end.x,
          conveyor_end.y,
          conveyor_end.w,
          conveyor_end.h
        );

        // 클릭 이벤트
        const handleCanvasClick = (event: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          // 컨베어 클릭
          conveyor.map((item: any) => {
            if (
              mouseX >= item.x &&
              mouseX <= item.x + item.w &&
              mouseY >= item.y &&
              mouseY <= item.y + item.h
            ) {
              console.log("conveyor", item.val);
            }
          });

          // 시작지점 클릭
          if (
            mouseX >= conveyor_start.x &&
            mouseX <= conveyor_start.x + conveyor_start.w &&
            mouseY >= conveyor_start.y &&
            mouseY <= conveyor_start.y + conveyor_start.h
          ) {
            console.log("conveyor_start", conveyor_start.val);
          }

          // 종료지점 클릭
          if (
            mouseX >= 360 &&
            mouseX <= conveyor_end.x + conveyor_end.w &&
            mouseY >= conveyor_end.y &&
            mouseY <= conveyor_end.y + conveyor_end.h
          ) {
            console.log("conveyor_end", conveyor_end.val);
          }
        };

        canvas.addEventListener("click", handleCanvasClick);

        return () => {
          canvas.removeEventListener("click", handleCanvasClick);
        };
      }
    }
  }, []);

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
