import { Client, query as q } from "faunadb";
import * as config from "../../config";
import { uploadSchema } from "../uploadSchema";

export const migrations = [
  {
    id: 1,
    name: `upload schema`,
    action: async () => {
      const secret = config.fauna.keys.admin;
      const file = config.fauna.graphql.schema.path;
      await uploadSchema(secret, file);
    },
  },
  {
    id: 2,
    name: `update function create_user`,
    action: async (client: Client) => {
      await client.query(
        q.Update(q.Function("create_user"), {
          role: "server",
          body: q.Query(
            q.Lambda(
              ["input"],
              q.Create(q.Collection("User"), {
                data: {
                  email: q.Select("email", q.Var("input")),
                  name: q.Select("name", q.Var("input")),
                  createdAt: q.Now(),
                },
                // credentials: { password: q.Select("password", q.Var("input")) },
              })
            )
          ),
        })
      );
    },
  },
];
