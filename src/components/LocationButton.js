import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class LocationButton extends Component {
  render() {
    return (
      <button id="locationBtn" onClick={this.props.locationRequest}>
        Give Me a Random Restaurant Near Me
      </button>
    );
  }
}

export default LocationButton;
