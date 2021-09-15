/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Ctx } from "../context";
import me from "./resolvers/me";
import signin from "./resolvers/signin";
import signout from "./resolvers/signout";
import signup from "./resolvers/signup";

export default {
  Query: {
    hello: ({}, {}, ctx: Ctx) =>
      `Hello from resolver! Views: ${ctx.req.session.views}`,
    me,
  },

  Mutation: {
    signin,
    signout,
    signup,
  },
};
