import BaseModel from './BaseModel';
import Category from './Category';
import Location from './Location';
import Picture from './Picture';

export default class Activity extends BaseModel {
  static tableName = 'activities';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name', 'address', 'zipcode', 'city', 'status'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      name: {type: 'string', minLength: 1, maxLength: 255},
      status: {type: 'string', enum: ['review', 'published']},
      description: {type: 'string', maxLength: 180},
      address: {type: 'string', minLength: 1, maxLength: 255},
      zipcode: {type: 'string', minLength: 1, maxLength: 5, pattern: /^\d+$/},
      city: {type: 'string', minLength: 1, maxLength: 50},
      text: {type: 'string'},
      phoneNumber: {type: ['string', 'null'], maxLength: 255},
      website: {type: ['string', 'null'], maxLength: 255},
      categoryId: {type: ['string', 'null']},
      locationId: {type: ['string', 'null']},
      slug: {type: 'string', minLength: 1, maxLength: 255},
    },
  };

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.OneToOneRelation,
        modelClass: Category,
        join: {
          from: 'activities.categoryId',
          to: 'categories.id',
        },
      },
      location: {
        relation: BaseModel.OneToOneRelation,
        modelClass: Location,
        join: {
          from: 'activities.locationId',
          to: 'locations.id',
        },
      },
      pictures: {
        relation: BaseModel.OneToManyRelation,
        modelClass: Picture,
        join: {
          from: 'activities.id',
          to: 'pictures.activityId',
        },
      },
    };
  }
}
