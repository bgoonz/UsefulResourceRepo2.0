exports.up = knex =>
  knex.schema
    .createTable('users', table => {
      table.bigincrements('id').primary();
      table.string('email').notNullable().index();
      table.string('password').notNullable();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('users');
