import React, { PropTypes } from "react";
import { Panel } from "react-bootstrap";

class ExampleWell extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <div>
        <label>Example</label>
        <Panel bsStyle='default'>
          {this.props.children}
        </Panel>
      </div>
    );
  }
}

export default ExampleWell;

