exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .text("username")
      .notNullable()
      .unique();
    table.text("password").notNullable();
    table.text("noteOrder").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
