exports.up = (knex) => {
  return knex.schema.createTable("User", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("password");
    table.string("facebookId");
    table.string("email");
    table.boolean("isAdmin");
    table.timestamps(true, true);
    table.unique(["facebookId", "email"]);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("User");
};
