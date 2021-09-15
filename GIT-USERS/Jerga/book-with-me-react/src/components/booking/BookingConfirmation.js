import React from "react";
import Modal from "react-responsive-modal";
import { BwmResError } from "components/shared/form/BwmError";

export class BookingConfirmation extends React.Component {
  render() {
    const {
      booking: { item: booking, errors },
      didConfirm,
      close,
      handleConfirm,
      rental,
    } = this.props;

    return (
      <div>
        <Modal
          open={didConfirm}
          onClose={close}
          little
          classNames={{ modal: "booking-modal" }}
        >
          <h4 className="modal-title title">Confirm Booking </h4>
          <p className="dates">
            {booking.startAt} / {booking.endAt}
          </p>
          <div className="modal-body">
            <em>{booking.days}</em> nights /<em>{rental.dailyRate}$</em> per
            Night
            <p>
              Guests: <em>{booking.guests}</em>
            </p>
            <p>
              Price: <em>{booking.totalPrice}$ </em>
            </p>
            <p>Do you confirm your booking for selected days?</p>
          </div>
          <BwmResError errors={errors} />
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleConfirm}
              className="btn btn-bwm"
            >
              Confirm
            </button>
            <button type="button" onClick={close} className="btn btn-bwm">
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
