import { Client, query as q } from "faunadb";

export const getLatestMigrationId = async (client: Client) => {
  const { data: latestIds } = (await client.query(
    q.Paginate(q.Match(q.Index("migration_ids")))
  )) as { data: number[] };

  return latestIds[0] || 0;
};
