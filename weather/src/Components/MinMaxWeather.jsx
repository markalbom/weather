import React, { Component } from 'react'

class MinMaxWeather extends Component {
  render() {
    return (
      <div className="min-max-weather">
        <div className="info">Minimum Temperature: {this.props.minTemp}</div>
        <div className="info">Maximum Temperature: {this.props.maxTemp}</div>
      </div>
    );
  }
}

export default MinMaxWeather
