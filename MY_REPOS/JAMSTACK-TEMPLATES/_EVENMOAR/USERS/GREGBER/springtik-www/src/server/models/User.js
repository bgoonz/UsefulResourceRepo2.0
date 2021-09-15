import BaseModel from './BaseModel';
import bcrypt from 'bcryptjs';

export default class User extends BaseModel {
  static tableName = 'users';

  static jsonSchema = {
    ...BaseModel.jsonSchema,
    required: ['email', 'password'],

    properties: {
      ...BaseModel.jsonSchema.properties,
      email: {type: 'string', minLength: 1, maxLength: 255},
      password: {type: 'string', minLength: 1, maxLength: 255},
    },
  };

  validPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(isMatch);
      });
    });
  }

  cryptPassword() {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.plainTextPassword, 8, (err, password) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(password);
      });
    });
  }

  $beforeInsert() {
    super.$beforeInsert();
    return this.cryptPassword();
  }

  $formatJson(json) {
    const {
      password, // eslint-disable-line no-unused-vars
      ...props,
    } = super.$formatJson(json);
    return props;
  }
}
