import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";
import "../css/flex-styles.css";

import RestaurantButton from "./RestaurantButton";
import LocationButton from "./LocationButton";
import RestaurantName from "./RestaurantName";
import RestaurantCuisine from "./RestaurantCuisine";
import RestaurantCost from "./RestaurantCost";
import RestaurantRating from "./RestaurantRating";
import RestaurantUrl from "./RestaurantUrl";

const apiKey = process.env.ZOMATO_API_KEY;

var images = require("../data/restaurant-images.json");

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      info: [],
      shouldUpdate: false,
      locationPermission: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.getJSON = this.getJSON.bind(this);
    this.locationRequest = this.locationRequest.bind(this);
  }

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
    fetch(
      "https://developers.zomato.com/api/v2.1/search?start=0&count=100&lat=" +
        lat +
        "&lon=" +
        lon,
      {
        method: "GET",
        headers: {
          "user-key": apiKey,
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

  locationRequest() {
    this.setState({
      locationPermission: true
    });
    this.getLocation();
  }

  handleClick() {
    this.setState({ shouldUpdate: true });
  }

  render() {
    const { error, isLoaded, info, locationPermission } = this.state;
    const restArr = [info.restaurants];

    if (locationPermission === false) {
      return <LocationButton locationRequest={this.locationRequest} />;
    } else if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let random = Math.floor(Math.random() * restArr[0].length);

      return (
        <div id="container">
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

            <RestaurantUrl url={info.restaurants[random].restaurant.url} />
          </ul>
          <RestaurantButton handleClick={this.handleClick} />
        </div>
      );
    }
  }
}

export default RestaurantInfo;
