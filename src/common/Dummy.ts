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
  return arr;
};
export const conveyor = conveyor_arr();
