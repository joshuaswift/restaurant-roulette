import React, { Component } from "react";
import { render } from "react-dom";
import "../css/style.css";

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      info: [],
      API_KEY: "96655442d9afa6b0eb1f89c6a2cb611b"
    };
  }

  componentDidMount() {
    fetch(
      "https://developers.zomato.com/api/v2.1/geocode?lat=40.732013&lon=-73.996155",
      {
        method: "GET",
        headers: {
          "user-key": this.API_KEY,
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
          <h1>This works!</h1>
          <ul>
            {info.nearby_restaurants.map(item => (
              <li key={item[0].id}>{item[0].name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default RestaurantInfo;
