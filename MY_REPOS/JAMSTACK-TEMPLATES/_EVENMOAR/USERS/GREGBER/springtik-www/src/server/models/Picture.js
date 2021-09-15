import BaseModel from './BaseModel';

export default class Picture extends BaseModel {
  static tableName = 'pictures';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['publicId'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      publicId: {type: 'string'},
      activityId: {type: ['string', 'null']},
      categoryId: {type: ['string', 'null']},
    },
  };
}
