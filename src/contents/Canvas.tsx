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
  const imageRef = useRef<HTMLImageElement | null>(null);

  const dispatch = useDispatch();
  const start: boolean = useSelector(
    (state: { start: boolean }) => state.start
  );

  const [conveyorArr, setConveyorArr] = useState<any>(conveyor.concat());
  const [value, setValue] = useState<valueType>({
    type: "",
    value: "",
    state: "",
  });
  const [imageChange, setImageChange] = useState<boolean>(false);

  // start 버튼 클릭 시 redux 값 변경
  const onClickStart = () => {
    dispatch(setStart(!start));
  };
  // change 버튼 클릭 시 image 변경
  const onClickChange = () => {
    setImageChange(!imageChange);
  };

  // open 버튼 클릭 시 상태 open
  const onClickOpen = (val: any) => {
    const arr = conveyorArr.map((item: any) =>
      item.val === val ? { ...item, state: "open" } : item
    );
    setConveyorArr(arr);
    setValue({ ...value, state: "open" });
  };

  // close 버튼 클릭 시 상태 close
  const onClickClose = (val: any) => {
    const arr = conveyorArr.map((item: any) =>
      item.val === val ? { ...item, state: "close" } : item
    );
    setConveyorArr(arr);
    setValue({ ...value, state: "close" });
  };

  const imageWidth = 50;
  const imageHeight = 50;
  let currentPosition = 0;
  let percent = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const image = imageRef.current;
    if (!image) return;

    const animation = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 컨베어
      context.lineWidth = 2;
      conveyorArr.map((item: any) => {
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

      // 현재 경로 노드의 좌표를 가져옴
      const currentobjectNode = object[currentPosition];
      const nextobjectNode = object[(currentPosition + 1) % object.length];

      // 다음 경로 노드와의 차이를 계산하여 움직이는 방향을 정함
      const dx = nextobjectNode.x - currentobjectNode.x;
      const dy = nextobjectNode.y - currentobjectNode.y;

      // 좌표
      let x = currentobjectNode.x + dx * percent;
      let y = currentobjectNode.y + dy * percent;

      context.drawImage(image, x, y, imageWidth, imageHeight);

      context.closePath();

      percent += 0.1;
      if (percent > 1) {
        percent = 0;
        currentPosition = (currentPosition + 1) % object.length;
      }

      if (object.length - 1 === currentPosition) {
        return;
      }

      // 클릭 이벤트
      const handleCanvasClick = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // 컨베어 클릭
        conveyorArr.map((item: any) => {
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

      canvas.addEventListener("click", handleCanvasClick);
      requestAnimationFrame(animation);
    };

    animation();
  }, [start, conveyorArr]);

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="container_left"
        style={{ backgroundColor: "black" }}
      />

      <img
        ref={imageRef}
        src={imageChange ? "image/lion1.png" : "image/lion2.png"}
        alt="Image"
        style={{ display: "none" }}
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
        <button className="object_change" onClick={onClickChange}>
          Change
        </button>
        <button className="object_start" onClick={onClickStart}>
          Start
        </button>
      </div>
    </div>
  );
};
