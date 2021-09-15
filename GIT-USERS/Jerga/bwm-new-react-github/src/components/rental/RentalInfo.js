import React from "react";
import RentalAssets from "./RentalAssets";
import { capitalize } from "helpers/functions";

const RentalInfo = ({ rental }) => (
  <div className="rental">
    <h2 className={`rental-type type-${rental.category}`}>
      {rental.shared ? "Shared" : "Whole"} {rental.category}
    </h2>
    <h1 className="rental-title">{rental.title}</h1>
    <h2 className="rental-city">{capitalize(rental.city)}</h2>
    <div className="rental-room-info">
      <span>
        <i className="fa fa-building"></i>
        {rental.numOfRooms} bedrooms
      </span>
      <span>
        <i className="fa fa-user"></i> {rental.numOfRooms + 4} guests
      </span>
      <span>
        <i className="fa fa-bed"></i> {rental.numOfRooms + 2} beds
      </span>
    </div>
    <p className="rental-description">{rental.description}</p>
    <hr />
    <RentalAssets />
  </div>
);

export default RentalInfo;
