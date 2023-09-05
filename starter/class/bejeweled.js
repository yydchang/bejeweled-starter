const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {
  constructor() {
    // Initialize this
    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    this.grid = Screen.grid;

    Screen.setGridlines(false);

    this.cursor.setBackgroundCursorColor();
    Screen.render();
  }

  static checkForMatches(grid) {
    // Fill this in
  }
}

module.exports = Bejeweled;
