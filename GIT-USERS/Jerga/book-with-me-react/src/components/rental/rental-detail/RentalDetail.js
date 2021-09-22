import React from "react";
import { RentalDetailInfo } from "./RentalDetailInfo";
import { connect } from "react-redux";
import { RentalMap } from "components/map/RentalMap";
import Booking from "components/booking/Booking";
import * as actions from "actions";

class RentalDetail extends React.Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentalByid(this.props.match.params.id));
  }

  render() {
    const { rental, isFetching } = this.props;

    if (!isFetching && rental) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt=""></img>
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailInfo rental={rental}></RentalDetailInfo>
              </div>
              <div className="col-md-4">
                <Booking rental={rental}></Booking>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <div> Loading... </div>;
    }
  }
}

function mapStateToProps(state) {
  const { item, isFetching } = state.selectedRental;

  return {
    rental: item,
    isFetching,
  };
}

export default connect(mapStateToProps)(RentalDetail);
