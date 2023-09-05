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
    Screen.setBackgroundColor(
      this.selectedRow,
      this.selectedCol,
      this.selectedColor
    );
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundColor();
      this.row--;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.resetBackgroundColor();
      this.row++;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  left() {
    if (this.col > 0) {
      this.resetBackgroundColor();
      this.col--;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.resetBackgroundColor();
      this.col++;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  select() {
    if (this.selectedRow === null && this.selectedCol === null) {
      this.selectedRow = this.row;
      this.selectedCol = this.col;
    } else if (this.selectedRow === this.row && this.selectedCol === this.col) {
      this.selectedRow = null;
      this.selectedCol = null;
    } else if (
      ((this.row === this.selectedRow - 1 ||
        this.row === this.selectedRow + 1) &&
        this.col === this.selectedCol) ||
      (this.row === this.selectedRow &&
        (this.col === this.selectedCol + 1 ||
          this.col === this.selectedCol - 1))
    ) {
      const temp = Screen.grid[this.selectedRow][this.selectedCol];
      Screen.grid[this.selectedRow][this.selectedCol] =
        Screen.grid[this.row][this.col];
      Screen.grid[this.row][this.col] = temp;
      this.selectedRow = null;
      this.selectedCol = null;
    } else {
      this.selectedRow = null;
      this.selectedCol = null;
      Screen.setMessage(
        "Second selection is not adjacent to first selection. Please try again."
      );
    }
    this.setBackgroundSelectedColor();
    Screen.render();
  }
}


module.exports = Cursor;
