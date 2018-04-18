import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class RestaurantButton extends Component {
  render() {
    return (
      <button id="newBtn" onClick={this.props.handleClick}>
        New Restaurant
      </button>
    );
  }
}

export default RestaurantButton;
