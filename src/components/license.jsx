import React, { Component } from 'react';
import './license.css';

class License extends Component {
    render() { 
        return ( <a id='license' href='https://openweathermap.org/' target='_blank'>based on <a href='https://openweathermap.org/' target='_blank' style={{color:'orange'}} >Open Weather</a> data</a> );
    }
}
 
export default License;