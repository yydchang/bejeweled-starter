const { expect } = require("chai");
const {
  returnMatches,
  clearMatches,
  dropItems,
  fillGrid,
  hasValidMoves,
} = require("../helpers/helpers");

describe("Helpers", function () {
  let grid;

  describe("swaps", function () {
    it("matches items vertically", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥥", "🍓", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      let matches = returnMatches(grid);
      expect(matches.length).to.equal(3);
      expect(matches).to.deep.include({ row: 0, col: 1 });
      expect(matches).to.deep.include({ row: 1, col: 1 });
      expect(matches).to.deep.include({ row: 2, col: 1 });
    });

    it("matches items horizontally", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🍇", "🍇", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      let matches = returnMatches(grid);
      expect(matches.length).to.equal(3);
      expect(matches).to.deep.include({ row: 6, col: 0 });
      expect(matches).to.deep.include({ row: 6, col: 1 });
      expect(matches).to.deep.include({ row: 6, col: 2 });
    });

    it("matches items horizontally and vertically", function () {
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
      let matches = returnMatches(grid);
      expect(matches).to.deep.include({ row: 4, col: 3 });
      expect(matches).to.deep.include({ row: 4, col: 4 });
      expect(matches).to.deep.include({ row: 5, col: 3 });
      expect(matches).to.deep.include({ row: 5, col: 4 });
      expect(matches).to.deep.include({ row: 6, col: 0 });
      expect(matches).to.deep.include({ row: 6, col: 1 });
      expect(matches).to.deep.include({ row: 6, col: 2 });
      expect(matches).to.deep.include({ row: 6, col: 3 });
      expect(matches).to.deep.include({ row: 6, col: 4 });
    });
  });

  describe("combos", function () {
    it("causes matches to disappear and become blank spots", function () {
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
      grid = clearMatches(grid);
      expect(grid).to.have.deep.ordered.members([
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", " ", " ", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", " ", " ", "🍇", "🥝", "🍓"],
        [" ", " ", " ", " ", " ", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ]);
    });

    it("has items fall to fill in the blank spots", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", " ", " ", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", " ", " ", "🍇", "🥝", "🍓"],
        [" ", " ", " ", " ", " ", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      grid = dropItems(grid);
      expect(grid).to.have.deep.ordered.members([
        [" ", " ", " ", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍇", "🍊", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍇", "🍊", "🍇", "🥝", "🍓"],
        ["🥥", "🍇", "🍊", "🍊", "🍇", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", "🍊", "🍇", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ]);
    });

    it("fills blank spots with new randomly chosen emojis", function () {
      grid = [
        [" ", " ", " ", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍇", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍇", "🍊", "🍇", "🥝", "🍓"],
        ["🥥", "🍇", "🍊", "🍊", "🍇", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", "🍊", "🍇", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      grid = fillGrid(grid, ["zero", "one", "two", "three"]);
      expect(grid[0]).to.be.an("array").that.does.not.include(" ");
      expect(grid[1]).to.be.an("array").that.does.not.include(" ");
      expect(grid[2]).to.be.an("array").that.does.not.include(" ");
    });
  });

  describe("valid moves", function () {
    it("returns true is there is at least one valid move", function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
        ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
      ];
      expect(hasValidMoves(grid)).to.be.true;
    });

    it("returns false if there are no more valid moves", function () {
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
      expect(hasValidMoves(grid)).to.be.false;
    });
  });
});
