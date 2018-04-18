import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantRating extends Component {
  render() {
    return <li>{this.props.rating + "/5" + " - " + this.props.ratingText}</li>;
  }
}
