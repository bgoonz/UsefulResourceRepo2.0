import faunadb, { query as q } from "faunadb";
import * as config from "../config";

const faunaClient = new faunadb.Client({ secret: config.fauna.keys.admin });

const uploadFnCreateUser = () =>
  faunaClient.query(
    q.CreateFunction({
      name: "create_user",
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

uploadFnCreateUser()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
