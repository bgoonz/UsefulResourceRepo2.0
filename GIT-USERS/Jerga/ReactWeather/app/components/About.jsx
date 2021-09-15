var React = require("react");
var { Link } = require("react-router");

var About = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">About</h1>
      <p>
        {" "}
        This is a weather application build on Reat. I have build this for
        learning purposes
      </p>
      <p> Here are some of the tools I used : </p>
      <ul>
        <li>
          <a href="https://facebook.github.io/react">React </a> - This was the
          JavaScript FrameWork I used.
        </li>
        <li>
          <a href="https://openweathermap.org">Open Weather Map </a> - Weather
          Api I used.
        </li>
      </ul>
    </div>
  );
};

module.exports = About;
