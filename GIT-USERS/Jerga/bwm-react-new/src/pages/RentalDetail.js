import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchRentalById } from "actions";
import RentalInfo from "components/rental/RentalInfo";
import TomMap from "components/map/TomMap";
import BookingReserve from "components/booking/BookingReserve";

class RentalDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch(fetchRentalById(id));
  }

  componentWillUnmount() {
    this.props.dispatch({ type: "UNMOUNT_RENTAL" });
  }

  get location() {
    const {
      rental: { street, city },
    } = this.props;
    return street && city && city + ", " + street;
  }

  render() {
    const { rental, isFetching, isAuth } = this.props;
    if (isFetching || !rental._id) {
      return null;
    }
    return (
      <section id="rentalDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img
                className="rental-img"
                src={rental.image.url}
                alt={rental.title}
              />
            </div>
            <div className="col-md-6">
              <TomMap location={this.location} />
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalInfo rental={rental} />
            </div>
            <div className="col-md-4">
              <BookingReserve rental={rental} isAuth={isAuth} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ rental, auth: { isAuth } }) => ({
  rental: rental.item,
  isFetching: rental.isFetching,
  isAuth: isAuth,
});

const RentalDetailWithRouter = withRouter(RentalDetail);
export default connect(mapStateToProps)(RentalDetailWithRouter);
