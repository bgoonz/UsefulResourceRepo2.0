import BaseModel from './BaseModel';
import Activity from './Activity';
import Picture from './Picture';

export default class Category extends BaseModel {
  static tableName = 'categories';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['name', 'level'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      level: {type: 'number'},
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string', maxLength: 180},
      parentId: {type: ['string', 'null']},
      keywords: {
        type: 'array',
        items: {type: 'string'},
        uniqueItems: true,
      },
    },
  };

  static get relationMappings() {
    return {
      activities: {
        relation: BaseModel.OneToManyRelation,
        modelClass: Activity,
        join: {
          from: 'categories.id',
          to: 'activities.categoryId',
        },
      },

      children: {
        relation: BaseModel.OneToManyRelation,
        modelClass: Category,
        join: {
          from: 'categories.id',
          to: 'categories.parentId',
        },
      },

      parent: {
        relation: BaseModel.OneToOneRelation,
        modelClass: Category,
        join: {
          from: 'categories.parentId',
          to: 'categories.id',
        },
      },

      pictures: {
        relation: BaseModel.OneToManyRelation,
        modelClass: Picture,
        join: {
          from: 'categories.id',
          to: 'pictures.activityId',
        },
      },
    };
  }
}
