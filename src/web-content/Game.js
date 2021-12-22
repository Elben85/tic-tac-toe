import { useContext } from "react";
import { EventHandlerContext } from "./context.js";
import crossImage from "../images/cross.png";
import circleImage from "../images/circle.png";
import defaultImage from "../images/default.png";

const EMPTY = 0;
const CROSS = 1;
const CIRCLE = 2;

function IndividualSquare({ square }) {
  const handleClick = useContext(EventHandlerContext);
  switch (square.image) {
    case EMPTY:
      return (
        <img
          key={square.id}
          className="square"
          onClick={() => handleClick(square)}
          src={defaultImage}
        ></img>
      );
    case CROSS:
      return (
        <img
          key={square.id}
          className={square.shine ? "winning-square" : "square"}
          src={crossImage}
        />
      );
    case CIRCLE:
      return (
        <img
          key={square.id}
          className={square.shine ? "winning-square" : "square"}
          src={circleImage}
        />
      );
    default:
      throw Error;
  }
}

export function Board({ squares, handleClick }) {
  return (
    <div className="board">
      <EventHandlerContext.Provider value={handleClick}>
        <div className="row">
          <IndividualSquare square={squares[0]} />
          <IndividualSquare square={squares[1]} />
          <IndividualSquare square={squares[2]} />
        </div>

        <div className="row">
          <IndividualSquare square={squares[3]} />
          <IndividualSquare square={squares[4]} />
          <IndividualSquare square={squares[5]} />
        </div>

        <div className="row">
          <IndividualSquare square={squares[6]} />
          <IndividualSquare square={squares[7]} />
          <IndividualSquare square={squares[8]} />
        </div>
      </EventHandlerContext.Provider>
    </div>
  );
}

// return an array of the indexes of winning boxes or null if there are none
export function findWinningSquares(grid) {
  if (
    grid[0].image !== EMPTY &&
    grid[0].image === grid[1].image &&
    grid[0].image === grid[2].image
  ) {
    return [0, 1, 2];
  } else if (
    grid[3].image !== EMPTY &&
    grid[3].image === grid[4].image &&
    grid[3].image === grid[5].image
  ) {
    return [3, 4, 5];
  } else if (
    grid[6].image !== EMPTY &&
    grid[6].image === grid[7].image &&
    grid[6].image === grid[8].image
  ) {
    return [6, 7, 8];
  } else if (
    grid[0].image !== EMPTY &&
    grid[0].image === grid[3].image &&
    grid[0].image === grid[6].image
  ) {
    return [0, 3, 6];
  } else if (
    grid[1].image !== EMPTY &&
    grid[1].image === grid[4].image &&
    grid[1].image === grid[7].image
  ) {
    return [1, 4, 7];
  } else if (
    grid[2].image !== EMPTY &&
    grid[2].image === grid[5].image &&
    grid[2].image === grid[8].image
  ) {
    return [2, 5, 8];
  } else if (
    grid[0].image !== EMPTY &&
    grid[0].image === grid[4].image &&
    grid[0].image === grid[8].image
  ) {
    return [0, 4, 8];
  } else if (
    grid[2].image !== EMPTY &&
    grid[2].image === grid[4].image &&
    grid[2].image === grid[6].image
  ) {
    return [2, 4, 6];
  } else {
    return null;
  }
}

export function calculateNextGrid({ square, nextMove, grid }) {
  if (square.image !== EMPTY) {
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
