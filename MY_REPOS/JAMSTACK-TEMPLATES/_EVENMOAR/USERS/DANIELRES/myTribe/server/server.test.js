import request from "supertest";

import randomMemberFactory from "./factories/randomMemberFactory";
import server from "./server";

afterEach((done) => server.close(done));

describe("api", () => {
  test("POST /api/members + GET /api/members + GET /api/members/:slug", (done) => {
    const app = request(server);

    app
      .post("/api/members")
      .send({ ...randomMemberFactory(), displayName: "John123" })
      .expect(201)
      .then(({ body }) => expect(body.displayName).toEqual("John123"))
      .then(() =>
        app
          .get("/api/members")
          .expect(200)
          .then(({ body }) => {
            expect(body).toHaveLength(1);
            return body[0];
          })
          .then(({ slug }) => app.get(`/api/members/${slug}`))
          .then(({ body }) => expect(body.displayName).toEqual("John123"))
          .then(done)
      );
  });

  test("POST /api/members + GET /api/log + GET /api/log/:id", (done) => {
    const app = request(server);

    app
      .post("/api/members")
      .send({ ...randomMemberFactory(), displayName: "Rita456" })
      .expect(201)
      .then(({ body }) => expect(body.displayName).toEqual("Rita456"))
      .then(() =>
        app
          .get("/api/log")
          .expect(200)
          .then(({ body }) => {
            expect(body).toHaveLength(1);
            return body[0];
          })
          .then(({ id }) => app.get(`/api/log/${id}`))
          .then(({ body }) => {
            expect(body.type).toEqual("addedMember");
            expect(body.attrs.displayName).toEqual("Rita456");
          })
          .then(done)
      );
  });
});
