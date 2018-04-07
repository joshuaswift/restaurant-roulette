import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      info: []
    };

    this.updateDOM = this.updateDOM.bind(this);
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    //Dummy one, which will result in a working next statement.
    navigator.geolocation.getCurrentPosition(function() {}, function() {}, {});
    //The working next statement.
    navigator.geolocation.getCurrentPosition(
      position => {
        //Your code here
        console.log(this.state);
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
    const API_KEY = "96655442d9afa6b0eb1f89c6a2cb611b";

    fetch(
      "https://developers.zomato.com/api/v2.1/geocode?lat=" +
        lat +
        "&lon=" +
        lon,
      {
        method: "GET",
        headers: {
          "user-key": API_KEY,
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

  updateDOM() {
    const { error, isLoaded, info } = this.state;
    const restArr = [info.nearby_restaurants];
    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const random = Math.floor(Math.random() * restArr[0].length);
      return (
        <div>
          <ul>
            <li>{info.nearby_restaurants[random].restaurant.name}</li>
            <li>{info.nearby_restaurants[random].restaurant.cuisines}</li>
            <li>
              {info.nearby_restaurants[random].restaurant.currency +
                "" +
                info.nearby_restaurants[random].restaurant.average_cost_for_two}
            </li>
            <li>
              {info.nearby_restaurants[random].restaurant.user_rating
                .aggregate_rating +
                "/5" +
                " - " +
                info.nearby_restaurants[random].restaurant.user_rating
                  .rating_text}
            </li>
            <li>
              <img src={info.nearby_restaurants[random].restaurant.thumb} />
            </li>
            <li>
              <a
                target="_blank"
                href={info.nearby_restaurants[random].restaurant.url}
              >
                More Info
              </a>
            </li>
          </ul>
          <button onClick={this.updateDOM}>New Restaurant</button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.updateDOM()}</div>;
  }
}

export default RestaurantInfo;
