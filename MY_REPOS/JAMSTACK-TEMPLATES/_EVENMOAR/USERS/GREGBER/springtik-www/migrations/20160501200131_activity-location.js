exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.bigInteger('locationId').nullable().references('locations.id');
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('locationId');
    });
