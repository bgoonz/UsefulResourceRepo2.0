import React from "react";
import { connect } from "react-redux";

import * as actions from "../../actions/index";

class Offer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customerAdress, companyName, item } = this.props.offer;

    var { dispatch } = this.props;

    return (
      <tr onClick={() => dispatch(actions.setActiveOffer(this.props.offer))}>
        <td>
          <strong>{companyName} </strong>
        </td>
        <td>{customerAdress}</td>
        <td>{item}</td>
      </tr>
    );
  }
}

export default connect()(Offer);
