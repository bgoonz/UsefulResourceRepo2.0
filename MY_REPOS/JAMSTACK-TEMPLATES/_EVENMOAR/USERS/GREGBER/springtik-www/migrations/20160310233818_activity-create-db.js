exports.up = knex =>
  knex.schema
    .createTable('activities', table => {
      table.bigincrements('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('activities');
