import React from "react";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import BwmModal from "components/shared/Modal";
import ApiErrors from "components/forms/ApiErrors";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { createBooking, getBookings } from "actions";
import { toast } from "react-toastify";

const moment = extendMoment(Moment);

class BookingReserve extends React.Component {
  constructor() {
    super();
    this.dateRef = React.createRef();
    this.bookedOutDates = [];

    this.state = {
      errors: [],
      proposedBooking: {
        guests: "",
        startAt: null,
        endAt: null,
      },
    };
  }

  async componentDidMount() {
    const { rental } = this.props;
    this.bookedOutDates = await getBookings(rental._id);
  }

  handleApply = (_, { startDate, endDate }) => {
    this.dateRef.current.value =
      moment(startDate).format("YYYY/MM/DD") +
      " to " +
      moment(endDate).format("YYYY/MM/DD");

    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        startAt: startDate,
        endAt: endDate,
      },
    });
  };

  processAditionalData = () => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        nights: this.nights,
        price: this.price,
        rental: this.props.rental,
      },
    });
  };

  checkInvalidDates = (date) => {
    let isBookedOut = false;

    isBookedOut = this.bookedOutDates.some((booking) =>
      moment.range(booking.startAt, booking.endAt).contains(date)
    );

    return date < moment().add(-1, "days") || isBookedOut;
  };

  handleGuestsChange = (event) => {
    this.setState({
      proposedBooking: {
        ...this.state.proposedBooking,
        guests: parseInt(event.target.value, 10),
      },
    });
  };

  resetData = () => {
    this.dateRef.current.value = "";
    this.setState({
      errors: [],
      proposedBooking: { guests: "", startAt: null, endAt: null },
    });
  };

  reserveRental = (closeCallback) => {
    createBooking(this.state.proposedBooking)
      .then((newBooking) => {
        this.bookedOutDates.push(newBooking);
        this.resetData();
        toast.success("Booking has been created!", {
          autoClose: 3000,
        });
        closeCallback();
      })
      .catch((errors) => this.setState({ errors }));
  };

  get nights() {
    const { startAt, endAt } = this.state.proposedBooking;
    if (!startAt || !endAt) {
      return null;
    }
    const range = moment.range(startAt, endAt);
    return Array.from(range.by("days")).length - 1;
  }

  get price() {
    const {
      rental: { dailyPrice },
    } = this.props;
    return dailyPrice && this.nights * dailyPrice;
  }

  get isBookingValid() {
    const { startAt, endAt, guests } = this.state.proposedBooking;
    return startAt && endAt && guests;
  }

  get formattedDate() {
    return this.dateRef.current ? this.dateRef.current.value : "";
  }

  render() {
    const { rental, isAuth } = this.props;
    const {
      errors,
      proposedBooking: { nights, guests, price },
    } = this.state;
    return (
      <div className="booking">
        <h3 className="booking-price">
          $ {rental.dailyPrice}{" "}
          <span className="booking-per-night">per night</span>
        </h3>
        <hr></hr>
        {!isAuth && (
          <Link
            to={{ pathname: "/login" }}
            className="btn btn-bwm-main btn-block"
          >
            Login to book this place
          </Link>
        )}
        {isAuth && (
          <>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                onApply={this.handleApply}
                opens="left"
                containerStyles={{ display: "block" }}
                isInvalidDate={this.checkInvalidDates}
              >
                <input
                  ref={this.dateRef}
                  id="dates"
                  type="text"
                  className="form-control"
                ></input>
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                onChange={this.handleGuestsChange}
                value={guests}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="guests"
              ></input>
            </div>
            <BwmModal
              onSubmit={this.reserveRental}
              title="Confirm Booking"
              subtitle={this.formattedDate}
              openBtn={
                <button
                  onClick={this.processAditionalData}
                  disabled={!this.isBookingValid}
                  className="btn btn-bwm-main btn-block"
                >
                  Reserve place now
                </button>
              }
            >
              <div className="mb-2">
                <em>{nights}</em> Nights /<em> ${rental.dailyPrice}</em> per
                Night
                <p>
                  Guests: <em>{guests}</em>
                </p>
                <p>
                  Price: <em>${price}</em>
                </p>
                <p>Do you confirm your booking for selected days?</p>
              </div>
              <ApiErrors errors={errors} />
            </BwmModal>
          </>
        )}
        <hr></hr>
        <p className="booking-note-title">
          People are interested into this house
        </p>
        <p className="booking-note-text">
          More than 500 people checked this rental in last month.
        </p>
      </div>
    );
  }
}

export default BookingReserve;
