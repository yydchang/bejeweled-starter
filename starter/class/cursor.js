const Screen = require("./screen");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.selectedRow = null;
    this.selectedCol = null;

    this.gridColor = "black";
    this.cursorColor = "yellow";
    this.selectedColor = "white";
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundCursorColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  setBackgroundSelectedColor() {
    Screen.setBackgroundColor(this.row, this.col, this.selectedColor);
  }

  up() {
    if (this.row > 0) {
      this.row = this.row - 1;
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.row = this.row + 1;
    }
  }

  left() {
    if (this.col > 0) {
      this.col = this.col - 1;
    }
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.col = this.col + 1;
    }
  }

  select() {
    // Fill this out
  }
}


module.exports = Cursor;
