exports.up = knex =>
  knex.schema
    .table('locations', table => {
      table.dropColumn('zipcode');
      table.string('postal_code').index();
    });

exports.down = knex =>
  knex.schema
    .table('locations', table => {
      table.string('zipcode').index();
      table.dropColumn('postal_code');
    });
