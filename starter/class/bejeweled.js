const Screen = require("./screen");
const Cursor = require("./cursor");
const { returnMatches, fillGrid } = require("../helpers/helpers");

class Bejeweled {
  constructor() {
    const options = ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇"];

    // Initialize grid
    Screen.initialize(8, 8);
    this.grid = Screen.grid;
    Screen.setGridlines(false);
    fillGrid(this.grid, options);

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
    Screen.addCommand(
      "enter",
      "check for matches",
      Bejeweled.checkForMatches(Screen.grid)
    );
  }

  static checkForMatches(grid) {
    const matches = returnMatches(grid);
    return matches;
  }
}

module.exports = Bejeweled;
