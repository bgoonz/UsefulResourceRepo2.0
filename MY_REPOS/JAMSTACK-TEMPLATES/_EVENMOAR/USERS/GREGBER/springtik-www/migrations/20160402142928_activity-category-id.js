exports.up = knex =>
  knex.schema
    .table('activities', table => {
      table.bigInteger('categoryId').nullable().references('categories.id');
    });

exports.down = knex =>
  knex.schema
    .table('activities', table => {
      table.dropColumn('categoryId');
    });
