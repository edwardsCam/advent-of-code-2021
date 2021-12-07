// https://adventofcode.com/2021/day/2

import input from "./input";

class Submarine {
  constructor() {
    this.x = 0;
    this.depth = 0;
    this.aim = 0;
  }

  forward(amount) {
    this.x += amount;
    this.depth += this.aim * amount;
  }

  up(amount) {
    this.aim -= amount;
  }

  down(amount) {
    this.aim += amount;
  }

  followCommands(commands) {
    commands.forEach((command) => {
      if (command.startsWith("forward ")) {
        const val = Number(command.split("forward ")[1]);
        this.forward(val);
      } else if (command.startsWith("down ")) {
        const val = Number(command.split("down ")[1]);
        this.down(val);
      } else if (command.startsWith("up ")) {
        const val = Number(command.split("up ")[1]);
        this.up(val);
      }
    });
  }

  getState() {
    return {
      x: this.x,
      depth: this.depth,
    };
  }
}

export default () => {
  const sub = new Submarine();
  sub.followCommands(input);
  const { x, depth } = sub.getState();
  return x * depth;
};
