exports.up = knex =>
  knex.schema
    .createTable('pictures', table => {
      table.bigincrements('id').primary();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
      table.string('publicId').notNullable().index();
      table.bigInteger('activityId').nullable().references('activities.id');
      table.bigInteger('categoryId').nullable().references('categories.id');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('pictures');
