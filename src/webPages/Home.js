import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  padding: 10px;
  row-gap: 50px;
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

function Home() {
  return (
    <Container>
      <h1> Choose Modes </h1>

      <OptionsContainer>
        <Link to="/PVP">
          <Option>PVP</Option>
        </Link>
        <Link to="/PVE">
          <Option>PVE</Option>
        </Link>
      </OptionsContainer>
    </Container>
  );
}

export default Home;
