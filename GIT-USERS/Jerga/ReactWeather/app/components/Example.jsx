var React = require("react");
var { Link } = require("react-router");

var Example = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Examples</h1>
      <p>Here are a few examples to try out!!!</p>
      <ol>
        <li>
          <Link to="/?location=Philadelphia"> Philadelphia, PA </Link>
        </li>
        <li>
          <Link to="/?location=Bratislava"> Bratislava, SK </Link>
        </li>
      </ol>
    </div>
  );
};

module.exports = Example;
