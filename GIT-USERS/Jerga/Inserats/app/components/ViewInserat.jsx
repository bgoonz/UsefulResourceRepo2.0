import React, { Component } from "react";
var { connect } = require("react-redux");
import InseratDetail from "./InseratDetail";
import * as actions from "../actions";

class ViewInserat extends Component {
  constructor(props) {
    super(props);
  }

  renderInserats(inserats) {
    if (inserats) {
      return inserats.map((inserat) => {
        return <InseratDetail key={inserat.createdAt} inserat={inserat} />;
      });
    } else {
      return <p> Fetching data... </p>;
    }
  }

  render() {
    var inserats = this.props.inserats;

    return (
      <div className="view-inserat">
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>City</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{this.renderInserats(inserats)}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inserats: state.inserats,
  };
}

export default connect(mapStateToProps)(ViewInserat);
