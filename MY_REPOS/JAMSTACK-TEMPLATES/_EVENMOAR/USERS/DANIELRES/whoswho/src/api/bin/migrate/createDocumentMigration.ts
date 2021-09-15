import { Client, query as q } from "faunadb";
import { TMigration } from "types/TMigration";

type TInput = { id: TMigration["id"]; name: TMigration["name"] };

export const createDocumentMigration = async (
  client: Client,
  { id, name }: TInput
) => {
  await client.query(
    q.Create(q.Collection("_migrations"), { data: { id, name } })
  );
};
