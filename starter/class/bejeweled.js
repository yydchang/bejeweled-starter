const Screen = require("./screen");
const Cursor = require("./cursor");
const {
  returnMatches,
  clearMatches,
  dropItems,
  fillGrid,
  hasValidMoves,
} = require("../helpers/helpers");

class Bejeweled {
  constructor() {
    this.options = ["🥝", "🍓", "🥥", "🍇", "🍊"];

    // Initialize grid
    Screen.initialize(8, 8);
    this.grid = Screen.grid;
    Screen.setGridlines(false);
    fillGrid(this.grid, this.options);

    // Initialize cursor
    this.cursor = new Cursor(8, 8);
    this.cursor.setBackgroundCursorColor();
    Screen.render();

    // Initialize commands
    Screen.addCommand("up", "move up", this.cursor.up.bind(this.cursor));
    Screen.addCommand("down", "move down", this.cursor.down.bind(this.cursor));
    Screen.addCommand("left", "move left", this.cursor.left.bind(this.cursor));
    Screen.addCommand(
      "right",
      "move right",
      this.cursor.right.bind(this.cursor)
    );
    Screen.addCommand("space", "select", this.cursor.select.bind(this.cursor));
    Screen.addCommand("return", "check for matches", () =>
      Bejeweled.checkForMatches(Screen.grid, this.options)
    );
  }

  static checkForMatches(grid, options) {
    Screen.setMessage("");
    let matches = returnMatches(grid);
    if (matches.length === 0) {
      Screen.setMessage("Your swap didn't make any matches. Try again.");
    } else {
      Bejeweled.endGame();
    }
    Screen.render();
  }

  static endGame() {
    Screen.setMessage("");
    Screen.setMessage("No more swaps are possible. Game over.");
    Screen.render();
    Screen.quit();
  }
}

module.exports = Bejeweled;
