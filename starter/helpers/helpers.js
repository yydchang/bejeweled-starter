function checkForMatches(grid) {
  const horizontalMatches = checkForHorizontalMatches(grid);
  const verticalMatches = checkForVerticalMatches(grid);
  const matches = horizontalMatches.concat(verticalMatches);
  console.log(matches);
  return matches;
}

function checkForHorizontalMatches(grid) {
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

function checkForVerticalMatches(grid) {
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
  const matches = checkForMatches(grid);
  for (const { row, col } of matches) {
    grid[row][col] = " ";
  }
  for (const row of grid) {
    console.log(JSON.stringify(row));
  }
}

function dropItems(grid) {
  // Fill this in
}

function fillGrid(grid) {
  // Fill this in
}

function checkForValidMoves(grid) {
  // Fill this in
}

const gridNumbered = [
  ["00", "01", "02", "03"],
  ["10", "11", "12", "13"],
  ["20", "21", "22", "23"],
  ["30", "31", "32", "33"],
];

const gridWithMatches = [
  ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
  ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
  ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
  ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
  ["🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
  ["🥥", "🍊", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓"],
  ["🍇", "🍇", "🍇", "🍇", "🥝", "🥝", "🍓", "🥥"],
  ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
];

clearMatches(gridWithMatches);

module.exports = {
  checkForMatches,
};
