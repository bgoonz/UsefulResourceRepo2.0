exports.up = knex =>
  knex.schema
    .createTable('categories', table => {
      table.bigincrements('id').primary();
      table.integer('level').notNullable();
      table.string('name').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('categories');
