import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/layout";
import configureStore from "./store/configureStore";

const initialState = {
  messages: {
    messages: [],
    isLoading: false,
    error: null,
    isSocketOpen: false
  },
  clients: {},
  channels: {}
};
const store = configureStore(initialState);
const root = document.getElementById("root");

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Layout />
    </Provider>
  </Router>,
  root
);

if (module.hot) {
  module.hot.accept();
}
