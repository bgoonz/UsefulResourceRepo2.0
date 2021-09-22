import React from "react";
import OfferSearch from "./OfferSearch";
import OffersAdd from "./OffersAdd";

class OffersMenu extends React.Component {
  render() {
    return (
      <div className="top-menu">
        <ul className="top-buttons">
          <li>SHOW_ALL</li>
          <OffersAdd />
        </ul>
        <OfferSearch />
      </div>
    );
  }
}

export default OffersMenu;
