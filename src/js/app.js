import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";
import Header from "../components/Header";
import RestaurantContainer from "../components/RestaurantContainer";

export default class Hello extends Component {
  render() {
    return (
      <div>
        <Header />
        <RestaurantContainer />
      </div>
    );
  }
}

render(<Hello />, document.getElementById("app"));
