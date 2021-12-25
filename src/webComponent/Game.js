import { useContext } from "react";
import { EventHandlerContext } from "./context.js";
import crossImage from "../images/cross.png";
import circleImage from "../images/circle.png";
import defaultImage from "../images/default.png";
import { CellContents } from "./const.js";
import styled from "styled-components";

const Container = styled.div`
  width: 810px;
  height: 810px;
  display: flex;
  flex-direction: column;
  background: black;
  box-shadow: 0px 0px 3px 3px black;
`;

const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-self: stretch;
  align-items: center;
  justify-content: space-evenly;
`;

const Square = styled.img`
  transition: 0.3s;
  width: 200px;
  height: 200px;
  background: pink;
  padding: 20px;
  box-shadow: 0px 0px 10px 10px white;
  &: hover {
    transition: 0.3s;
    scale: 1.05;
  }
`;

const WinningSquare = styled.img`
  transition: all 1s;
  width: 200px;
  height: 200px;
  background: violet;
  padding: 20px;
  box-shadow: 0px 0px 10px 10px red, inset 0px 0px 5px 5px purple;
`;

function IndividualSquare({ square }) {
  const handleClick = useContext(EventHandlerContext);
  switch (square.image) {
    case CellContents.EMPTY:
      return (
        <Square
          key={square.id}
          onClick={() => handleClick(square)}
          src={defaultImage}
        />
      );
    case CellContents.CROSS:
      if (square.shine) {
        return <WinningSquare key={square.id} src={crossImage} />;
      } else {
        return <Square key={square.id} src={crossImage} />;
      }
    case CellContents.CIRCLE:
      if (square.shine) {
        return <WinningSquare key={square.id} src={circleImage} />;
      } else {
        return <Square key={square.id} src={circleImage} />;
      }
    default:
      throw Error;
  }
}

export function Board({ squares, handleClick }) {
  return (
    <Container>
      <EventHandlerContext.Provider value={handleClick}>
        <Row>
          <IndividualSquare square={squares[0]} />
          <IndividualSquare square={squares[1]} />
          <IndividualSquare square={squares[2]} />
        </Row>

        <Row>
          <IndividualSquare square={squares[3]} />
          <IndividualSquare square={squares[4]} />
          <IndividualSquare square={squares[5]} />
        </Row>

        <Row>
          <IndividualSquare square={squares[6]} />
          <IndividualSquare square={squares[7]} />
          <IndividualSquare square={squares[8]} />
        </Row>
      </EventHandlerContext.Provider>
    </Container>
  );
}

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
