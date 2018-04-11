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

  handleClick() {
    this.setState({ shouldUpdate: true });
  }

  render() {
    const { error, isLoaded, info } = this.state;
    const restArr = [info.nearby_restaurants];
    const placeholderImg =
      "https://res.cloudinary.com/dsjoktefu/image/upload/v1523468876/chuttersnap-596073-unsplash_grjbbd.jpg";

    if (error) {
      return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let random = Math.floor(Math.random() * restArr[0].length);
      let imgUrl = info.nearby_restaurants[random].restaurant.thumb;
      if (imgUrl === "") {
        imgUrl = placeholderImg;
      }
      return (
        <div>
          <ul>
            {console.log(restArr[random])}
            <li>{info.nearby_restaurants[random].restaurant.name}</li>
            <li>{info.nearby_restaurants[random].restaurant.cuisines}</li>
            <li>
              {info.nearby_restaurants[random].restaurant.currency +
                "" +
                info.nearby_restaurants[random].restaurant
                  .average_cost_for_two +
                " for 2 people"}
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
              <img src={imgUrl} />
            </li>
            <li>
              <a
                target="_blank"
                href={info.nearby_restaurants[random].restaurant.url}
              >
                Tell Me More
              </a>
            </li>
          </ul>
          <button id="newBtn" onClick={this.handleClick}>
            New Restaurant
          </button>
        </div>
      );
    }
  }
}

export default RestaurantInfo;
