import React from "react";
import BookingListing from "components/booking/BookingListing";
import { connect } from "react-redux";
import { fetchUserBookings, deleteBooking } from "actions";

class ManageBookings extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
  }

  deleteBooking = (bookingId) => {
    const canDelete = this.askForPermission();
    if (!canDelete) {
      return;
    }

    this.props.dispatch(deleteBooking(bookingId));
  };

  askForPermission() {
    return window.confirm("Are you sure you want to delete this booking?");
  }

  render() {
    const { bookings, errors, isFetching } = this.props;
    return (
      <BookingListing
        errors={errors}
        isFetching={isFetching}
        title="My Bookings"
        bookings={bookings}
        renderMenu={(bookingId) => (
          <button
            onClick={() => this.deleteBooking(bookingId)}
            className="btn btn-danger"
          >
            Delete
          </button>
        )}
      />
    );
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    bookings: manage.bookings.items,
    isFetching: manage.bookings.isFetching,
    errors: manage.bookings.errors,
  };
};

export default connect(mapStateToProps)(ManageBookings);
