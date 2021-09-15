const { Model } = require("objection");

class Product extends Model {
  static get tableName() {
    return "Product";
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  // validations
  static get jsonSchema() {
    return {
      type: "object",
      required: ["imageSrc"],

      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        description: { type: "text" },
        imageSrc: { type: "string" },
      },
    };
  }
}

module.exports = Product;
