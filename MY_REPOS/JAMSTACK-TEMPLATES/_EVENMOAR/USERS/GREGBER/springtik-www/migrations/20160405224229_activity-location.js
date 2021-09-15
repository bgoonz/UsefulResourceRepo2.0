exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.string('address', 255).defaultTo('').notNullable();
      table.string('city', 50).defaultTo('').notNullable();
      table.string('zipcode', 5).defaultTo('').notNullable();
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('address');
      table.dropColumn('city');
      table.dropColumn('zipcode');
    });
