import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantName extends Component {
  render() {
    return (
      <li>
        <a target="_blank" href={this.props.url}>
          More Info
        </a>
      </li>
    );
  }
}
