// 물체
export const object = [
  { x: 170, y: 130 },
  { x: 170, y: 170 },
  { x: 170, y: 210 },
  { x: 170, y: 250 },
  { x: 170, y: 290 },
  { x: 170, y: 330 },
  { x: 170, y: 370 },
  { x: 210, y: 370 },
  { x: 250, y: 370 },
  { x: 290, y: 370 },
  { x: 330, y: 370 },
  { x: 370, y: 370 },
  { x: 410, y: 370 },
  { x: 410, y: 410 },
  { x: 410, y: 450 },
  { x: 410, y: 490 },
  { x: 410, y: 530 },
  { x: 410, y: 570 },
  { x: 410, y: 610 },
  { x: 410, y: 650 },
];

// 지우기
const path_arr = () => {
  const arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push({ x: 152, y: 112 + i * 40, w: 35, h: 35 });
  }
  for (let i = 1; i < 7; i++) {
    arr.push({ x: 152 + i * 40, y: arr[6].y, w: 35, h: 35 });
  }
  for (let i = 1; i < 9; i++) {
    arr.push({
      x: arr[12].x,
      y: arr[12].y + i * 40,
      w: 35,
      h: 35,
    });
  }
  console.log(arr);
  return arr;
};
export const path = path_arr();

// 시작지점
export const conveyor_start = { x: 120, y: 50, w: 100, h: 100, val: 1000 };

// 종료지점
export const conveyor_end = { x: 360, y: 630, w: 100, h: 100, val: 2000 };

// 컨베어
const conveyor_arr = () => {
  const arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push({ x: 150, y: 150 + i * 40, w: 40, h: 40, val: i });
  }
  for (let i = 1; i < 7; i++) {
    arr.push({ x: 150 + i * 40, y: arr[5].y, w: 40, h: 40, val: i + 5 });
  }
  for (let i = 1; i < 7; i++) {
    arr.push({
      x: arr[11].x,
      y: arr[11].y + i * 40,
      w: 40,
      h: 40,
      val: i + 11,
    });
  }

  console.log(arr);
  return arr;
};
export const conveyor = conveyor_arr();
