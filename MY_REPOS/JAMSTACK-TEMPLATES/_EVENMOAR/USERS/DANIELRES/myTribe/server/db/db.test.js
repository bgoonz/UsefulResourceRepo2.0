import db from "./db";

it("connects", () => {
  db.raw("select 1+1 as result").then(() => {
    // there is a valid connection in the pool
  });
});
