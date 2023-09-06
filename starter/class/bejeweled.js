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
    Screen.setGridlines(false);
    fillGrid(Screen.grid, this.options);
    while (returnMatches(Screen.grid).length > 0) {
      Screen.grid = clearMatches(Screen.grid);
      Screen.grid = dropItems(Screen.grid);
      Screen.grid = fillGrid(Screen.grid, this.options);
    }

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
    while (returnMatches(grid).length > 0) {
      // clear matches
      // highlight matches
      // gain points for each match
      grid = clearMatches(grid);

      // drop items
      grid = dropItems(grid);

      // fill grid
      grid = fillGrid(grid, options);
    }
    if (!hasValidMoves(grid)) {
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
