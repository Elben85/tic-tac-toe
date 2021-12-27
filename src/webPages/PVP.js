import React, { useState } from "react";
import styled from "styled-components";
import { Board } from "../webComponent/Board.js";
import {
  calculateNextGrid,
  isGameDone,
  findNextMove,
} from "../webComponent/gameLogic.js";
import { PVPEndScreen } from "./endScreen.js";

import { CellContents, initialGrid } from "../webComponent/const.js";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

function PVP() {
  const [grid, setGrid] = useState(initialGrid);

  const isGameOver = isGameDone(grid);

  const nextMove = findNextMove(grid);

  function handleSquareClick(target) {
    if (isGameOver) {
      return;
    }
    setGrid(
      calculateNextGrid({ square: target, nextMove: nextMove, grid: grid })
    );
  }

  return (
    <>
      {isGameOver && (
        <PVPEndScreen grid={grid} setState={setGrid} nextMove={nextMove} />
      )}
      <Container>
        <header>Tic-Tac-Toe</header>

        <Board squares={grid} handleClick={handleSquareClick} />
      </Container>
    </>
  );
}

export default PVP;
