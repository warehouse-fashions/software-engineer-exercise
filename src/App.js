import React, { Component } from 'react';
import './App.css';
import Slider from "react-slick";

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Welcome to React</h1>
          <Slider {...sliderSettings}>
              <div>
                  <h3>1</h3>
              </div>
              <div>
                  <h3>2</h3>
              </div>
              <div>
                  <h3>3</h3>
              </div>
              <div>
                  <h3>4</h3>
              </div>
              <div>
                  <h3>5</h3>
              </div>
              <div>
                  <h3>6</h3>
              </div>
          </Slider>
      </div>
    );
  }
}

const sliderSettings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
};

export default App;
