import React from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import * as actions from "../../actions/index";

class OfferDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDeleteClick(id) {
    return () => {
      const { dispatch } = this.props;
      dispatch(actions.deleteOffers(id));
      dispatch(actions.setActiveOffer({}));
    };
  }

  renderButtons() {
    if (!this.props.activeOffer._id) {
      return "";
    } else {
      return (
        <a
          href="#"
          onClick={this.handleDeleteClick(this.props.activeOffer._id)}
          className="btn btn-default"
        >
          {" "}
          Delete
        </a>
      );
    }
  }

  renderOffer() {
    if (!this.props.activeOffer._id) {
      return "";
    } else {
      const { companyName, customerAdress, item } = this.props.activeOffer;
      return (
        <p>
          {companyName}, {customerAdress}, {item}
        </p>
      );
    }
  }

  renderMostSoldOffers(offers) {
    if (offers) {
      return offers.map((offer) => {
        return (
          <li key={uuid.v1()}>
            {offer.product} , {offer.count}
          </li>
        );
      });
    } else {
      return <li>Loading...</li>;
    }
  }

  render() {
    var { dispatch } = this.props;

    return (
      <div>
        {this.renderOffer()}
        <div className="content-buttons">{this.renderButtons()}</div>

        <div className="top-sold">
          <h1>Top Sold Items</h1>
          <ul>{this.renderMostSoldOffers(this.props.offers)}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeOffer: state.activeOffer,
  };
}

export default connect(mapStateToProps)(OfferDetail);
