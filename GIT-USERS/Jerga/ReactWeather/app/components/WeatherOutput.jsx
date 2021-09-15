var React = require("react");

var WeatherOutput = ({ temp, location }) => {
  // destructurazing temp.props, location.props

  return (
    <h3 className="text-center">
      Its {temp} Celsius Degree in {location}!
    </h3>
  );
};

module.exports = WeatherOutput;
