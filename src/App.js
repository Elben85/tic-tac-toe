import { useState } from "react";
import "./App.css";
import {
  Board,
  findWinningSquares,
  calculateNextGrid,
} from "./web-content/Game.js";
import { computerPlay } from "./web-content/Computer.js";

const EMPTY = 0;
const CROSS = 1;
const CIRCLE = 2;

const CHOOSING = 0;
const PVP = 1;
const PVE = 2;

const initialGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
  return {
    id: index,
    image: EMPTY,
    shine: false,
  };
});

function App() {
  const [status, setStatus] = useState(CHOOSING);
  const [grid, setGrid] = useState(initialGrid);

  if (status === CHOOSING) {
    return (
      <>
        <div className="modes">
          <h1> Choose modes</h1>

          <div className="option">
            <button onClick={() => setStatus(PVP)}>PVP</button>

            <button onClick={() => setStatus(PVE)}>PVE</button>
          </div>
        </div>
      </>
    );
  } else {
    const isGameOver =
      findWinningSquares(grid) !== null ||
      grid.filter((square) => square.image === EMPTY).length === 0;

    const nextMove =
      grid.reduce((acc, square) => acc + (square.image === EMPTY ? 0 : 1), 0) %
        2 ===
      0
        ? CROSS
        : CIRCLE;

    function EndScreen() {
      return (
        <div key="end" className={isGameOver ? "end-screen" : "hidden"}>
          <h1>
            {" "}
            {findWinningSquares(grid) === null
              ? "DRAW"
              : status === PVP
              ? nextMove === CIRCLE
                ? "PLAYER 1 WINS"
                : "PLAYER 2 WINS"
              : nextMove === CIRCLE
              ? "PLAYER WINS"
              : "COMPUTER WINS"}
          </h1>
          <button onClick={() => setGrid(initialGrid)}>Play Again</button>

          <button
            onClick={() => {
              setGrid(initialGrid);
              setStatus(CHOOSING);
            }}
          >
            Switch Modes
          </button>
        </div>
      );
    }

    function handleSquareClick(target) {
      setGrid(
        calculateNextGrid({ square: target, nextMove: nextMove, grid: grid })
      );
    }

    if (status === PVP) {
      return (
        <>
          <div className="container">
            <header>Tic-Tac-Toe</header>

            <Board
              squares={grid}
              handleClick={isGameOver ? () => {} : handleSquareClick}
            />
          </div>
          <EndScreen />
        </>
      );
    } else {
      if (nextMove === CIRCLE && !isGameOver) {
        const computerPick = computerPlay({ grid });
        console.log(computerPick);
        setTimeout(() => handleSquareClick(computerPick), 1000);
      }
      return (
        <>
          <div className="container">
            <header>Tic-Tac-Toe</header>

            <Board
              squares={grid}
              handleClick={
                isGameOver || nextMove === CIRCLE ? () => {} : handleSquareClick
              }
            />
          </div>
          <EndScreen />
        </>
      );
    }
  }
}

export default App;
