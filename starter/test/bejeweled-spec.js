const { expect } = require('chai');
const Screen = require("../class/screen");
const Bejeweled = require("../class/bejeweled.js");
const { returnMatches } = require("../helpers/helpers.js");

describe("Bejeweled", function () {
  let bejeweled;
  let grid;
  let options;

  // Add tests for setting up a basic board

  describe("board", function () {
    bejeweled = new Bejeweled();

    it("creates an instance of Bejeweled", function () {
      expect(bejeweled).to.exist;
    });

    it("initializes a 8x8 grid", function () {
      expect(Screen.grid).to.have.a.lengthOf(8);
      expect(Screen.grid[0]).to.have.a.lengthOf(8);
    });
  });

  describe("check for swaps", function () {
    it("matches three in a row continuously until the grid has no more matches left", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🍇", "🍇", "🍇", "🍇", "🥝", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      options = ["zero", "one", "two", "three"];

      // Bejeweled.checkForMatches(grid, options);
      expect(returnMatches(grid)).to.be.empty;
    });

    it("ends the game when no valid moves are left", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🔥", "☺️", "😚", "🧮"],
        ["✈️", "🩹", "🎟", "🧑🏼", "🚡", "🛬", "🛫", "⏰"],
        ["⚗️", "👽", "🚑", "👾", "🏺", "🏈", "🛏", "🐝"],
        ["🪲", "🧗🏼", "🍺", "🏛", "🔃", "📀", "⭐️", "✡️"],
        ["🕡", "👔", "➡️", "🫱🏼", "⭐️", "↙️", "🗳", "📫"],
        ["⚗️", "👽", "🚑", "👾", "🏺", "🏈", "🛏", "🐝"],
        ["🪲", "🧗🏼", "🍺", "🏛", "🔃", "📀", "⭐️", "✡️"],
        ["🕡", "👔", "➡️", "🫱🏼", "⭐️", "↙️", "🗳", "📫"],
      ];
      options = ["new"];
      // Bejeweled.checkForMatches(grid, options);
      expect(Screen.message).to.equal("No more swaps are possible. Game over.");
    });
  });
});
