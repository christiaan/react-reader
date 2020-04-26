import React from "react";
import { render } from "react-dom";
import App from "./App";

render(
  <App
    localFile={"https://gerhardsletten.github.io/react-reader/files/alice.epub"}
    localName={"Alice in wonderland"}
  />,
  document.getElementById("root")
);
