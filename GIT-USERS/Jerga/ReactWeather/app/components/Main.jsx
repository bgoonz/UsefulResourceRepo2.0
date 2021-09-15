var React = require("react");

var Navbar = require("Navbar");

var Main = (props) => {
  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="columns medium-6 large-4 small-centered">
          {props.children}
        </div>
      </div>
    </div>
  );
};

module.exports = Main;
