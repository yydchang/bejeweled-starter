const Screen = require("./screen");
const { returnMatches } = require("../helpers/helpers");

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
      !(
        ((this.row === this.selectedRow - 1 ||
          this.row === this.selectedRow + 1) &&
          this.col === this.selectedCol) ||
        (this.row === this.selectedRow &&
          (this.col === this.selectedCol + 1 ||
            this.col === this.selectedCol - 1))
      )
    ) {
      // deselect if second selection is not adjacent to the first selection
      this.resetBackgroundSelectedColor();
      this.selectedRow = null;
      this.selectedCol = null;
      Screen.setMessage(
        "Second selection was not adjacent to first selection. Please try again."
      );
    } else if (
      Screen.grid[this.selectedRow][this.selectedCol] ===
      Screen.grid[this.row][this.col]
    ) {
      // deselect if user selects spaces with the same content
      this.resetBackgroundSelectedColor();
      this.selectedRow = null;
      this.selectedCol = null;
      Screen.setMessage(
        "Second selection has the same item as the first selection. Please try again."
      );
    } else {
      // make a swap
      this.resetBackgroundSelectedColor();
      const temp = Screen.grid[this.selectedRow][this.selectedCol];
      Screen.grid[this.selectedRow][this.selectedCol] =
        Screen.grid[this.row][this.col];
      Screen.grid[this.row][this.col] = temp;

      if (returnMatches(Screen.grid).length > 0) {
        // if swap does result in matches, get ready to check for matches
        this.selectedRow = null;
        this.selectedCol = null;
        Screen.setMessage(
          "You've made a swap! Hit the `Enter` key to check for matches."
        );
      } else {
        // if swap does not result in matches, swap back
        const temp = Screen.grid[this.selectedRow][this.selectedCol];
        Screen.grid[this.selectedRow][this.selectedCol] =
          Screen.grid[this.row][this.col];
        Screen.grid[this.row][this.col] = temp;
        this.selectedRow = null;
        this.selectedCol = null;
        Screen.setMessage("You didn't make a match. Try again.");
      }
    }
    this.setBackgroundSelectedColor();
    Screen.render();
  }
}


module.exports = Cursor;
