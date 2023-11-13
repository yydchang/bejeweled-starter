const { expect } = require("chai");
const sinon = require("sinon");
const Screen = require("../class/screen");
const Bejeweled = require("../class/bejeweled.js");
const helpers = require("../helpers/helpers.js");
const { returnMatches } = helpers;

describe("Bejeweled", function () {
  let bejeweled;
  let grid;
  let options;

  sinon.stub(Screen, "render");
  sinon.stub(helpers, "sleep");

  after(() => {
    Screen.quit();
  });

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

    it("fills the board with a set of items that have no matches but does have valid moves", function () {
      expect(returnMatches(Screen.grid).length).to.equal(0);
    });
  });

  describe("check for matches", function () {
    this.timeout(0);
    it("matches three in a row continuously until the grid has no more matches left", async function () {
      grid = [
        ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
        ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🥥", "🍊", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
        ["🍇", "🍇", "🍇", "🍇", "🥝", "🥝", "🍓", "🥥"],
      ];
      options = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
      ];
      await Bejeweled.checkForMatches(grid, options);
      expect(returnMatches(grid).length).to.equal(0);
    });
  });

  describe("score points", function () {
    it("todo: adds points based on the number of items matched", function () {
      grid = ["🍇", "🍇", "🍇", "🍇"];
      options = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
      ];
      expect(true).to.be.false;
    });
  });
});
