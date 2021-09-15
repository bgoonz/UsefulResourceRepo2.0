const Password = require("objection-password");
const { Model, mixin } = require("objection");

const Unique = require("objection-unique");

class User extends mixin(Model, [
  Password({ allowEmptyPassword: true }),
  Unique({
    fields: ["facebookId", "email"],
    identifiers: ["id"],
  }),
]) {
  static get tableName() {
    return "User";
  }

  static get hidden() {
    return ["password"];
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // validations
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email"],

      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        name: { type: "string" },
        password: { type: "string", minLength: 8 },
        isAdmin: { type: "boolean" },
      },
    };
  }
}

module.exports = User;
