import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantName extends Component {
  render() {
    return (
      <li>{this.props.currency + "" + this.props.cost + " for 2 people"}</li>
    );
  }
}
