import { Client } from "faunadb";

type TMigration = {
  id: number;
  name: string;
  action: (client: Client) => Promise<>;
};
