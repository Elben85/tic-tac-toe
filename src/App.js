import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./webPages/Home.js";
import PVP from "./webPages/PVP.js";
import PVE from "./webPages/PVE.js";

function App() {
  return (
    <BrowserRouter>
      <Routing></Routing>
    </BrowserRouter>
  );
}

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/PVP" element={<PVP />}></Route>
      <Route exact path="/PVE" element={<PVE />}></Route>
    </Routes>
  );
}

export default App;
