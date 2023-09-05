// Constants

const optionsWithNumbers = ["zero", "one", "two", "three"];

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

const gridWithSpaces = [
  ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
  ["🥝", "🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇"],
  ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
  ["🍓", "🥥", "🍇", "🍊", "🍇", "🥝", "🍇", "🥝"],
  ["🥥", "🍇", "🍊", " ", " ", "🍇", "🥝", "🍓"],
  ["🥥", "🍊", "🍊", " ", " ", "🍇", "🥝", "🍓"],
  [" ", " ", " ", " ", " ", "🥝", "🍓", "🥥"],
  ["🍇", "🍊", "🍇", "🥝", "🍇", "🥝", "🍓", "🥥"],
];

const gridWithoutMatches = [
  ["🥝", "🍓", "🥥", "🍇", "🔥", "☺️", "😚", "🧮"],
  ["✈️", "🩹", "🎟", "🧑🏼", "🚡", "🛬", "🛫", "⏰"],
  ["⚗️", "👽", "🚑", "👾", "🏺", "🏈", "🛏", "🐝"],
  ["🪲", "🧗🏼", "🍺", "🏛", "🔃", "📀", "⭐️", "✡️"],
  ["🕡", "👔", "➡️", "🫱🏼", "⭐️", "↙️", "🗳", "📫"],
  ["⚗️", "👽", "🚑", "👾", "🏺", "🏈", "🛏", "🐝"],
  ["🪲", "🧗🏼", "🍺", "🏛", "🔃", "📀", "⭐️", "✡️"],
  ["🕡", "👔", "➡️", "🫱🏼", "⭐️", "↙️", "🗳", "📫"],
];


function checkForMatches(grid) {
  const horizontalMatches = _checkForHorizontalMatches(grid);
  const verticalMatches = _checkForVerticalMatches(grid);
  const matches = horizontalMatches.concat(verticalMatches);
  return matches;
}

function _checkForHorizontalMatches(grid) {
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

function _checkForVerticalMatches(grid) {
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

// console.log(checkForMatches(gridWithMatches));

function _clearMatches(grid) {
  const matches = checkForMatches(grid);
  for (const { row, col } of matches) {
    grid[row][col] = " ";
  }
  return grid;
}

// console.log(_clearMatches(gridWithMatches));

function _dropItems(grid) {
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

// console.log(_dropItems(gridWithSpaces));

function _fillGrid(grid, options) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === " ") {
        grid[row][col] = _randomize(options);
      }
    }
  }
  return grid;
}

// console.log(_fillGrid(gridWithSpaces, optionsWithNumbers));

function _randomize(options) {
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex];
  return randomOption;
}

function _hasValidMoves(grid) {
  const gridCopy = [];
  for (let row = 0; row < grid.length; row++) {
    gridCopy.push([...grid[row]]);
  }
  for (let row = 0; row < grid.length - 1; row++) {
    for (let col = 0; col < grid[0].length - 1; col++) {
      // check horizontal swap
      swap(gridCopy[row][col], gridCopy[row][col + 1]);

      let matches = checkForMatches(gridCopy);
      if (matches.length > 0) {
        return true;
      }

      swap(gridCopy[row][col], gridCopy[row][col + 1]);

      // check for vertical swap
      swap(gridCopy[row][col], gridCopy[row + 1][col]);

      matches = checkForMatches(gridCopy);
      if (matches.length > 0) {
        return true;
      }

      swap(gridCopy[row][col], gridCopy[row + 1][col]);
    }
  }
  return false;
}

function swap(space1, space2) {
  const temp = space1;
  space1 = space2;
  space2 = temp;
}

console.log(_hasValidMoves(gridWithMatches));
console.log(_hasValidMoves(gridWithoutMatches));

module.exports = {
  // Fill this in
};
