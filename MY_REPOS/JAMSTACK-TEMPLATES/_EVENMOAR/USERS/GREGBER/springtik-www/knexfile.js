/* eslint strict: 0, no-process-env: 0 */
'use strict';

const config = {
  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      database: 'springtik',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: 'postgresql',
    pool: {
      min: 2,
      max: 10,
    },
  },
};

if (process.env.DATABASE_URL) {
  const url = require('url');
  const pgProd = url.parse(process.env.DATABASE_URL);

  config.production.connection = {
    host: pgProd.hostname,
    port: pgProd.port,
    user: pgProd.auth.split(':')[0],
    password: pgProd.auth.split(':')[1],
    database: pgProd.path.substring(1),
    ssl: true,
  };
}

module.exports = config;
