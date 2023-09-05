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

  describe("check for swaps", function () {
    it("returns a new board after a swap", function () {
      expect(false).to.be.true;
    });
  });
});
