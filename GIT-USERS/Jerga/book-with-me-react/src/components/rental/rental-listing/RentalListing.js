import React from "react";
import { connect } from "react-redux";
import { RentalList } from "./RentalList";
import * as actions from "actions";

class RentalListing extends React.Component {
  componentWillMount() {
    this.fetchRentals();
  }

  fetchRentals() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    const { rentals } = this.props;

    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <RentalList rentals={rentals} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals,
  };
}

export default connect(mapStateToProps)(RentalListing);
