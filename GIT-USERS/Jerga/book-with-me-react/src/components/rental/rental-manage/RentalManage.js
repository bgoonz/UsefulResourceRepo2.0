import React from "react";
import { Link } from "react-router-dom";
import { RentalManageCard } from "./RentalManageCard";
import { RentalBookings } from "./RentalBookings";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalManage extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentalsByUser());
  }

  renderRentalCards() {
    const { items } = this.props.rentals;
    return items.map((item, index) => {
      return (
        <RentalManageCard
          modal={<RentalBookings bookings={item.bookings} />}
          key={index}
          rental={item}
        />
      );
    });
  }

  render() {
    const { items, isFetching } = this.props.rentals;

    return (
      <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">
          {items && this.renderRentalCards()}
          {!isFetching && items.length === 0 && (
            <div className="alert alert-warning">
              You dont have any rentals currenty created. If you want advertised
              your property please follow this link.
              <Link
                style={{ marginLeft: "10px" }}
                className="btn btn-bwm"
                to="/rentals/new"
              >
                Register Rental
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals,
  };
}

export default connect(mapStateToProps)(RentalManage);
