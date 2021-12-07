// https://adventofcode.com/2021/day/3

import input from "./input";

function getGamma(input) {
  const { length } = input[0];
  const result = [];
  for (let i = 0; i < length; i++) {
    const bits = getBitsAtPosition(input, i);
    result.push(mostCommon(bits));
  }
  return result.join("");
}

function getEpsilon(input) {
  const { length } = input[0];
  const result = [];
  for (let i = 0; i < length; i++) {
    const bits = getBitsAtPosition(input, i);
    result.push(leastCommon(bits));
  }
  return result.join("");
}

function getOxygenRating(input) {
  const { length } = input[0];
  let filtered = [...input];
  for (let i = 0; i < length; i++) {
    const bits = getBitsAtPosition(filtered, i);
    const common = mostCommon(bits);
    filtered = filtered.filter((num) => num[i] === "" + common);
    if (filtered.length === 1) return filtered[0];
  }
  return filtered[0];
}

function getCO2Rating(input) {
  const { length } = input[0];
  let filtered = [...input];
  for (let i = 0; i < length; i++) {
    const bits = getBitsAtPosition(filtered, i);
    const common = leastCommon(bits);
    filtered = filtered.filter((num) => num[i] === "" + common);
    if (filtered.length === 1) return filtered[0];
  }
  return filtered[0];
}

function getBitsAtPosition(input, i) {
  return input.map((n) => n[i]);
}

function getCount(bits) {
  return bits.reduce(
    (acc, bit) => {
      if (bit === "0") acc[0]++;
      else acc[1]++;
      return acc;
    },
    { 0: 0, 1: 0 }
  );
}

function mostCommon(bits) {
  const count = getCount(bits);
  return count[0] > count[1] ? 0 : 1;
}

function leastCommon(bits) {
  const count = getCount(bits);
  return count[0] > count[1] ? 1 : 0;
}

function binaryToDecimal(binary) {
  return binary
    .split("")
    .reverse()
    .reduce((sum, _bit, i) => sum + Number(_bit) * Math.pow(2, i), 0);
}

export default () => {
  const o2 = binaryToDecimal(getOxygenRating(input));
  const co2 = binaryToDecimal(getCO2Rating(input));
  return o2 * co2;
};
