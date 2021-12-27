import React, { useState } from "react";
import styled from "styled-components";
import { Board } from "../webComponent/Board.js";
import {
  calculateNextGrid,
  isGameDone,
  findNextMove,
} from "../webComponent/gameLogic.js";
import { PVEEndScreen } from "./endScreen.js";
import { computerPlay } from "../webComponent/Computer.js";
import { CellContents, initialGrid } from "../webComponent/const.js";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

function PVE() {
  const [grid, setGrid] = useState(initialGrid);
  const isGameOver = isGameDone(grid);

  const nextMove = findNextMove(grid);

  function handleSquareClick(target) {
    if (isGameOver || nextMove === CellContents.CIRCLE) {
      return;
    }
    setGrid(
      calculateNextGrid({ square: target, nextMove: nextMove, grid: grid })
    );
  }

  if (nextMove === CellContents.CIRCLE && !isGameOver) {
    const computerPick = computerPlay({ grid });
    setTimeout(
      () =>
        setGrid(
          calculateNextGrid({
            square: computerPick,
            nextMove: nextMove,
            grid: grid,
          })
        ),
      1000
    );
  }

  return (
    <>
      {isGameOver && (
        <PVEEndScreen grid={grid} setState={setGrid} nextMove={nextMove} />
      )}
      <Container>
        <header>Tic-Tac-Toe</header>

        <Board squares={grid} handleClick={handleSquareClick} />
      </Container>
    </>
  );
}

export default PVE;
