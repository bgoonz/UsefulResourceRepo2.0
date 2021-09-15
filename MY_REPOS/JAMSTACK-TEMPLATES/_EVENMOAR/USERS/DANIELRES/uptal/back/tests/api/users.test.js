import request from "supertest";

import server from "../../src/index";
import purgeDb from "../../src/helpers/neo4j/purgeDb";

beforeEach(purgeDb);
afterEach(purgeDb);

const ADD_USER = ({ name, email } = {}) => /* GraphQL */ `
  mutation {
    CreateUser(name: "${name}", email: "${email}") {
      id
    }
  }
`;

const GET_USERS = () => /* GraphQL */ `
  {
    User {
      name
      email
      id
    }
  }
`;

test("Creating a user + getting users", async () => {
  await request(server)
    .post("/graphql")
    .send({ query: ADD_USER({ name: "Bob", email: "bob@example.com" }) });

  const resp = await request(server)
    .post("/graphql")
    .send({ query: GET_USERS() });

  expect(JSON.parse(resp.text).data.User.length).toEqual(1);
  expect(JSON.parse(resp.text).data.User[0].name).toEqual("Bob");
});

describe("Constraints", () => {
  it("Ensures user name is unique", async () => {
    await request(server)
      .post("/graphql")
      .send({ query: ADD_USER({ name: "Bob", email: "b1@example.com" }) });

    const resp = await request(server)
      .post("/graphql")
      .send({ query: ADD_USER({ name: "Bob", email: "b2@example.com" }) });

    expect(JSON.parse(resp.text).errors[0].message).toEqual(
      "This name is not available."
    );
  });

  it("Ensures user email is unique", async () => {
    await request(server)
      .post("/graphql")
      .send({ query: ADD_USER({ name: "John", email: "j@example.com" }) });

    const resp = await request(server)
      .post("/graphql")
      .send({ query: ADD_USER({ name: "Jack", email: "j@example.com" }) });

    const us = await request(server)
      .post("/graphql")
      .send({ query: GET_USERS() });

    expect(JSON.parse(resp.text).errors[0].message).toEqual(
      "This email is not available."
    );
  });
});
