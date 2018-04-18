import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

export default class RestaurantImage extends Component {
  render() {
    const placeholderImg =
      "https://res.cloudinary.com/dsjoktefu/image/upload/v1523468876/chuttersnap-596073-unsplash_grjbbd.jpg";

    return (
      <li>
        <img src={this.props.thumb || this.props.featImage || placeholderImg} />
      </li>
    );
  }
}
