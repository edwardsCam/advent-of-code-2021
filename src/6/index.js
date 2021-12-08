// https://adventofcode.com/2021/day/6

import input from "./input";

const buildHash = (fish) =>
  fish.reduce((hash, counter) => {
    if (hash[counter] == null) hash[counter] = 0;
    hash[counter]++;
    return hash;
  }, {});

class School {
  constructor(fish) {
    this.fish = buildHash(fish);
  }

  tick() {
    const newHash = {};
    Object.entries(this.fish).forEach(([_clock, count]) => {
      const clock = Number(_clock);
      if (clock === 0) {
        newHash[6] = (newHash[6] || 0) + count;
        newHash[8] = count;
      } else {
        newHash[clock - 1] = (newHash[clock - 1] || 0) + count;
      }
    });
    this.fish = newHash;
  }

  tickN(n) {
    for (let i = 0; i < n; i++) {
      this.tick();
    }
  }

  size() {
    return Object.values(this.fish).reduce((size, count) => size + count, 0);
  }
}

export default () => {
  const school = new School(input);
  school.tickN(256);
  return school.size();
};
