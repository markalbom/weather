import React, { Component } from 'react'

class LocationWeather extends Component {
  render() {
    return (
      <div className="location-weather">
        <div className="info">Your city/town: {this.props.currentCity}</div>
        <div className="info">The current temperature: {this.props.currentTemp}</div>
        <div className="info">Conditions: {this.props.tempDescription}</div>
      </div>
    );
  }
}

export default LocationWeather
