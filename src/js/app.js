import React, { Component } from "react";
import { render } from "react-dom";
import "../css/flex-styles.css";
import Header from "../components/Header";
import RestaurantContainer from "../components/RestaurantContainer";
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <RestaurantContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
