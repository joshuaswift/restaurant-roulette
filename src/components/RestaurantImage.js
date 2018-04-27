import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class RestaurantImage extends Component {
  render() {
    let imgArr = this.props.images;
    let random = Math.floor(Math.random() * imgArr.length);
    let placeholderImg = imgArr[random].url;
    console.log(imgArr[random]);

    return (
      <li>
        <img src={this.props.thumb || this.props.featImage || placeholderImg} />
      </li>
    );
  }
}

export default RestaurantImage;
