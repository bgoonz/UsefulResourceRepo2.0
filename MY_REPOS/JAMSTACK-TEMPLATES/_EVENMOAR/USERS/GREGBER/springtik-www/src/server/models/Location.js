import BaseModel from './BaseModel';

const locationSchema = {
  type: 'object',
  properties: {
    lat: {type: 'number'},
    lng: {type: 'number'},
  },
  required: ['lat', 'lng'],
};

const viewportSchema = {
  type: 'object',
  properties: {
    northeast: locationSchema,
    southwest: locationSchema,
  },
  required: ['northeast', 'southwest'],
};

export default class Location extends BaseModel {
  static tableName = 'locations';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: [
      'type',
      'place_id',
      'formatted_address',
      'name',
      'geometry',
    ],

    properties: {
      ...BaseModel.jsonSchema.properties,
      type: {type: 'string', minLength: 1, maxLength: 255},
      place_id: {type: 'string', minLength: 1, maxLength: 255},
      formatted_address: {type: 'string', minLength: 1, maxLength: 255},
      name: {type: 'string', minLength: 1, maxLength: 255},
      geometry: {
        type: 'object',
        properties: {
          location: locationSchema,
          location_type: {type: 'string'},
          viewport: viewportSchema,
          bounds: viewportSchema,
        },
        required: ['location'],
      },
      country: {type: 'string', minLength: 1, maxLength: 255},
      administrative_area_level_1: {type: 'string', minLength: 1, maxLength: 255},
      administrative_area_level_2: {type: 'string', minLength: 1, maxLength: 255},
      locality: {type: 'string', minLength: 1, maxLength: 255},
      sublocality: {type: ['string', 'null'], minLength: 1, maxLength: 255},
      postal_code: {type: 'string', minLength: 1, maxLength: 255},
      route: {type: 'string', minLength: 1, maxLength: 255},
      street_number: {type: 'string', minLength: 1, maxLength: 255},
    },
  };
}
