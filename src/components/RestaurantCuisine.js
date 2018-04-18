import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantCuisine extends Component {
  render() {
    return <li>{this.props.cuisine}</li>;
  }
}
