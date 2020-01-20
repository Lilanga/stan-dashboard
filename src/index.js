import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/layout/layout";

const root = document.getElementById("root");
ReactDOM.render(<Layout />, root);

if (module.hot) {
  module.hot.accept();
}
