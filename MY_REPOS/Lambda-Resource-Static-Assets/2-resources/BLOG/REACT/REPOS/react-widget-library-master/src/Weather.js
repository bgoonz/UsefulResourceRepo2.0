import React from 'react'


class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
    }
  }


  componentDidMount() {

    const success = (res) => console.log(res);
    const gl = navigator.geolocation.getCurrentPosition(success);

    // console.log(Geolocation.getCurrentPosition());

    fetch(api.openweathermap.org/data/2.5/weather?lat={gl.coords.latitude}&lon={lon}&appid={})
  }

}


export default Weather
