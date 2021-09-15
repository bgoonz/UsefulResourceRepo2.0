import React from "react";
import { BookingForm } from "./BookingForm";
import { getRangeOfDates } from "helpers";
import { connect } from "react-redux";
import { BookingConfirmation } from "./BookingConfirmation";
import { toast, ToastContainer } from "react-toastify";
import * as actions from "actions";
import "react-toastify/dist/ReactToastify.css";

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      didConfirm: false,
      placedBookings: props.rental.bookings,
      takenDates: [],
    };

    this.confirmProposedData = this.confirmProposedData.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.bookPlace = this.bookPlace.bind(this);
  }

  componentWillMount() {
    this.computeTakenDates();
  }

  openConfirmationModal() {
    this.setState({ didConfirm: true });
  }

  cancelConfirmation() {
    this.setState({ didConfirm: false });
  }

  confirmProposedData({ startAt, endAt, guests }) {
    this.createBooking(startAt, endAt, guests);
    this.openConfirmationModal();
  }

  createBooking(startAt, endAt, guests) {
    const booking = {};
    const { rental, dispatch } = this.props;

    booking.guests = guests;
    booking.startAt = startAt;
    booking.endAt = endAt;
    booking.days = getRangeOfDates(startAt, endAt).length;
    booking.totalPrice = booking.days * rental.dailyRate;
    booking.rental = rental;

    dispatch(actions.createBooking(booking));
  }

  successNotify() {
    toast.success("Place has been succesfully booked. Enjoy.");
  }

  bookPlace() {
    const { dispatch, proposedBooking } = this.props;

    dispatch(actions.bookPlace(proposedBooking.item)).then((res) => {
      if (res && res.booking) {
        this.successNotify();
        this.syncCalendar(res.booking);
        this.cancelConfirmation();
      }
    });
  }

  syncCalendar(booking) {
    this.setState({ placedBookings: [...this.state.placedBookings, booking] });
    this.computeTakenDates();
  }

  title() {
    return (
      <h3 className="booking-price">
        ${this.props.rental.dailyRate}{" "}
        <span className="booking-per-night">per night</span>
      </h3>
    );
  }

  computeTakenDates() {
    const { placedBookings: bookings } = this.state;
    let takenDates = [];

    if (bookings && bookings.length) {
      bookings.forEach((booking) => {
        const datesRanges = getRangeOfDates(booking.startAt, booking.endAt);

        takenDates = [...takenDates, ...datesRanges];
      });

      this.setState({ takenDates });
    }
  }

  render() {
    const { didConfirm, takenDates } = this.state;
    const { rental, proposedBooking, isAuth } = this.props;

    return (
      <section id="bookingPanel">
        <ToastContainer></ToastContainer>
        <BookingConfirmation
          close={this.cancelConfirmation}
          didConfirm={didConfirm}
          booking={proposedBooking}
          handleConfirm={this.bookPlace}
          rental={rental}
        />
        <BookingForm
          handleFormConfirm={this.confirmProposedData}
          title={this.title()}
          takenDates={takenDates}
          proposedBooking={proposedBooking}
          isAuth={isAuth}
        ></BookingForm>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    proposedBooking: state.booking,
    isAuth: state.auth.isAuth,
  };
}

export default connect(mapStateToProps)(Booking);
