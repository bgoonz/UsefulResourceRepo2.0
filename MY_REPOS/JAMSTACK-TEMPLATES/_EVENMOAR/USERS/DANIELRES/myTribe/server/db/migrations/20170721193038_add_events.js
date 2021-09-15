exports.up = (knex, Promise) => {
  return knex.schema.createTable("events", (table) => {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("type").notNullable();
    table.jsonb("attrs");
    table.dateTime("createdAt").defaultTo(knex.raw("now()"));
    table.boolean("isPlayed").defaultTo(false);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("events");
};
