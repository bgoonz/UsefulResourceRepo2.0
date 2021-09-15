exports.seed = (knex, Promise) =>
  Promise.join(
    knex('users')
      .del(),
    knex('users').insert({
      id: 1,
      email: 'admin@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e',
      updatedAt: new Date(),
      createdAt: new Date(),
    }),
    knex('users').insert({
      id: 2,
      email: 'greg@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e',
      updatedAt: new Date(),
      createdAt: new Date(),
    }),
    knex('users').insert({
      id: 3,
      email: 'camille@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e',
      updatedAt: new Date(),
      createdAt: new Date(),
    }),
    knex('users').insert({
      id: 4,
      email: 'tiago@springtik.fr',
      password: '$2a$08$eUqe.Sic2FQOUIOo8XWrDOpiZE4rukM9oI27GtZv/SdMKIUIFiN/e',
      updatedAt: new Date(),
      createdAt: new Date(),
    })
  );
