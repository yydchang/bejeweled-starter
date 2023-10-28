function returnMatches(grid) {
  const horizontalMatches = _returnHorizontalMatches(grid);
  const verticalMatches = _returnVerticalMatches(grid);
  const matches = horizontalMatches.concat(verticalMatches);
  return matches;
}

function _returnHorizontalMatches(grid) {
  const matches = [];
  for (let row = 0; row < grid.length; row++) {
    const window = {};
    let left = 0;
    for (let right = 0; right < grid[0].length; right++) {
      const currentEl = grid[row][right];
      window[currentEl] = (window[currentEl] || 0) + 1;
      if (Object.keys(window).length === 1) {
        if (right - left + 1 === 3) {
          matches.push({ row, col: left });
          matches.push({ row, col: left + 1 });
          matches.push({ row, col: right });
        } else if (right - left + 1 > 3) {
          matches.push({ row, col: right });
        }
      } else {
        delete window[grid[row][left]];
        left = right;
      }
    }
  }
  return matches;
}

function _returnVerticalMatches(grid) {
  const matches = [];
  for (let col = 0; col < grid[0].length; col++) {
    const window = {};
    let top = 0;
    for (let bottom = 0; bottom < grid.length; bottom++) {
      const currentEl = grid[bottom][col];
      window[currentEl] = (window[currentEl] || 0) + 1;
      if (Object.keys(window).length === 1) {
        if (bottom - top + 1 === 3) {
          matches.push({ row: top, col });
          matches.push({ row: top + 1, col });
          matches.push({ row: bottom, col });
        } else if (bottom - top + 1 > 3) {
          matches.push({ row: bottom, col });
        }
      } else {
        delete window[grid[top][col]];
        top = bottom;
      }
    }
  }
  return matches;
}

function clearMatches(grid) {
  const matches = returnMatches(grid);
  for (const { row, col } of matches) {
    grid[row][col] = " ";
  }
  return grid;
}

function dropItems(grid) {
  for (let col = 0; col < grid[0].length; col++) {
    let p = grid.length - 1;
    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row][col] !== " ") {
        const temp = grid[p][col];
        grid[p][col] = grid[row][col];
        grid[row][col] = temp;
        p--;
      }
    }
  }
  return grid;
}

function fillGrid(grid, options) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === " ") {
        grid[row][col] = _randomize(options);
      }
    }
  }
  return grid;
}

function _randomize(options) {
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex];
  return randomOption;
}

function hasValidMoves(grid) {
  const gridCopy = [];
  for (let row = 0; row < grid.length; row++) {
    gridCopy.push([...grid[row]]);
  }
  for (let row = 0; row < grid.length - 1; row++) {
    for (let col = 0; col < grid[0].length - 1; col++) {
      // check horizontal swap
      swap(gridCopy, row, col, row, col + 1);

      let matches = returnMatches(gridCopy);
      if (matches.length > 0) {
        return true;
      }

      swap(gridCopy, row, col, row, col + 1);

      // check for vertical swap
      swap(gridCopy, row, col, row + 1, col);

      matches = returnMatches(gridCopy);
      if (matches.length > 0) {
        return true;
      }

      swap(gridCopy, row, col, row + 1, col);
    }
  }
  return false;
}

function swap(grid, row1, col1, row2, col2) {
  const temp = grid[row1][col1];
  grid[row1][col1] = grid[row2][col2];
  grid[row2][col2] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  returnMatches,
  clearMatches,
  dropItems,
  fillGrid,
  hasValidMoves,
  swap,
  sleep,
};
