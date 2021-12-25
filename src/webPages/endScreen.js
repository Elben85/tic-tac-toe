import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { CellContents, initialGrid } from "../webComponent/const.js";
import { findWinningSquares } from "../webComponent/Game.js";

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: #00000099;
  animation-name: ${fadeIn};
  animation-duration: 5s;
`;

const Option = styled.button`
  transition: 0.5s;
  width: 400px;
  height: 100px;
  padding: 10px;
  color: white;
  font-size: 50px;
  background: #1f51ff;
  border: 5px solid black;
  &:hover {
    transition: 0.5s;
    scale: 1.2;
    box-shadow: 0px 0px 10px 10px white, 0px 0px 30px 30px cyan;
  }
`;

export function PVPEndScreen({ grid, nextMove, setState }) {
  return (
    <Container>
      <h1>
        {" "}
        {findWinningSquares(grid) === null
          ? "DRAW"
          : nextMove === CellContents.CIRCLE
          ? "PLAYER 1 WINS"
          : "PLAYER 2 WINS"}
      </h1>
      <Option onClick={() => setState(initialGrid)}>Play Again</Option>

      <Link to="/">
        <Option
          onClick={() => {
            setState(initialGrid);
          }}
        >
          Switch Modes
        </Option>
      </Link>
    </Container>
  );
}

export function PVEEndScreen({ grid, nextMove, setState }) {
  return (
    <Container>
      <h1>
        {" "}
        {findWinningSquares(grid) === null
          ? "DRAW"
          : nextMove === CellContents.CIRCLE
          ? "PLAYER WINS"
          : "COMPUTER WINS"}
      </h1>
      <Option onClick={() => setState(initialGrid)}>Play Again</Option>

      <Link to="/">
        <Option
          onClick={() => {
            setState(initialGrid);
          }}
        >
          Switch Modes
        </Option>
      </Link>
    </Container>
  );
}
