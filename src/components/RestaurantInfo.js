import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

import RestaurantButton from "./RestaurantButton";
import RestaurantName from "./RestaurantName";
import RestaurantCuisine from "./RestaurantCuisine";
import RestaurantCost from "./RestaurantCost";
import RestaurantRating from "./RestaurantRating";
import RestaurantImage from "./RestaurantImage";
import RestaurantUrl from "./RestaurantUrl";

import { ZOMATO_API_KEY } from "../../.env";

var images = require("../data/restaurant-images.json");

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      info: [],
      shouldUpdate: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.getJSON = this.getJSON.bind(this);
  }
  /*
  getLocation() {
    const options = {
      enableHighAccuracy: true
    };

    navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options)
      : geoError();

    // Success. navigator.geolocation is supported and not blocked.
    function geoSuccess(data) {
      this.getJSON(data.coords.latitude, data.coords.longitude);
    }

    // Fail. navigator.geolocation is not supported or was blocked. Use IP-based location instead.
    function geoError() {
      // Try ip-api.com first
      freegeoip();

      // call ip-api.com, if it fails, try freegeoip.net
      function ipapi() {
        fetch("http://ip-api.com/json")
          .then(data => this.getJSON(data.lat, data.lon))
          .catch(error =>
            // final error message after navigator.geolocation,
            // ip-api.com, freegeoip.net, and ipinfo.io have all failed
            console.error("**location failed - REPLACE WITH BODY TEXT**", error)
          );
      }

      // call freegeoip.net, if it fails, try ipinfo.io
      function freegeoip() {
        fetch("https://freegeoip.net/json?callback=?")
          .then(data => this.getJSON(data.latitude, data.longitude))
          .catch(ipinfo);
      }

      // call ipinfo.io, if it fails, give an error message.
      function ipinfo() {
        fetch("https://ipinfo.io/json")
          .then(data =>
            this.getJSON(data.loc.split(",")[0], data.loc.split(",")[1])
          )
          .catch(ipapi);
      }
    }
  }
  */
  getLocation() {
    const options = {
      enableHighAccuracy: true
    };
    //Dummy one, which will result in a working next statement.
    navigator.geolocation.getCurrentPosition(function() {}, function() {}, {});
    //The working next statement.
    navigator.geolocation.getCurrentPosition(
      position => {
        //Your code here
        this.getJSON(position.coords.latitude, position.coords.longitude);
      },
      error => {
        //Your error handling here
        this.setState({
          isLoaded: true,
          error
        });
      },
      options
    );
  }

  getJSON(lat, lon) {
    console.log(lat, lon);

    fetch(
      "https://developers.zomato.com/api/v2.1/search?start=0&count=100&lat=" +
        lat +
        "&lon=" +
        lon,
      {
        method: "GET",
        headers: {
          "user-key": ZOMATO_API_KEY,
          Accept: "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            info: result
          });
        },
        //Handle errors
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    this.getLocation();
    console.log("mounted");
  }

  handleClick() {
    this.setState({ shouldUpdate: true });
  }

  render() {
    const { error, isLoaded, info } = this.state;
    const restArr = [info.restaurants];
    let randomArr = [];

    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let random = Math.floor(Math.random() * restArr[0].length);
      randomArr.push(random);
      console.log(randomArr);

      return (
        <div>
          <ul>
            <RestaurantName name={info.restaurants[random].restaurant.name} />
            <RestaurantCuisine
              cuisine={info.restaurants[random].restaurant.cuisines}
            />
            <RestaurantCost
              currency={info.restaurants[random].restaurant.currency}
              cost={info.restaurants[random].restaurant.average_cost_for_two}
            />
            <RestaurantRating
              rating={
                info.restaurants[random].restaurant.user_rating.aggregate_rating
              }
              ratingText={
                info.restaurants[random].restaurant.user_rating.rating_text
              }
            />
            <RestaurantImage
              thumb={info.restaurants[random].restaurant.thumb}
              featImage={info.restaurants[random].restaurant.featured_image}
              images={images}
            />
            <RestaurantUrl url={info.restaurants[random].restaurant.url} />
          </ul>
          <RestaurantButton handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default RestaurantInfo;
