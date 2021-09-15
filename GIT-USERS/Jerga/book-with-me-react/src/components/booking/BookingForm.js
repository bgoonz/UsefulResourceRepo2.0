import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { formatDate } from "helpers";
import { Link } from "react-router-dom";
import * as moment from "moment";

export class BookingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startAt: "",
      endAt: "",
      guests: "",
    };

    this.dateInput = React.createRef();

    this.selectDates = this.selectDates.bind(this);
    this.selectGuests = this.selectGuests.bind(this);
    this.checkInvalidDates = this.checkInvalidDates.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.proposedBooking.isBooked !== this.props.proposedBooking.isBooked
    ) {
      this.resetForm();
    }
  }

  checkInvalidDates(date) {
    return (
      this.props.takenDates.includes(formatDate(date)) ||
      date.diff(moment(), "days", true) <= 0
    );
  }

  selectGuests(event) {
    this.setState({
      guests: event.target.value,
    });
  }

  reseDatetInput() {
    this.dateInput.current.value = "";
  }

  selectDates(event, dateRangePicker) {
    const startAt = formatDate(dateRangePicker.startDate);
    const endAt = formatDate(dateRangePicker.endDate);

    this.dateInput.current.value = startAt + " to " + endAt;

    this.setState({
      startAt,
      endAt,
    });
  }

  resetForm() {
    this.setState({ startAt: "", endAt: "", guests: "" });
    this.reseDatetInput();
  }

  render() {
    const { handleFormConfirm, isAuth } = this.props;
    const { startAt, endAt, guests } = this.state;

    return (
      <div className="booking">
        {this.props.title}
        <hr></hr>
        {isAuth && (
          <React.Fragment>
            <div className="form-group">
              <label htmlFor="dates">Dates</label>
              <DateRangePicker
                onApply={this.selectDates}
                isInvalidDate={this.checkInvalidDates}
                opens="left"
                containerStyles={{ display: "block" }}
              >
                <input
                  ref={this.dateInput}
                  id="dates"
                  type="text"
                  className="form-control"
                ></input>
              </DateRangePicker>
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                onChange={this.selectGuests}
                value={this.state.guests}
                type="number"
                className="form-control"
                id="guests"
                aria-describedby="emailHelp"
                placeholder=""
              ></input>
            </div>
            <button
              disabled={!startAt || !endAt || !guests}
              onClick={() => handleFormConfirm({ ...this.state })}
              className="btn btn-bwm btn-confirm btn-block"
            >
              Reserve place now
            </button>
          </React.Fragment>
        )}
        {!isAuth && (
          <div className="should-login-btn-container">
            <Link class="btn btn-bwm btn-login" to="/login">
              Login and book this place today
            </Link>
          </div>
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
