const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {
  constructor() {
    this.playerTurn = "O";

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

  static clearMatches(grid) {
    // Fill this in
  }

  static dropItems(grid) {
    // Fill this in
  }

  static fillGrid(grid) {
    // Fill this in
  }

  static checkForValidMoves(grid) {
    // Fill this in
  }
}

module.exports = Bejeweled;
