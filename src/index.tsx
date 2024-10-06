import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FilterContextProvider } from "./context/FilterContext";
import { SelectedContextProvider } from "./context/SelectedContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <FilterContextProvider>
    <SelectedContextProvider>
    <App />
    </SelectedContextProvider>
  </FilterContextProvider>
);
