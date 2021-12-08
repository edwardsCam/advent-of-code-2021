// https://adventofcode.com/2021/day/5

import input from "./input";

const parsePair = (str) => str.split(",").map(Number);

const parseLine = (str) => {
  const i = str.indexOf(" -> ");
  const p1 = parsePair(str.substr(0, i));
  const p2 = parsePair(str.substr(i + 4));
  return [p1, p2];
};

const pointsAlongLine = ([p1, p2]) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const result = [];
  if (x1 === x2) {
    // horizontal
    const diff = Math.abs(y2 - y1) + 1;
    const min = Math.min(y1, y2);
    for (let i = 0; i < diff; i++) {
      const y = min + i;
      result.push([x1, y]);
    }
  } else if (y1 === y2) {
    // vertical
    const diff = Math.abs(x2 - x1) + 1;
    const min = Math.min(x1, x2);
    for (let i = 0; i < diff; i++) {
      const x = min + i;
      result.push([x, y1]);
    }
  } else {
    // diagonal
    const xDir = x1 > x2 ? -1 : 1;
    const yDir = y1 > y2 ? -1 : 1;
    const diff = Math.abs(x2 - x1) + 1;
    for (let i = 0; i < diff; i++) {
      const x = x1 + i * xDir;
      const y = y1 + i * yDir;
      result.push([x, y]);
    }
  }
  return result;
};

const getMaxX = (lines) =>
  lines.reduce(
    (max, line) =>
      Math.max(
        max,
        line.reduce((lineMax, [x]) => Math.max(lineMax, x), 0)
      ),
    0
  ) + 1;

const getMaxY = (lines) =>
  lines.reduce(
    (max, line) =>
      Math.max(
        max,
        line.reduce((lineMax, [_x, y]) => Math.max(lineMax, y), 0)
      ),
    0
  ) + 1;

const buildDiagram = (lines) => {
  const diagram = [];
  const maxX = getMaxX(lines);
  const maxY = getMaxY(lines);
  for (let r = 0; r < maxY; r++) {
    diagram.push([]);
    for (let c = 0; c < maxX; c++) {
      diagram[r].push(0);
    }
  }
  lines.forEach((line) => {
    line.forEach(([x, y]) => {
      diagram[y][x]++;
    });
  });
  return diagram;
};

const countOverlaps = (diagram) =>
  diagram.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, num) => (num > 1 ? rowCount + 1 : rowCount), 0),
    0
  );

export default () => {
  const lines = input
    .map(parseLine)
    .map(pointsAlongLine)
    .filter((arr) => arr.length);
  const diagram = buildDiagram(lines);
  return countOverlaps(diagram);
};
