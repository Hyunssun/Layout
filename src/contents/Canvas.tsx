/**
 * @name Canvas
 * @function
 * @description Canvas Function Components
 * @return {void}
 */

import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStart } from "../common/Start";
import {
  conveyor,
  conveyor_end,
  conveyor_start,
  object,
  path,
} from "../common/Dummy";

const WIDTH = 600;
const HEIGHT = 900;

export const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [value, setValue] = useState({
    name: "",
    value: "",
  });

  // redux
  const dispatch = useDispatch();
  const start: boolean = useSelector(
    (state: { start: boolean }) => state.start
  );
  const onClickStart = () => {
    dispatch(setStart(!start));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

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
      conveyor.map((item: any, index: number) => {
        if (
          mouseX >= item.x &&
          mouseX <= item.x + item.w &&
          mouseY >= item.y &&
          mouseY <= item.y + item.h
        ) {
          setValue({ ...value, name: `Conveyor ${index}`, value: item.val });
        }
      });

      // 시작지점 클릭
      if (
        mouseX >= conveyor_start.x &&
        mouseX <= conveyor_start.x + conveyor_start.w &&
        mouseY >= conveyor_start.y &&
        mouseY <= conveyor_start.y + conveyor_start.h
      ) {
        setValue({
          ...value,
          name: `Conveyor Start`,
          value: conveyor_start.val.toString(),
        });
      }

      // 종료지점 클릭
      if (
        mouseX >= 360 &&
        mouseX <= conveyor_end.x + conveyor_end.w &&
        mouseY >= conveyor_end.y &&
        mouseY <= conveyor_end.y + conveyor_end.h
      ) {
        setValue({
          ...value,
          name: `Conveyor End`,
          value: conveyor_end.val.toString(),
        });
      }
    };

    let i = 0;
    setInterval(() => {
      if (i === path.length - 1) {
        // 종료지점 지우기
        context.clearRect(
          path[i - 1].x,
          path[i - 1].y,
          path[i - 1].w,
          path[i - 1].h
        );
        return;
      }

      // 지우기
      if (i > 0) {
        context.clearRect(
          path[i - 1].x,
          path[i - 1].y,
          path[i - 1].w,
          path[i - 1].h
        );
      }

      // 물체
      context.beginPath();
      context.arc(object[i].x, object[i].y, 15, 0, 2 * Math.PI);
      context.fillStyle = "green";
      context.fill();
      i++;
    }, 500);
    canvas.addEventListener("click", handleCanvasClick);
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [start]);

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ backgroundColor: "black" }}
      />
      <div className="container_right">
        <div className="info">
          <h2>Information</h2>
          <br />
          <p>Name: {value.name}</p>
          <p>Number: {value.value}</p>
        </div>
        <button onClick={onClickStart}>Start</button>
      </div>
    </div>
  );
};
