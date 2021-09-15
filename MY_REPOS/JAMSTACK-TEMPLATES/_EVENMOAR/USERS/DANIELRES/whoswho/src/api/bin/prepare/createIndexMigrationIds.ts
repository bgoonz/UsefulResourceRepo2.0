import { Client, query as q } from "faunadb";

export const createIndexMigrationIds = async (client: Client) => {
  await client.query(
    q.CreateIndex({
      name: "migration_ids",
      unique: true,
      serialized: true,
      source: q.Collection("_migrations"),
      values: [
        {
          field: ["data", "id"],
          reverse: true,
        },
      ],
    })
  );
};
