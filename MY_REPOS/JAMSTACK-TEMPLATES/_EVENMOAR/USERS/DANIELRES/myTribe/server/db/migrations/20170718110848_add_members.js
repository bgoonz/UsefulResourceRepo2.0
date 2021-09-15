exports.up = (knex, Promise) => {
  return knex.schema.createTable("members", (table) => {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("slug").notNullable();
    table.string("displayName");
    table.jsonb("infos").defaultTo(
      JSON.stringify({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        fbProfileUrl: "",
        introUrl: "",
        addedAt: "",
        phone: "",
      })
    );
    table.dateTime("createdAt").defaultTo(knex.raw("now()"));
    table.uuid("invitedBy").references("members.uuid");
  });
};
exports.down = (knex, Promise) => {
  return knex.schema.dropTable("members");
};
