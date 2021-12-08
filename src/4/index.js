// https://adventofcode.com/2021/day/4

import { nums as n, boards as b } from "./input";

class Board {
  constructor(nums) {
    this.board = nums.map((num) => new Tile(num));
    this.won = false;
  }

  size() {
    return Math.sqrt(this.board.length);
  }

  draw(x) {
    if (this.won) return;
    this.board.forEach((tile) => {
      if (tile.value() === x) {
        tile.mark();
      }
    });
    if (this.checkForBingo()) {
      this.won = true;
      return true;
    }
    return false;
  }

  checkForBingo() {
    const size = this.size();
    for (let r = 0; r < size; r++) {
      if (this.checkRow(r)) return true;
    }
    for (let c = 0; c < size; c++) {
      if (this.checkCol(c)) return true;
    }
    if (this.checkDiag1()) return true;
    if (this.checkDiag2()) return true;
    return false;
  }

  checkRow(r) {
    const size = this.size();
    for (let c = 0; c < size; c++) {
      if (!this.getTileAt(r, c).isMarked()) return false;
    }
    return true;
  }

  checkCol(c) {
    const size = this.size();
    for (let r = 0; r < size; r++) {
      if (!this.getTileAt(r, c).isMarked()) return false;
    }
    return true;
  }

  checkDiag1() {
    const size = this.size();
    for (let i = 0; i < size; i++) {
      if (!this.getTileAt(i, i).isMarked()) return false;
    }
  }

  checkDiag2() {
    const size = this.size();
    for (let i = 0; i < size; i++) {
      if (!this.getTileAt(i, size - (i + 1)).isMarked()) return false;
    }
  }

  getTileAt(r, c) {
    const i = r * this.size() + c;
    return this.board[i];
  }

  getScore(winningNumber) {
    const sum = this.board.reduce((sum, tile) => {
      return tile.isMarked() ? sum : sum + tile.value();
    }, 0);
    return sum * winningNumber;
  }
}

class Tile {
  constructor(num) {
    this.num = num;
    this.marked = false;
  }

  mark() {
    this.marked = true;
  }

  isMarked() {
    return this.marked;
  }

  value() {
    return this.num;
  }
}

export default () => {
  const boards = b.map((nums) => new Board(nums));

  let winners = [];
  for (let i = 0; i < n.length; i++) {
    const num = n[i];
    const unwon = boards.filter((board) => !board.won);
    const board = unwon.filter((board) => board.draw(num))[0];
    if (board) {
      winners.push({
        board,
        num,
      });
    }
  }

  if (winners.length) {
    const lastBoard = winners[winners.length - 1];
    return lastBoard.board.getScore(lastBoard.num);
  }
};
