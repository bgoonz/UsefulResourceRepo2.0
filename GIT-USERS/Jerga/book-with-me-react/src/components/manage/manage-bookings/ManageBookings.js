import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import { Link } from "react-router-dom";
import { BookingCard } from "./BookingCard";

class ManageBookings extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchBookings());
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => {
      return <BookingCard key={index} booking={booking} />;
    });
  }

  render() {
    const { items, isFetching } = this.props.bookings;

    return (
      <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">
          {items.length > 0 && this.renderBookings(items)}
          {!isFetching && items.length === 0 && (
            <div class="alert alert-warning">
              You have no bookings created go to rentals section and book your
              place today.
              <Link
                style={{ "margin-left": "10px" }}
                class="btn btn-bwm"
                to="/rentals"
              >
                Available Rental
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
    bookings: state.bookings,
  };
}

export default connect(mapStateToProps)(ManageBookings);
