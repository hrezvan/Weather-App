import './App.css';
import Weather from './components/weather';
import Form from './components/form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import React, { Component } from 'react';
import License from './components/license';

// api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key='c64f75723fe4c1fea7d1286b86cd3396';

class App extends React.Component {
  constructor() {
    super()
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: '',
      error: false,
    };
    // this.getWeather();

    this.weatherIcon={
      thunderStorm: 'wi-thunderstorm',
      drizzle: 'wi-sleet',
      rain: 'wi-storm-showers',
      snow: 'wi-snow',
      atmosphere: 'wi-fog',
      clear: 'wi-sunny',
      clouds: 'wi-day-fog',
    }
  }

  calCelsius = (kelvin) => {
    var cel=Math.floor(kelvin-273.15);
    return cel;
  }

  getWeatherIcon = (icons,rangeId) => {
    switch(true){
      case rangeId>=200 && rangeId<=232:
        this.setState({icon: this.weatherIcon.thunderStorm});
        break;
      case rangeId>=300 && rangeId<=321:
        this.setState({icon: this.weatherIcon.drizzle});
        break;
      case rangeId>=500 && rangeId<=531:
        this.setState({icon: this.weatherIcon.rain});
        break;
      case rangeId>=600 && rangeId<=622:
        this.setState({icon: this.weatherIcon.snow});
        break;
      case rangeId>=701 && rangeId<=781:
        this.setState({icon: this.weatherIcon.atmosphere});
        break;
      case rangeId===800:
        this.setState({icon: this.weatherIcon.clear});
        break;
      case rangeId>=801 && rangeId<=804:
        this.setState({icon: this.weatherIcon.clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.clouds});
    }
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city= e.target.elements.city.value;
    const country= e.target.elements.country.value;

    if (city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      })
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id);
    } else {
      this.setState({error: true});
    }
  }

  render() { 
    return ( 
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city}
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon} />
        <License />
      </div>
     );
  }
}
 
export default App;
