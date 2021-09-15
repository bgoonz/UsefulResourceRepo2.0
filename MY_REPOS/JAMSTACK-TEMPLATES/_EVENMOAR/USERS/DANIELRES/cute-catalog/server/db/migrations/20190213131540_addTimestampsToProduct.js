exports.up = (knex) => {
  return knex.schema.table("Product", (table) => {
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.table("Product", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
};
