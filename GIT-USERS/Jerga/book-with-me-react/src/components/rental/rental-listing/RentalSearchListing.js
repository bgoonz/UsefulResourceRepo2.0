import React from "react";
import { connect } from "react-redux";
import { RentalList } from "./RentalList";
import { toUpperCase } from "helpers";
import * as actions from "actions";

class RentalSearchListing extends React.Component {
  componentWillMount() {
    this.searchRentalsByCity();
  }

  searchRentalsByCity() {
    const { isFetching } = this.props.rentals;
    const city = this.props.match.params.city;

    if (!isFetching) {
      this.props.dispatch(actions.fetchRentalsByCity(city));
    }
  }

  renderTitle() {
    const {
      rentals: { searchCity, items, isFetching, errors },
    } = this.props;
    let title = "";

    if (!isFetching && errors.length > 0) {
      title = errors[0].detail;
    } else if (!isFetching && items.length > 0) {
      title = `Your Home in City of ${toUpperCase(searchCity)}`;
    } else {
      title = "";
    }

    return <h1 className="page-title">{title}</h1>;
  }

  render() {
    const { rentals } = this.props;

    return (
      <section id="rentalListing">
        {this.renderTitle()}
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

export default connect(mapStateToProps)(RentalSearchListing);
