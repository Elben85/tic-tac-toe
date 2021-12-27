import { CellContents } from "./const.js";

// return an array of the indexes of winning boxes or null if there are none
export function findWinningSquares(grid) {
  if (
    grid[0].image !== CellContents.EMPTY &&
    grid[0].image === grid[1].image &&
    grid[0].image === grid[2].image
  ) {
    return [0, 1, 2];
  } else if (
    grid[3].image !== CellContents.EMPTY &&
    grid[3].image === grid[4].image &&
    grid[3].image === grid[5].image
  ) {
    return [3, 4, 5];
  } else if (
    grid[6].image !== CellContents.EMPTY &&
    grid[6].image === grid[7].image &&
    grid[6].image === grid[8].image
  ) {
    return [6, 7, 8];
  } else if (
    grid[0].image !== CellContents.EMPTY &&
    grid[0].image === grid[3].image &&
    grid[0].image === grid[6].image
  ) {
    return [0, 3, 6];
  } else if (
    grid[1].image !== CellContents.EMPTY &&
    grid[1].image === grid[4].image &&
    grid[1].image === grid[7].image
  ) {
    return [1, 4, 7];
  } else if (
    grid[2].image !== CellContents.EMPTY &&
    grid[2].image === grid[5].image &&
    grid[2].image === grid[8].image
  ) {
    return [2, 5, 8];
  } else if (
    grid[0].image !== CellContents.EMPTY &&
    grid[0].image === grid[4].image &&
    grid[0].image === grid[8].image
  ) {
    return [0, 4, 8];
  } else if (
    grid[2].image !== CellContents.EMPTY &&
    grid[2].image === grid[4].image &&
    grid[2].image === grid[6].image
  ) {
    return [2, 4, 6];
  } else {
    return null;
  }
}

export function calculateNextGrid({ square, nextMove, grid }) {
  if (square.image !== CellContents.EMPTY) {
    return;
  }

  const nextGrid = grid.map((elem) => {
    return {
      ...elem,
      image: elem.id === square.id ? nextMove : elem.image,
    };
  });

  const winningSquares = findWinningSquares(nextGrid);
  if (winningSquares === null) {
    return nextGrid;
  } else {
    return nextGrid.map((elem) => {
      return {
        ...elem,
        shine: winningSquares.includes(elem.id),
      };
    });
  }
}

export function isGameDone(grid) {
  return (
    findWinningSquares(grid) !== null ||
    grid.filter((square) => square.image === CellContents.EMPTY).length === 0
  );
}

export function findNextMove(grid) {
  return grid.reduce(
    (acc, square) => acc + (square.image === CellContents.EMPTY ? 0 : 1),
    0
  ) %
    2 ===
    0
    ? CellContents.CROSS
    : CellContents.CIRCLE;
}
