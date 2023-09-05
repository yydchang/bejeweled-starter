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

  resetBackgroundCursorColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundCursorColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  resetBackgroundSelectedColor() {
    Screen.setBackgroundColor(
      this.selectedRow,
      this.selectedCol,
      this.gridColor
    );
  }

  setBackgroundSelectedColor() {
    if (this.selectedRow && this.selectedCol) {
      Screen.setBackgroundColor(
        this.selectedRow,
        this.selectedCol,
        this.selectedColor
      );
    }
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundCursorColor();
      this.row--;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.resetBackgroundCursorColor();
      this.row++;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  left() {
    if (this.col > 0) {
      this.resetBackgroundCursorColor();
      this.col--;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.resetBackgroundCursorColor();
      this.col++;
      this.setBackgroundCursorColor();
      this.setBackgroundSelectedColor();
      Screen.render();
    }
  }

  select() {
    Screen.setMessage("");
    if (this.selectedRow === null && this.selectedCol === null) {
      // select space if no space is currently selected
      this.selectedRow = this.row;
      this.selectedCol = this.col;
    } else if (this.selectedRow === this.row && this.selectedCol === this.col) {
      // unselect space if user selects currently selected space
      this.resetBackgroundSelectedColor();
      this.selectedRow = null;
      this.selectedCol = null;
      this.setBackgroundCursorColor();
    } else if (
      // swap the contents of the selected space with the newly selected space
      ((this.row === this.selectedRow - 1 ||
        this.row === this.selectedRow + 1) &&
        this.col === this.selectedCol) ||
      (this.row === this.selectedRow &&
        (this.col === this.selectedCol + 1 ||
          this.col === this.selectedCol - 1))
    ) {
      this.resetBackgroundSelectedColor();
      const temp = Screen.grid[this.selectedRow][this.selectedCol];
      Screen.grid[this.selectedRow][this.selectedCol] =
        Screen.grid[this.row][this.col];
      Screen.grid[this.row][this.col] = temp;
      this.selectedRow = null;
      this.selectedCol = null;
    } else {
      // deselect any other space
      this.resetBackgroundSelectedColor();
      this.selectedRow = null;
      this.selectedCol = null;
      Screen.setMessage(
        "Second selection was not adjacent to first selection. Please try again."
      );
    }
    this.setBackgroundSelectedColor();
    Screen.render();
  }
}


module.exports = Cursor;
