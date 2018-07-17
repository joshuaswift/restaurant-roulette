import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";
import "../css/flex-styles.css";

class FooterContainer extends Component {
  render() {
    return (
      <footer>
        <a href="https://unsplash.com/@danielcgold" target="_blank">
          Photo by Dan Gold on Unsplash
        </a>

        <a href="https://github.com/joshuaswift" target="_blank">
          Coded by Joshua Swift
        </a>
      </footer>
    );
  }
}

export default FooterContainer;
