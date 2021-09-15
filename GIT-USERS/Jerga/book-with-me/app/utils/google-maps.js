import EmberObject from "@ember/object";

const google = window.google;

export default EmberObject.extend({
  init() {
    this.set("geocoder", new window.google.maps.Geocoder());
  },

  createMap(element, location) {
    let map = new google.maps.Map(element, { scrollwheel: false, zoom: 13 });
    this.pinLocation(location, map);
    return map;
  },

  pinLocation(location, map) {
    this.get("geocoder").geocode({ address: location }, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const geometry = result[0].geometry.location;
        const position = { lat: geometry.lat(), lng: geometry.lng() };
        const marker = new google.maps.Marker({
          position,
          map,
          title: location,
        });
        const circle = new google.maps.Circle({
          map: map,
          radius: 500,
          fillColor: "#AA0000",
        });
        marker.setVisible(false);
        circle.bindTo("center", marker, "position");
        map.setCenter(position);
      } else {
        const position = { lat: 23, lng: 0 };
        const infowindow = new google.maps.InfoWindow({
          content:
            "Uuuups, there is a problem to find location on the map, we are trying \
           to resolve problem as fast as possible. Contact host for additional info \
           if you are still interested in this place. We are sorry for incoviniance.",
        });
        const marker = new google.maps.Marker({ position, map });
        map.setOptions({ disableDefaultUI: true, center: position });
        infowindow.open(map, marker);
      }
    });
  },
});
