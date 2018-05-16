import React, { Component } from "react";
import { render } from "react-dom";
import "../css/flex-styles.css";
import "../css/background-image.css";

import Header from "../components/Header";
import RestaurantContainer from "../components/RestaurantContainer";
export default class App extends Component {
  render() {
    return (
      <div id="hero">
        <Header id="header" />
        <RestaurantContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
