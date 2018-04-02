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
  }

  componentDidMount() {
    const API_KEY = "96655442d9afa6b0eb1f89c6a2cb611b";
    fetch(
      "https://developers.zomato.com/api/v2.1/geocode?lat=40.732013&lon=-73.996155",
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

  render() {
    const { error, isLoaded, info } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul>
            <li>{info.nearby_restaurants[0].restaurant.name}</li>
            <li>{info.nearby_restaurants[0].restaurant.cuisines}</li>
            <li>
              {info.nearby_restaurants[0].restaurant.currency +
                "" +
                info.nearby_restaurants[0].restaurant.average_cost_for_two}
            </li>
            <li>
              {info.nearby_restaurants[0].restaurant.user_rating
                .aggregate_rating +
                "/5" +
                " - " +
                info.nearby_restaurants[0].restaurant.user_rating.rating_text}
            </li>
            <li>
              <img src={info.nearby_restaurants[0].restaurant.thumb} />
            </li>
            <li>
              <a href={info.nearby_restaurants[0].restaurant.url}>More Info</a>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default RestaurantInfo;
