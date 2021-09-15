/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Ctx } from "../../context";

export default async ({}, {}, ctx: Ctx) => {
  ctx.req.session = null;

  return true;
};
