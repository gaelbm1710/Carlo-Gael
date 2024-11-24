import React from "react";
import { AppRoutes } from "./router/Routes";
import { BrowserRouter } from "react-router-dom";
import "../src/styles/main.scss";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
