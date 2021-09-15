/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import bcrypt from "bcrypt";
import { Ctx } from "../../context";
import SigninError from "../../errors/SigninError";

interface SigninArgs {
  input: {
    email: string;
    password: string;
  };
}

export default async ({}, args: SigninArgs, ctx: Ctx) => {
  const { email, password } = args.input;
  const user = await ctx.db.user.findOne({ where: { email } });
  if (!user) throw new SigninError();

  const isPasswordOk = bcrypt.compareSync(password, user.password);
  if (!isPasswordOk) throw new SigninError();

  ctx.req.session.user = { id: user.id };

  return user;
};
