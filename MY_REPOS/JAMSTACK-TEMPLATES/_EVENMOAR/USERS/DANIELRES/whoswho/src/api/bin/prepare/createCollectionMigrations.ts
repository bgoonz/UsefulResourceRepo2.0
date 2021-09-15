import { Client, query as q } from "faunadb";

export const createCollectionMigrations = (client: Client) =>
  client.query(q.CreateCollection({ name: "_migrations" }));
