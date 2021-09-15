import React from "react";
import BookingListing from "components/booking/BookingListing";
import { connect } from "react-redux";
import { fetchReceivedBookings } from "actions";

class ReceivedBookings extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchReceivedBookings());
  }

  render() {
    const { bookings, isFetching, errors } = this.props;
    return (
      <BookingListing
        errors={errors}
        isFetching={isFetching}
        title="Received Bookings"
        type="received"
        bookings={bookings}
      />
    );
  }
}

const mapStateToProps = ({ manage }) => {
  return {
    bookings: manage.receivedBookings.items,
    isFetching: manage.receivedBookings.isFetching,
    errors: manage.receivedBookings.errors,
  };
};

export default connect(mapStateToProps)(ReceivedBookings);
