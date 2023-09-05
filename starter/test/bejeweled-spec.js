const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe("Bejeweled", function () {
  let bejeweled;
  let grid;

  // Add tests for setting up a basic board

  describe("board", function () {
    bejeweled = new Bejeweled();

    it("creates an instance of Bejeweled", function () {
      expect(bejeweled).to.exist;
    });

    it("initializes a 8x8 grid", function () {
      expect(bejeweled.grid).to.have.a.lengthOf(8);
      expect(bejeweled.grid[0]).to.have.a.lengthOf(8);
    });
  });

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
      let matches = Bejeweled.checkForMatches(grid);
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
      let matches = Bejeweled.checkForMatches(grid);
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
      let matches = Bejeweled.checkForMatches(grid);
      expect(matches).to.have.deep.members([
        { row: 4, col: 3 },
        { row: 4, col: 4 },
        { row: 5, col: 3 },
        { row: 5, col: 4 },
        { row: 6, col: 0 },
        { row: 6, col: 1 },
        { row: 6, col: 2 },
        { row: 6, col: 3 },
        { row: 6, col: 4 },
      ]);
      // Alternative Way to Check for Correct Matches
      // expect(matches).to.deep.include({ row: 4, col: 3 });
      // expect(matches).to.deep.include({ row: 4, col: 4 });
      // expect(matches).to.deep.include({ row: 5, col: 3 });
      // expect(matches).to.deep.include({ row: 5, col: 4 });
      // expect(matches).to.deep.include({ row: 6, col: 0 });
      // expect(matches).to.deep.include({ row: 6, col: 1 });
      // expect(matches).to.deep.include({ row: 6, col: 2 });
      // expect(matches).to.deep.include({ row: 6, col: 3 });
      // expect(matches).to.deep.include({ row: 6, col: 4 });
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
      grid = Bejeweled.clearMatches(grid);
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
      grid = Bejeweled.dropItems(grid);
      expect(grid).to.have.deep.ordered.members([
        [" ", " ", " ", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🍇", "🥝", "🍇"],
        ["🥝", "🍓", "🥥", " ", " ", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍇", "🍇", "🥝", "🍇", "🥝"],
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
      grid = Bejeweled.fillGrid(grid);
      expect(grid[0]).to.not.have.members("");
      expect(grid[1]).to.not.have.members("");
      expect(grid[2]).to.not.have.members("");
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
      expect(Bejeweled.checkForValidMoves(grid)).to.be.true;
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
      expect(Bejeweled.checkForValidMoves(grid)).to.be.false;
    });
  });
});
