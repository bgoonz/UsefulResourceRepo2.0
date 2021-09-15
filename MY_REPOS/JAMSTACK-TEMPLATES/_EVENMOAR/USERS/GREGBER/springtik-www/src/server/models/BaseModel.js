import {Model} from 'objection';

export default class BaseModel extends Model {
  static jsonSchema = {
    type: 'object',

    properties: {
      id: {type: ['integer', 'string']},
      createdAt: {type: 'string'},
      updatedAt: {type: 'string'},
    },
  };

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
