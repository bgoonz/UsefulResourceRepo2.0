exports.up = (knex) => {
  return knex.schema.table("User", (table) => {
    table.timestamp("emailConfirmedAt");
  });
};

exports.down = (knex) => {
  return knex.schema.table("User", (table) => {
    table.dropColumn("emailConfirmedAt");
  });
};
