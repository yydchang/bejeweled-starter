const { expect } = require('chai');

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");

describe("Cursor", function () {
  let cursor;

  beforeEach(function () {
    cursor = new Cursor(3, 3);
  });

  describe("Navigation", function () {
    it("initializes for a 3x3 grid", function () {
      expect(cursor.row).to.equal(0);
      expect(cursor.col).to.equal(0);
    });

    it("correctly processes down inputs", function () {
      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);
    });

    it("correctly processes up inputs", function () {
      cursor.up();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

      cursor.down();
      expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

      cursor.up();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });

    it("processes right inputs", function () {
      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
    });

    it("processes left inputs", function () {
      cursor.left();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

      cursor.right();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

      cursor.left();
      expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });
  });

  describe("Swapping", function () {
    it("selects space based on cursor position", function () {
      cursor.right();
      cursor.right();
      cursor.select();
      expect([cursor.selectedRow, cursor.selectedCol]).to.deep.equal([0, 2]);
    });

    it("undos selection if user selects currently selected space", function () {
      cursor.selectedRow = 0;
      cursor.selectedCol = 2;
      cursor.down();
      cursor.up();
      cursor.right();
      cursor.right();
      cursor.select();
      expect([cursor.selectedRow, cursor.selectedCol]).to.deep.equal([
        null,
        null,
      ]);
    });

    it("swaps content of selected spaces if second selection is adjacent to already selected space", function () {
      Screen.grid = [
        ["🍓", "🍓", "🥥"],
        ["🥝", "🥝", "🍓"],
        ["🥝", "🥝", "🍓"],
      ];
      cursor.right();
      cursor.right();
      cursor.select();
      cursor.down();
      cursor.select();
      expect(Screen.grid[0][2]).to.deep.equal("🍓");
      expect(Screen.grid[1][2]).to.deep.equal("🥥");
      expect([cursor.row, cursor.col]).to.deep.equal([1, 2]);
      expect([cursor.selectedRow, cursor.selectedCol]).to.deep.equal([
        null,
        null,
      ]);
    });

    it("clears selection if second selection is not adjacent to already selected space", function () {
      cursor.right();
      cursor.right();
      cursor.select();
      cursor.down();
      cursor.down();
      cursor.select();
      expect([cursor.selectedRow, cursor.selectedCol]).to.deep.equal([
        null,
        null,
      ]);
      expect(Screen.message).to.equal(
        "Second selection is not adjacent to first selection. Please try again."
      );
    });
  });
});
