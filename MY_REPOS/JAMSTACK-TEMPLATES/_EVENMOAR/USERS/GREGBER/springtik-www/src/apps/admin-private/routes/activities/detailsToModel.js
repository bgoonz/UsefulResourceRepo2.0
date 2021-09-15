const TYPES = [
  'country',
  'administrative_area_level_1',
  'administrative_area_level_2',
  'locality',
  'sublocality',
  'postal_code',
  'route',
  'street_number',
];

export default details => {
  const model = {
    type: 'activity',
    name: details.name,
    formatted_address: details.formatted_address,
    place_id: details.place_id,
    geometry: {
      location: {
        lat: details.geometry.location.lat(),
        lng: details.geometry.location.lng(),
      },
    },
  };

  details.address_components.forEach(component => {
    const type = component.types.find(type => TYPES.includes(type));
    if (type) {
      model[type] = component.long_name;
    }
  });

  return model;
};
