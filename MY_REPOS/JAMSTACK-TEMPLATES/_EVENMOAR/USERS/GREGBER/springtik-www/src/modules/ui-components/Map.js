/* global google */
import React, {PropTypes} from 'react';
import GoogleMap from 'react-google-maps/lib/GoogleMap';

export const defaultOptions = {
  draggable: false,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  clickableIcons: false,
  styles: [{
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  }],
};

/**
 * Get bounds from positions.
 *
 * @param {object[]} positions
 * @returns {LatLngBounds}
 */
export const getBoundsFromPositions = positions => {
  if (typeof google !== 'object')
    return null;

  return positions.reduce((bounds, {lat, lng}) => {
    bounds.extend(new google.maps.LatLng(lat, lng));
    return bounds;
  }, new google.maps.LatLngBounds());
};

export class Map extends React.Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    children: PropTypes.node,
    options: PropTypes.object.isRequired,
    bounds: PropTypes.object,
    onMapMount: PropTypes.func,
  };

  static defaultProps = {
    defaultZoom: 15,
    options: defaultOptions,
  };

  componentDidMount() {
    this.fitBounds();
  }

  componentDidUpdate() {
    this.fitBounds();
  }

  handleMount = map => {
    const {onMapMount} = this.props;

    this.map = map;

    if (onMapMount) {
      onMapMount(map);
    }
  };

  fitBounds() {
    const {bounds} = this.props;

    if (bounds) {
      this.map.fitBounds(bounds);
    }
  }

  render() {
    const {
      defaultZoom,
      children,
      options,
      /* eslint-disable no-unused-vars */
      bounds,
      onMapMount,
      /* eslint-enable no-unused-vars */
      ...props,
    } = this.props;

    return (
      <GoogleMap
        {...props}
        ref={this.handleMount}
        defaultZoom={defaultZoom}
        defaultOptions={options}
      >
        {children}
      </GoogleMap>
    );
  }
}

export default Map;
