/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Ctx } from "../../context";
import UnauthorizedError from "../../errors/UnauthorizedError";

export default async ({}, {}, ctx: Ctx) => {
  const id = ctx.req.session?.user?.id;
  if (!id) throw new UnauthorizedError();

  const user = await ctx.db.user.findOne({ where: { id } });
  if (!user) throw new UnauthorizedError();

  return user;
};
