import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Circle,
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import camelCase from "camel-case";

// const GoogleMapComponent = (props) => {
//   const { position } = props;

//   return (
//         <GoogleMap
//         defaultZoom={8}
//         defaultCenter={position}
//         >
//           <Marker
//             position={position}
//           />
//       </GoogleMap>)
//     }

// export const MapWithGeocode = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSgjeoOWrzoy0Ov819kMDWQfo7Rk0VI5o&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `360px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap,
//   lifecycle({
//     componentWillMount() {
//       debugger;
//     }
//   })
//   )(GoogleMapComponent)

function MapComponent(props) {
  const { position, isPositionFound, isMapLoaded } = props;

  return (
    <GoogleMap
      defaultZoom={13}
      center={position}
      defaultCenter={position}
      options={{
        disableDefaultUI: isPositionFound ? false : true,
      }}
    >
      {isMapLoaded && isPositionFound && (
        <Circle center={position} radius={500} />
      )}
      {isMapLoaded && !isPositionFound && (
        <MarkerWithLabel
          position={position}
          labelAnchor={new window.google.maps.Point(0, 0)}
          labelStyle={{
            width: "200px",
            backgroundColor: "white",
            fontSize: "20",
            padding: "16px",
          }}
        >
          <div>
            Uuuups, there is a problem to find location on the map, we are
            trying to resolve problem as fast as possible. Contact host for
            additional info if you are still interested in this place. We are
            sorry for incoviniance.
          </div>
        </MarkerWithLabel>
      )}
    </GoogleMap>
  );
}

function withGeocode(WrappedMapComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.positionCache = {};
      this.geocoder = undefined;
      this.state = {
        position: {
          lat: 0,
          lng: 0,
        },
        isPositionFound: false,
        isMapLoaded: false,
      };
    }

    isAddressCached(cacheKey) {
      return this.positionCache[cacheKey];
    }

    cacheAddress(address: string, position: any) {
      this.positionCache[camelCase(address)] = position;
    }

    componentWillMount() {
      this.getLatLng(this.props.location);
    }

    getLatLng(address: string) {
      this.geoCoder = new window.google.maps.Geocoder();
      const cacheKey = camelCase(address);

      if (this.isAddressCached(cacheKey)) {
        this.setState({
          position: this.positionCache[cacheKey],
        });
      }
      this.geoCodeAddress(address)
        .then((position: any) => {
          this.setState({
            position: this.positionCache[cacheKey],
            isPositionFound: true,
            isMapLoaded: true,
          });
        })
        .catch((err) => {
          this.setState({
            isPositionFound: false,
            isMapLoaded: true,
          });
        });
    }

    geoCodeAddress(address) {
      return new Promise((resolve, reject) => {
        this.geoCoder.geocode({ address }, (result, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const geometry = result[0].geometry.location;
            const position = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacheAddress(address, position);
            resolve(position);
          } else {
            reject("Not Found!");
          }
        });
      });
    }

    render() {
      return <WrappedMapComponent {...this.state} />;
    }
  };
}

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
