import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Router from "./Services/Router";

ReactDOM.render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
