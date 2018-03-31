import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

import RestaurantInfo from "../components/RestaurantInfo";
class RestaurantContainer extends Component {
  render() {
    return <RestaurantInfo />;
  }
}

export default RestaurantContainer;
