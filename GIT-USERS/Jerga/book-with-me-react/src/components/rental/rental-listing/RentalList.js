import React from "react";
import { RentalCard } from "./RentalCard";

export class RentalList extends React.Component {
  renderRentals(rentals) {
    if (rentals.length > 0) {
      return rentals.map((rental, index) => {
        return (
          <RentalCard
            rental={rental}
            key={rental._id}
            colClass="col-md-3 col-xs-6"
          ></RentalCard>
        );
      });
    } else {
      return "";
    }
  }

  render() {
    const { items } = this.props.rentals;

    return <div className="row">{this.renderRentals(items)}</div>;
  }
}
