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
} from "../common/Dummy";
import { valueType } from "../common/Type";

const WIDTH = 600;
const HEIGHT = 850;

export const Canvas = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();
  const start: boolean = useSelector(
    (state: { start: boolean }) => state.start
  );
  const [conveyor_arr, setConveyor_arr] = useState<any>(conveyor.concat());
  const [value, setValue] = useState<valueType>({
    type: "",
    value: "",
    state: "",
  });

  // start 버튼 클릭 시 redux 값 변경
  const onClickStart = () => {
    dispatch(setStart(!start));
  };

  // open 버튼 클릭 시 상태 open
  const onClickOpen = (val: any) => {
    const arr = conveyor_arr.map((item: any) =>
      item.val === val ? { ...item, state: "open" } : item
    );
    setConveyor_arr(arr);
    setValue({ ...value, state: "open" });
  };
  // close 버튼 클릭 시 상태 close
  const onClickClose = (val: any) => {
    const arr = conveyor_arr.map((item: any) =>
      item.val === val ? { ...item, state: "close" } : item
    );
    setConveyor_arr(arr);
    setValue({ ...value, state: "close" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // 클릭 이벤트
    const handleCanvasClick = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // 컨베어 클릭
      conveyor_arr.map((item: any) => {
        if (
          mouseX >= item.x &&
          mouseX <= item.x + item.w &&
          mouseY >= item.y &&
          mouseY <= item.y + item.h
        ) {
          setValue({
            ...value,
            type: `Conveyor`,
            value: item.val,
            state: item.state,
          });
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
          type: `Conveyor Start`,
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
          type: `Conveyor End`,
          value: conveyor_end.val.toString(),
        });
      }
    };

    // 컨베어
    context.lineWidth = 2;
    conveyor_arr.map((item: any) => {
      if (item.state === "open") {
        context.strokeStyle = "white";
        context.strokeRect(item.x, item.y, item.w, item.h);
      } else {
        context.strokeStyle = "gray";
        context.strokeRect(item.x, item.y, item.w, item.h);
      }
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

    canvas.addEventListener("click", handleCanvasClick);
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [conveyor_arr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let i = 0;
    setInterval(() => {
      // 물체 클릭
      canvas.addEventListener("click", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        if (
          mouseX >= object[i - 1].x - 20 &&
          mouseX <= object[i - 1].x + 20 &&
          mouseY >= object[i - 1].y - 20 &&
          mouseY <= object[i - 1].y + 20
        ) {
          setValue({
            ...value,
            type: `Object`,
            value: `(${object[i - 1].x}, ${object[i - 1].y})`,
            state: object[i - 1].state.toString(),
          });
        }
      });

      // 종료지점 지우기
      if (i === object.length) {
        context.clearRect(
          object[i - 1].x - 18,
          object[i - 1].y - 18,
          object[i - 1].w,
          object[i - 1].h
        );
        return;
      }
      // 지우기
      if (i > 0) {
        context.clearRect(
          object[i - 1].x - 18,
          object[i - 1].y - 18,
          object[i - 1].w,
          object[i - 1].h
        );
      }

      // 물체
      context.beginPath();
      context.arc(object[i].x, object[i].y, 15, 0, 2 * Math.PI);
      context.fillStyle = "green";
      context.fill();

      // 물체의 좌표가 같다면
      if (i > 0) {
        if (
          object[i].x === object[i - 1].x &&
          object[i].y === object[i - 1].y
        ) {
          context.beginPath();
          context.arc(object[i].x, object[i].y, 15, 0, 2 * Math.PI);
          context.fillStyle = "red";
          context.fill();
        }
      }
      i++;
    }, 500);
  }, [start]);

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="container_left"
        style={{ backgroundColor: "black" }}
      />
      <div className="container_right">
        <div className="info">
          <h2>Information</h2>
          <br />
          <p>＊ Type: {value.type}</p>
          <p>＊ Value: {value.value}</p>
          <p>＊ State: {value.state}</p>
        </div>

        {value.type === "Conveyor" && (
          <div className="conveyor_state">
            <button
              className="conveyor_open"
              onClick={() => {
                onClickOpen(value.value);
              }}
            >
              Open
            </button>
            <button
              className="conveyor_close"
              onClick={() => {
                onClickClose(value.value);
              }}
            >
              Close
            </button>
          </div>
        )}

        <button className="object_start" onClick={onClickStart}>
          Start
        </button>
      </div>
    </div>
  );
};
