// https://adventofcode.com/2021/day/1

import input from "./input";

function getMeasurementChanges(readings) {
  return readings.reduce((list, reading, i) => {
    if (i > 0) {
      const prev = readings[i - 1];
      if (prev > reading) list.push(-1);
      else if (prev < reading) list.push(1);
      else list.push(0);
    }
    return list;
  }, []);
}

function countIncreases(changes) {
  return changes.reduce((count, change) => {
    if (change === 1) count++;
    return count;
  }, 0);
}

function getSlidingWindows(readings) {
  const windows = [];
  for (let i = 0; i < readings.length; i++) {
    windows.push(readings.slice(i, i + 3));
  }
  return windows;
}

export default () => {
  const windows = getSlidingWindows(input);
  const sums = windows.reduce((sums, window) => {
    const sum = window.reduce((acc, val) => acc + val, 0);
    sums.push(sum);
    return sums;
  }, []);
  return countIncreases(getMeasurementChanges(sums));
};
