exports.up = knex =>
  knex.schema
    .createTable('locations', table => {
      table.bigincrements('id').primary();
      table.dateTime('createdAt').notNullable();
      table.dateTime('updatedAt').notNullable();
      table.string('type').notNullable().index();
      table.string('place_id').notNullable().index();
      table.string('formatted_address').notNullable();
      table.string('name');
      table.jsonb('geometry').notNullable();
      table.string('country').index();
      table.string('administrative_area_level_1').index();
      table.string('administrative_area_level_2').index();
      table.string('locality').index();
      table.string('sublocality').index();
      table.string('zipcode').index();
      table.string('route');
      table.string('street_number');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('locations');
