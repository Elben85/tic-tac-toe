import _ from "lodash";
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

function IndividualSquare({ square, handleClick }) {
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
      {_.chunk(squares, 3).map((row) => {
        return (
          <Row>
            {row.map((square) => {
              return (
                <IndividualSquare square={square} handleClick={handleClick} />
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
}
