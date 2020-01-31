import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronRight, faChevronLeft);

ReactDOM.render(<App />, document.querySelector("#root"));