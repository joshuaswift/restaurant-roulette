import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantName extends Component {
  render() {
    return (
      <li>
        <h2>{this.props.name}</h2>
      </li>
    );
  }
}
