const Screen = require("./screen");
const Cursor = require("./cursor");
const helpers = require("../helpers/helpers");
const {
  returnMatches,
  clearMatches,
  dropItems,
  explodeMatches,
  fillGrid,
  hasValidMoves,
} = helpers;

class Bejeweled {
  constructor() {
    this.options = ["🥝", "🍓", "🥥", "🍇", "🍊"];
    this.totalScore = 0;
    this.moveScore = 0;
    this.comboCount = 0;
    this.baseValue = 10;

    // Initialize grid
    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    fillGrid(Screen.grid, this.options);
    while (returnMatches(Screen.grid).length > 0) {
      const matches = returnMatches(Screen.grid);
      Screen.grid = clearMatches(matches, Screen.grid);
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
    Screen.addCommand(
      "return",
      "check for matches",
      async () => Bejeweled.handleMove.bind(this)(Screen.grid, this.options) // use bind to return a function that remembers that "this" is the instance of Bejeweled instead of the calling code in Screen
    );
  }

  // score matches function definition
  static scoreMatches(matches, baseValue, comboCount) {
    let allMatchesScore = 0;

    for (const match of matches) {
      const lengthScore = (match.length - 2) * baseValue;
      const comboBonus = comboCount * baseValue;
      const matchScore = lengthScore + comboBonus;
      allMatchesScore += matchScore;
      comboCount++;
    }

    return [allMatchesScore, comboCount];
  }

  static async handleMove(grid, options) {
    Screen.setMessage(`Total Score: ${this.totalScore}`);

    // process move
    while (returnMatches(grid).length > 0) {
      const matches = returnMatches(grid);

      // call score matches function
      const [allMatchesScore, currentComboCount] = Bejeweled.scoreMatches(
        matches,
        this.baseValue,
        this.comboCount
      );

      this.comboCount = currentComboCount;
      this.moveScore += allMatchesScore;

      // explode matches
      grid = explodeMatches(matches, grid);
      Screen.setMessage(`Total Score: ${this.totalScore} +${this.moveScore}`);
      Screen.render();

      // clear matches
      await helpers.sleep(500);

      grid = clearMatches(matches, grid);
      Screen.render();

      // drop items
      await helpers.sleep(500);
      grid = dropItems(grid);
      Screen.render();

      // fill grid
      await helpers.sleep(500);
      grid = fillGrid(grid, options);
      Screen.render();
    }

    // handle points
    this.totalScore += this.moveScore;
    this.moveScore = 0;
    this.comboCount = 0;

    Screen.setMessage(`Total Score: ${this.totalScore}`);
    Screen.render();

    // check if game is still playable
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
