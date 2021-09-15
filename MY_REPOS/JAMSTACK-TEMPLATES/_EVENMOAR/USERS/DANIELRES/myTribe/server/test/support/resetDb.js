import Promise from "bluebird";

import db from "../../db/db";

export default (done) =>
  db
    .raw(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'`)
    .then(({ rows }) =>
      rows.map((r) => r.tablename).filter((r) => !r.includes("knex"))
    )
    .then((tables) =>
      Promise.each(tables, (table) => db.raw(`truncate table ${table} cascade`))
    )
    .then(done);
