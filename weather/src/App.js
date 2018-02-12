import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ZipForm from './Components/ZipForm';
import LocationWeather from './Components/LocationWeather';
import MinMaxWeather from './Components/MinMaxWeather';


//class App - the constructor function is where the states are declared.  they are assigned values of null initially so that values can be assigned to them later when they are passed down to other functions or components.
//you must bind the two functions (other than render) in the constructor, because these two functions use state, so they need to be able to access the class where state is initially set.
class App extends Component {
  constructor(){
    super();
    this.state={
      apiDataLoaded: false,
      currentCity: null,
      currentTemp: null,
      tempDescription: null,
      minTemp: null,
      maxTemp: null,
      selectedZipCode: ""
    }
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleZipSubmit = this.handleZipSubmit.bind(this);
  }

//this function assigns the value of what is entered into the input field as 'selected Zip Code', and puts it in state so that it can be accessed later by other components.
  handleInputChange (e) {
    const selectedZipCode = e.target.value;
    this.setState({
      selectedZipCode: selectedZipCode
    })
  }

//this function (on submit - see ZipForm) makes the call to the API, and then in its response, sets state to the designated keys (in this case, the keys that we defined in our constructor). Line 44: this.setState -- 'this' refers to the class 'App', and setState changes the state, and inputs the values that we assign from the API's response).
//e in the parameter is for the event (in this case, when the zip code itself is submitted (in the Zip form), and e.prevent default is necessary because 'on submit' refreshes the page, and you lose state on refresh which sets it back to null).
//use the dollar sign for string interprolation when inputing {this.state.selectedZipCode} because the zip code is in state, so it can change based on the the Input (handle Input Change).
  handleZipSubmit(e){
    e.preventDefault();
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.selectedZipCode},us&units=imperial&APPID=6285278ef3722a93bcb2f07b468e27fa`)
      .then(response => {
        console.log(response)
        this.setState({

          apiDataLoaded: true,
          currentCity: response.data.name,
          currentTemp: response.data.main.temp,
          tempDescription: response.data.weather[0].description,
          minTemp: response.data.main.temp_min,
          maxTemp: response.data.main.temp_max


           })
      })
      .catch(function (error) {
      console.log(error);
      });
  }





//tried to do a conditional rendering for the two components, but a) it was an extra step that seemed redundant and 2) did not follow the syntax as well / effectively as the function below (the render below this was both more precise in structure and clearer in reading)
  //  renderWeather(){
  //     if (this.state.apiDataLoaded) {
  //       return <div>
  //               <LocationWeather
  //                 currentCity={this.state.currentCity}
  //                 currentTemp={this.state.currentTemp}
  //                 tempDescription={this.state.tempDescription} />
  //               <MinMaxWeather
  //                 minTemp={this.state.minTemp}
  //                 maxTemp={this.state.maxTemp} />;
  //             </div>
  //     } else {return Header};
  // }

  render() {
    return (
      <div>
        <ZipForm          handleInputChange={this.handleInputChange}
                          selectedZipCode={this.state.selectedZipCode}
                          handleZipSubmit={this.handleZipSubmit} />
        <LocationWeather  currentCity={this.state.currentCity}
                          currentTemp={this.state.currentTemp}
                          tempDescription={this.state.tempDescription} />
        <MinMaxWeather    minTemp={this.state.minTemp}
                          maxTemp={this.state.maxTemp} />
      </div>


      )
  }
}

export default App;
