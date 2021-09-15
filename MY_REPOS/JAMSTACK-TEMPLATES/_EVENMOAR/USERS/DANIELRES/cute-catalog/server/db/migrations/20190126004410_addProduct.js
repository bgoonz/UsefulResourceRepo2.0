exports.up = (knex) => {
  return knex.schema.createTable("Product", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.text("description");
    table.string("imageSrc");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("Product");
};
