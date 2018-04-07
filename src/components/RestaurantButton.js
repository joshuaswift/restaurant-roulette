import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class RestaurantButton extends Component {
  render() {
    return <button onClick={this.props.updateDOM}>New Restaurant</button>;
  }
}

export default RestaurantButton;
