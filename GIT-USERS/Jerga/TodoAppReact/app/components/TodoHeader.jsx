var React = require("react");

export var TodoHeader = React.createClass({
  render: function () {
    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1>
              <a href="#">My Site</a>
            </h1>
          </li>
          <li className="toggle-topbar menu-icon">
            <a href="#">
              <span>Menu</span>
            </a>
          </li>
        </ul>

        <section className="top-bar-section">
          <ul className="right">
            <li className="active">
              <a href="#">Right Button Active</a>
            </li>
            <li className="has-dropdown">
              <a href="#">Right Button Dropdown</a>
              <ul className="dropdown">
                <li>
                  <a href="#">First link in dropdown</a>
                </li>
                <li className="active">
                  <a href="#">Active link in dropdown</a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="left">
            <li>
              <a href="#">Left Nav Button</a>
            </li>
          </ul>
        </section>
      </nav>
    );
  },
});

export default TodoHeader;
