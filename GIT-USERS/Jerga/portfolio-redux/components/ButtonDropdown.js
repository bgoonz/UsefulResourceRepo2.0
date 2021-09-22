import React from "react";
import PropTypes from "prop-types";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class PortButtonDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  renderMenu(items) {
    return (
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item.handlers}>
            {" "}
            {item.text}{" "}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  }

  render() {
    const { title, items } = this.props;

    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret size="sm"></DropdownToggle>
        {this.renderMenu(items)}
      </ButtonDropdown>
    );
  }
}

ButtonDropdown.defaultProps = {
  title: "Menu",
  items: [],
};

ButtonDropdown.propTypes = {
  items: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
