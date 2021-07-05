import { StrictMode } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import BlogBook from "./app";

ReactDOM.render(
  <StrictMode>
    <BlogBook />
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
