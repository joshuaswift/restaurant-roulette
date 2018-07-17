import React, { Component } from "react";
import { render } from "react-dom";
import "../css/flex-styles.css";
import "../css/background-image.css";
import "../css/style.css";

import Header from "../components/Header";
import RestaurantContainer from "../components/RestaurantContainer";
import FooterContainer from "../components/FooterContainer";
export default class App extends Component {
  render() {
    return (
      <div id="hero">
        <Header id="header" />
        <RestaurantContainer />
        <FooterContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
