import React from "react";
import { MapWithGeocode } from "./GoogleMap";
import PropTypes from "prop-types";

export class RentalMap extends React.Component {
  render() {
    const location = this.props.location;

    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBSgjeoOWrzoy0Ov819kMDWQfo7Rk0VI5o&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

RentalMap.propTypes = {
  location: PropTypes.any.isRequired,
};
